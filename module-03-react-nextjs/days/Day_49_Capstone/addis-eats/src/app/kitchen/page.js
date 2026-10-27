import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kitchen dashboard",
  description: "Staff-only kitchen dashboard for managing orders at Addis Eats.",
  robots: { index: false, follow: false },
};

export default async function KitchenPage() {
  const session = await getSession();

  // Server-side role check — never trust middleware alone
  if (!session || session.role !== "staff") {
    redirect("/");
  }

  const orders = getAllOrders();

  return (
    <main className="kitchen-page">
      <span className="eyebrow">Staff Only</span>
      <h1>Kitchen Dashboard</h1>
      <p>Welcome, {session.name}. Here are all current orders.</p>

      {orders.length === 0 ? (
        <section className="checkout-box">
          <strong>No orders yet.</strong>
          <p>Orders placed by customers will appear here.</p>
        </section>
      ) : (
        <div className="kitchen-orders-grid">
          {orders.map((order) => (
            <section key={order.id} className="kitchen-order-card">
              <div className="kitchen-order-header">
                <strong>Order #{order.id.slice(0, 8)}</strong>
                <span className={`kitchen-status-badge status-${order.status}`}>
                  {order.statusTitle}
                </span>
              </div>
              <p className="kitchen-customer">Customer: {order.customerName}</p>
              <p className="kitchen-address">📍 {order.address}</p>
              <ul className="kitchen-items-list">
                {(order.items || []).map((item, idx) => (
                  <li key={`${item.dishId}-${idx}`}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="kitchen-time">
                Placed: {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
