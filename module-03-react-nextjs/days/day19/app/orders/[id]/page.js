import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders";
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
  const initialOrder = getOrder(id);

  if (!initialOrder) {
    notFound();
  }

  return (
    <main className="order-page-wrapper">
      <OrderTracker initialOrder={initialOrder} orderId={id} />
    </main>
  );
}
