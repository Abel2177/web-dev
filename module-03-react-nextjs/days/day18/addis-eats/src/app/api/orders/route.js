import { findDish } from "../../menu/dishes";
import { orderSchema } from "../../../lib/schema";
import { saveOrder } from "@/lib/orders";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(request) {
  // Ownership: attach the session userId to every new order
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "You must be signed in to place an order." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) return Response.json({ fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });

  const unknownDish = parsed.data.items.find((item) => !findDish(item.dishId));
  if (unknownDish) return Response.json({ fieldErrors: { items: [`Dish ${unknownDish.dishId} does not exist.`] } }, { status: 422 });

  const order = saveOrder({
    id: crypto.randomUUID(),
    userId: session.id,
    ...parsed.data,
    createdAt: new Date().toISOString(),
  });

  return Response.json({ order }, { status: 201 });
}
