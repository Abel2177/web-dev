import { getOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;

  // Ownership check: ensure the requesting user owns this order (or is staff)
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "You must be signed in." }, { status: 401 });
  }

  const order = getOrder(id);

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  // Only the order's owner or staff can read the order
  if (order.userId && order.userId !== session.id && session.role !== "staff") {
    return Response.json({ error: "You do not have permission to view this order." }, { status: 403 });
  }

  return Response.json({ order });
}
