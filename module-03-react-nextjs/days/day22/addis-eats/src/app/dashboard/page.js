import RevenueChart from "./RevenueChart";
import { getAllOrders } from "@/lib/orders";

const currency = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

function formatCurrency(value) {
  return currency.format(value);
}

function getNeighborhood(address = "") {
  const normalized = address.toLowerCase();

  if (normalized.includes("bole")) return "Bole";
  if (normalized.includes("kazanchis")) return "Kazanchis";
  if (normalized.includes("mekanisa")) return "Mekanisa";
  if (normalized.includes("saris")) return "Saris";
  if (normalized.includes("piassa")) return "Piazza";
  if (normalized.includes("mekelle")) return "Mekelle";
  if (normalized.includes("yeka")) return "Yeka";
  return "Other";
}

function aggregateRevenueByNeighborhood(orders) {
  const totals = new Map();

  orders.forEach((order) => {
    const neighborhood = getNeighborhood(order.address || "");
    const total = (order.items || []).reduce((sum, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(item.quantity || 0);
      return sum + price * quantity;
    }, 0);

    totals.set(neighborhood, (totals.get(neighborhood) || 0) + total);
  });

  return [...totals.entries()]
    .map(([label, revenue]) => ({ label, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

function aggregateOrdersByDay(orders) {
  const today = new Date();
  const dayMap = new Map();

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - offset);

    const key = date.toISOString().slice(0, 10);
    dayMap.set(key, {
      key,
      label: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      count: 0,
    });
  }

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const key = date.toISOString().slice(0, 10);

    if (dayMap.has(key)) {
      dayMap.get(key).count += 1;
    }
  });

  return [...dayMap.values()];
}

export default async function DashboardPage() {
  const orders = getAllOrders();
  const revenueByNeighborhood = aggregateRevenueByNeighborhood(orders);
  const ordersByDay = aggregateOrdersByDay(orders);
  const totalRevenue = revenueByNeighborhood.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const maxRevenue = Math.max(...revenueByNeighborhood.map((item) => item.revenue), 1);
  const maxDailyOrders = Math.max(...ordersByDay.map((item) => item.count), 1);

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Addis Eats snapshot</h1>
        </div>
      </header>

      <section className="summary-grid" aria-label="Order summary metrics">
        <article className="summary-card">
          <span className="summary-label">Orders</span>
          <strong>{totalOrders}</strong>
          <small>Placed in the current store</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Revenue</span>
          <strong>{formatCurrency(totalRevenue)}</strong>
          <small>Across all neighborhoods</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Average order</span>
          <strong>{formatCurrency(avgOrderValue)}</strong>
          <small>Per order value</small>
        </article>
      </section>

      <section className="chart-grid" aria-label="Charts dashboard">
        <RevenueChart
          title="Revenue by neighborhood"
          data={revenueByNeighborhood}
          valueFormatter={formatCurrency}
          maxValue={maxRevenue}
        />

        <div className="chart-card">
          <div className="chart-card-header">
            <h2>Orders per day</h2>
            <span>Last 7 days</span>
          </div>

          <div className="line-chart-wrap" role="img" aria-label="Orders per day line chart">
            <svg viewBox="0 0 360 220" className="line-chart-svg" preserveAspectRatio="none">
              <g className="chart-gridlines">
                {[0, 1, 2, 3].map((tick) => {
                  const y = 20 + tick * 55;
                  return <line key={tick} x1="28" x2="332" y1={y} y2={y} />;
                })}
              </g>

              {ordersByDay.length > 0 ? (
                <>
                  <polyline
                    fill="none"
                    stroke="#a9382d"
                    strokeWidth="3"
                    points={ordersByDay
                      .map((point, index) => {
                        const x = 38 + (index * 260) / Math.max(ordersByDay.length - 1, 1);
                        const y = 190 - (point.count / maxDailyOrders) * 150;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {ordersByDay.map((point, index) => {
                    const x = 38 + (index * 260) / Math.max(ordersByDay.length - 1, 1);
                    const y = 190 - (point.count / maxDailyOrders) * 150;
                    return (
                      <g key={point.key}>
                        <circle cx={x} cy={y} r="4" fill="#a9382d" />
                        <text x={x} y="210" textAnchor="middle" className="chart-label">
                          {point.label}
                        </text>
                      </g>
                    );
                  })}
                </>
              ) : (
                <text x="180" y="110" textAnchor="middle" className="chart-empty-text">
                  No order data
                </text>
              )}
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
