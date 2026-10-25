
import Link from "next/link";
import { dishes } from "@/data/dishes";
import AddToOrderButton from "@/app/components/AddToOrderButton";

export default function DishList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <article
          key={dish.id}
          className="rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="mb-2 text-xl font-semibold">
            {dish.name}
          </h2>

          <p className="mb-4 text-gray-600">
            {dish.description}
          </p>

          <p className="mb-4 font-bold">
            {dish.price} ETB
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/menu/${dish.id}`}
              className="rounded-lg border border-orange-600 px-4 py-2 text-orange-700 hover:bg-orange-50"
            >
              View Dish
            </Link>

            <AddToOrderButton dish={dish} />
          </div>
        </article>
      ))}
    </div>
  );
}