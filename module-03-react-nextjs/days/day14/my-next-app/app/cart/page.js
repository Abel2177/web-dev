"use client";

import useCartStore from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Your Order</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">
          Your order is empty. Visit the menu to add some delicious dishes!
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>{item.price} ETB each</p>
                  <p className="font-medium">
                    Subtotal: {item.price * item.quantity} ETB
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="rounded border px-3 py-1"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="rounded border px-3 py-1"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xl font-bold">
            Total: {total} ETB
          </p>
        </>
      )}
    </main>
  );
}