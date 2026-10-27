import { notFound } from "next/navigation";
import { dishes, findDish } from "../dishes";
import AddToCart from "../AddToCart";

export function generateStaticParams() { return dishes.map((dish) => ({ id: String(dish.id) })); }

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = findDish(id);
  if (!dish) notFound();
  return <article className="dish-detail"><p className="eyebrow">{dish.cuisine} · {dish.difficulty}</p><h1>{dish.name}</h1><p>{dish.ingredients.join(", ")}</p><p className="price">{dish.prepTimeMinutes + dish.cookTimeMinutes} minutes · Serves {dish.servings} · ★ {dish.rating}</p><AddToCart dish={dish} /></article>;
}
