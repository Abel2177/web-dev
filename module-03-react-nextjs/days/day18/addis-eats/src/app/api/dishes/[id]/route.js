import { findDish } from "../../../menu/dishes";

export const dynamic = "force-static";

export async function GET(_request, { params }) {
  const { id } = await params;
  const dish = findDish(id);
  if (!dish) return Response.json({ error: "Dish not found" }, { status: 404 });
  return Response.json({ dish });
}
