import { Suspense } from "react";
import LiveDishList from "./LiveDishList";

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-3 text-4xl font-bold">Our Menu</h1>
      <p className="mb-8 text-gray-600">
        Discover your favorite Ethiopian dishes.
      </p>

      <Suspense fallback={<p className="text-gray-500">Loading menu...</p>}>
        <LiveDishList />
      </Suspense>
    </main>
  );
}