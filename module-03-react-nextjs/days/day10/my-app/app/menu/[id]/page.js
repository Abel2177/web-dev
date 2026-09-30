import { notFound } from "next/navigation";
import { foodData } from "../../data/food";

export function generateStaticParams() {
  return foodData.map((food) => ({
    id: String(food.id),
  }));
}

export default async function DishDetails({ params }) {
  const { id } = await params;

  const dish = foodData.find(
    (food) => food.id === Number(id)
  );

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>

      <p>{dish.description}</p>

      <p>Price: ${dish.price}</p>

      <p>Category: {dish.category}</p>
    </main>
  );
}