"use client";

export default function OrdersError({ error, reset }) {
  return (
    <main className="orders-page">
      <section className="empty-dashboard-box error-box">
        <strong>Something went wrong.</strong>
        <p>{error?.message || "Could not load the current orders."}</p>
        <button type="button" className="add-to-cart" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </main>
  );
}
