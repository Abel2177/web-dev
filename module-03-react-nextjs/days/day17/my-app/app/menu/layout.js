"use client";

import Link from "next/link";
import { useState } from "react";

export default function MenuLayout({ children }) {
  const [visits, setVisits] = useState(0);

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
      <aside className="w-48 shrink-0 rounded-xl bg-orange-100 p-4">
        <h2 className="mb-4 text-lg font-bold">Menu Sidebar</h2>

        <p className="mb-4">Dish visits: {visits}</p>

        <button
          onClick={() => setVisits((count) => count + 1)}
          className="mb-5 rounded bg-orange-600 px-3 py-2 text-white"
        >
          Increase counter
        </button>

        <nav className="flex flex-col gap-3">
          <Link href="/menu">All Dishes</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </aside>

      <section className="min-w-0 flex-1">{children}</section>
    </div>
  );
}