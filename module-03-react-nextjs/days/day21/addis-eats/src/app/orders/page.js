import { getAllOrders } from "@/lib/orders";
import OrderTable from "./OrderTable";

function calculateOrderTotal(order) {
  return (order.items || []).reduce((sum, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 0);
    return sum + price * quantity;
  }, 0);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRowsFromOrders(orders) {
  return orders.map((order) => ({
    id: order.id,
    customer: order.customerName,
    city: order.address || "Addis Ababa",
    total: calculateOrderTotal(order),
    date: new Date(order.createdAt).toISOString(),
    status: order.statusTitle || "Confirmed",
    items: (order.items || []).map((item) => `${item.name} × ${item.quantity}`).join(", "),
  }));
}

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const forceState = params?.state;

  if (forceState === "error") {
    throw new Error("Demo order table failure for exercise coverage.");
  }

  const orders = getAllOrders();
  const allRows = getRowsFromOrders(orders);

  if (forceState === "empty") {
    return (
      <main className="orders-page">
        <header className="orders-header">
          <p className="eyebrow">Orders</p>
          <h1>Recent orders</h1>
        </header>
        <section className="empty-dashboard-box">
          <strong>No orders found.</strong>
          <p>New customer orders will appear here once placed.</p>
        </section>
      </main>
    );
  }

  const sort = params?.sort || "date-desc";
  const page = Math.max(1, Number(params?.page || 1));
  const pageSize = 5;

  const sortedRows = [...allRows].sort((a, b) => {
    switch (sort) {
      case "amount-asc":
        return a.total - b.total;
      case "amount-desc":
        return b.total - a.total;
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = sortedRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <main className="orders-page">
      <header className="orders-header">
        <div>
          <p className="eyebrow">Orders</p>
          <h1>Recent orders</h1>
        </div>
        <p className="orders-subtitle">{allRows.length} orders · {formatCurrency(allRows.reduce((sum, row) => sum + row.total, 0))} total</p>
      </header>

      <OrderTable
        rows={pageRows}
        sort={sort}
        page={safePage}
        totalPages={totalPages}
        totalRows={sortedRows.length}
      />
    </main>
  );
}
