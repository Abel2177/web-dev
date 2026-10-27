"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export default function OrdersClient() {
  const { data, error, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetcher("/api/orders"),
    refetchInterval: 5000,
    placeholderData: { success: true, data: [] },
  });

  if (isPending) return <p>Loading orders...</p>;
  if (error) return <p role="alert">{error.message}</p>;

  const orders = data?.data ?? [];

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-6 py-10">
      <h1 className="text-3xl font-bold">Order Status</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <article key={order.id} className="rounded-lg border bg-white p-4">
            <p>Order: {order.id}</p>
            <p>Customer: {order.customerName}</p>
            <p>Status: {order.status}</p>
            <p>Total: {order.total} ETB</p>
          </article>
        ))
      )}
    </main>
  );
}