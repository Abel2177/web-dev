
import Link from "next/link";
import { dishes } from "../data/dishes";

export default function DishList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <article
          key={dish.id}
          className="rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="mb-2 text-xl font-semibold">{dish.name}</h2>
          <p className="mb-4 text-gray-600">{dish.description}</p>
          <p className="mb-4 font-bold">{dish.price} ETB</p>
          <Link
            href={`/menu/${dish.id}`}
            className="inline-block rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            View Dish
          </Link>
        </article>
      ))}
    </div>
  );
}