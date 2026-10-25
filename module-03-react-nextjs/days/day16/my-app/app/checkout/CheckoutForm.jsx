"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { placeOrder } from "./actions";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [state, formAction, isPending] = useActionState(
    placeOrder,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      clearCart();
    }
  }, [state.success, clearCart]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.success) {
    return (
      <section className="space-y-4 rounded-xl border p-6">
        <h2 className="text-2xl font-bold">Order confirmed!</h2>
        <p>{state.message}</p>
        <p>Order ID: {state.orderId}</p>
        <p className="font-semibold">Total: {state.total} ETB</p>
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="rounded-lg bg-orange-600 px-4 py-2 text-white"
        >
          Back to Menu
        </button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="space-y-4">
        <p>Your order is empty. Add dishes from the menu before checkout.</p>
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="rounded-lg bg-orange-600 px-4 py-2 text-white"
        >
          Browse Menu
        </button>
      </section>
    );
  }

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="rounded-xl border p-4">
        <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-4 py-2"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{item.price * item.quantity} ETB</span>
          </div>
        ))}

        <p className="mt-3 border-t pt-3 text-lg font-bold">
          Total: {total} ETB
        </p>
      </div>

      <input
        type="hidden"
        name="items"
        value={JSON.stringify(
          items.map((item) => ({
            dishId: String(item.id),
            quantity: item.quantity,
          }))
        )}
      />

      <div>
        <label htmlFor="customerName" className="mb-1 block font-medium">
          Full name
        </label>
        <input
          id="customerName"
          name="customerName"
          required
          minLength={2}
          className="w-full rounded-lg border p-3"
          placeholder="Enter your full name"
        />
        {state.fieldErrors?.customerName?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block font-medium">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-lg border p-3"
          placeholder="e.g. 0912345678"
        />
        {state.fieldErrors?.phone?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {state.fieldErrors?.items?.map((error) => (
        <p key={error} className="text-sm text-red-600">
          {error}
        </p>
      ))}

      {state.message && !state.success && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
      >
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}