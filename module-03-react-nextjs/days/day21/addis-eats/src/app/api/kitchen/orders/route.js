import { getAllOrders } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

// This route is deliberately protected independently of the UI. It is safe to
// use later for kitchen polling without making the order list public.
export async function GET() {
  const session = await getSession();

  if (!session) {
    return Response.json({ error: "You must be signed in." }, { status: 401 });
  }
  if (session.role !== "staff") {
    return Response.json({ error: "Staff access is required." }, { status: 403 });
  }

  return Response.json({ orders: getAllOrders() });
}
