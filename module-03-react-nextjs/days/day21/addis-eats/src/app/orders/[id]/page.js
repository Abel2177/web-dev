import { notFound, redirect } from "next/navigation";
import { getOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";
import OrderTracker from "./OrderTracker";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order #${id.slice(0, 8)} Status · Addis Eats`,
    description: `Real-time order progress tracking for Addis Eats order ${id}`,
  };
}

// Server Component that seeds the initial order data into the client polling component.
// Passing initialOrder as fallbackData ensures NO spinner appears on first paint!
export default async function OrderStatusPage({ params }) {
  const { id } = await params;

  // Ownership check: must be signed in, and must own the order (or be staff)
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=/orders/${id}`);
  }

  const initialOrder = getOrder(id);

  if (!initialOrder) {
    notFound();
  }

  // Only the order's owner or staff can view the order page
  if (initialOrder.userId && initialOrder.userId !== session.id && session.role !== "staff") {
    redirect("/");
  }

  return (
    <main className="order-page-wrapper">
      <OrderTracker initialOrder={initialOrder} orderId={id} />
    </main>
  );
}
