"use client";

import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const STATUS_STEPS = [
  { step: 1, key: "confirmed", label: "Confirmed", icon: "✓" },
  { step: 2, key: "preparing", label: "In Kitchen", icon: "🍳" },
  { step: 3, key: "out_for_delivery", label: "On the Way", icon: "🛵" },
  { step: 4, key: "delivered", label: "Delivered", icon: "🍽️" },
];

export default function OrderTracker({ initialOrder, orderId }) {
  // Query key: /api/orders/${orderId}
  // Refresh rule: refreshInterval = 5000ms (polls every 5s)
  // Initial seeding: fallbackData prevents loading spinner on first paint!
  const { data, error, isValidating, mutate } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: { order: initialOrder },
      refreshInterval: 5000,
      revalidateOnFocus: true,
      dedupingInterval: 2000,
    }
  );

  const lastCheckTime = data?.order?.lastPolledAt
    ? new Date(data.order.lastPolledAt).toLocaleTimeString()
    : "";

  const order = data?.order || initialOrder;
  const currentStep = order?.statusStep || 1;
  const isComplete = order?.status === "delivered";

  return (
    <div className="order-tracker-view">
      <div className="order-header-card">
        <div className="order-header-meta">
          <span className="eyebrow">Live Order Tracking</span>
          <h1 className="order-title">Order #{order.id.slice(0, 8)}</h1>
          <p className="order-timestamp">
            Placed at: {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
        </div>

        <div className="order-poll-indicator" aria-live="polite">
          <span className={`live-pulse-dot ${isValidating ? "validating" : ""}`} />
          <span className="poll-text">
            {isValidating ? "Updating status…" : "Live polling every 5s"}
          </span>
          {lastCheckTime && <span className="last-checked">({lastCheckTime})</span>}
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <section className="timeline-section" aria-label="Order progress">
        <div className="timeline-progress-bar-bg">
          <div
            className="timeline-progress-bar-fill"
            style={{ width: `${Math.min(100, (currentStep / 4) * 100)}%` }}
          />
        </div>

        <div className="timeline-steps">
          {STATUS_STEPS.map((s) => {
            const isPassed = currentStep >= s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div
                key={s.step}
                className={`step-item ${isPassed ? "completed" : ""} ${isCurrent ? "current" : ""}`}
              >
                <div className="step-circle" aria-hidden="true">
                  {s.icon}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Status Card */}
      <section className="status-detail-card" aria-live="polite">
        <div className="status-main-badge">
          <span className="status-badge-tag">{order.statusTitle || "Processing"}</span>
          <span className="eta-badge">
            {isComplete ? "Delivered" : `ETA: ~${order.estimatedMinutes || 15} mins`}
          </span>
        </div>
        <p className="status-desc">{order.statusDescription}</p>
      </section>

      {/* Order Info & Delivery Grid */}
      <div className="order-info-grid">
        <section className="info-panel">
          <h2>Items in Order ({order.items?.length || 0})</h2>
          <ul className="order-items-list">
            {(order.items || []).map((item, idx) => (
              <li key={`${item.dishId}-${idx}`} className="order-item-row">
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span className="item-sub">
                    {item.cuisine && `${item.cuisine} · `}
                    {item.caloriesPerServing ? `${item.caloriesPerServing} cal` : ""}
                  </span>
                </div>
                <div className="item-qty">
                  <span className="qty-tag">× {item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="info-panel">
          <h2>Delivery Information</h2>
          <div className="delivery-card-content">
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <div className="dispatcher-note">
              <span>🛵 Fast delivery by Addis Courier Service</span>
            </div>
          </div>
        </section>
      </div>

      {/* Action Controls */}
      <div className="order-actions">
        <button
          type="button"
          onClick={() => mutate()}
          disabled={isValidating}
          className="button refresh-btn"
        >
          {isValidating ? "Refreshing…" : "Check Status Now"}
        </button>
        <Link href="/menu" className="button secondary-btn">
          Browse Menu
        </Link>
      </div>

      {error && (
        <p className="field-error" style={{ marginTop: "1rem" }}>
          Notice: Re-connecting to order updates service…
        </p>
      )}
    </div>
  );
}
