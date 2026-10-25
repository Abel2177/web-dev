
"use client";

import useCartStore from "@/store/cartStore";

export default function AddToOrderButton({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(dish)}
      className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
    >
      Add to Order
    </button>
  );
}