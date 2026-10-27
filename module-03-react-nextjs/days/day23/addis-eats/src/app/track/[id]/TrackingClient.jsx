"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { downloadCsv, toCsv } from "@/lib/csv";
import { etb, relative, when } from "@/lib/format";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="delivery-map map-placeholder" aria-label="Loading delivery map">Loading map…</div>,
});

const courier = [9.0192, 38.7613];
const destination = [8.9806, 38.7578];

export default function TrackingClient({ order, orderId }) {
  const [connection, setConnection] = useState("connecting");
  const [history, setHistory] = useState([{ status: order.status, title: order.statusTitle, message: order.statusDescription, at: order.lastPolledAt || order.createdAt }]);

  useEffect(() => {
    const source = new EventSource(`/api/orders/${orderId}/stream`);
    source.onopen = () => setConnection("connected");
    source.addEventListener("status", (event) => {
      const update = JSON.parse(event.data);
      setHistory((items) => items.some((item) => item.status === update.status) ? items : [...items, update]);
      if (update.status === "delivered") {
        setConnection("complete");
        source.close();
      }
    });
    source.onerror = () => {
      setConnection("reconnecting");
      // EventSource retries transient network failures itself.
    };
    return () => source.close();
  }, [orderId]);

  const total = useMemo(() => order.items?.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0) || 0, [order.items]);
  const exportHistory = () => downloadCsv(toCsv(history.map((item) => ({ ...item, at: when(item.at) })), [
    { key: "at", label: "Time" }, { key: "status", label: "Status" },
    { key: "title", label: "Title" }, { key: "message", label: "Update" },
  ]), `addis-eats-${orderId}-history.csv`);

  return <div className="tracking-page">
    <div className="tracking-heading">
      <div><p className="eyebrow">Addis Eats delivery</p><h1>Track order #{order.id.slice(0, 8)}</h1><p>Placed {when(order.createdAt)} · {relative(order.createdAt)}</p></div>
      <p className={`stream-state ${connection}`} aria-live="polite"><span />{connection === "connected" ? "Live updates connected" : connection === "complete" ? "Delivery complete" : connection === "reconnecting" ? "Reconnecting…" : "Connecting…"}</p>
    </div>

    <section className="tracking-map-section" aria-labelledby="map-heading">
      <div><h2 id="map-heading">Your delivery route</h2><DeliveryMap courier={courier} destination={destination} /></div>
      <aside className="map-alternative"><h2>Delivery details</h2><p><strong>Courier:</strong> Dawit, on a motorbike near Bole.</p><p><strong>Destination:</strong> {order.address}</p><p className="map-note">The map shows the courier and delivery address. Live status updates are also listed below.</p></aside>
    </section>

    <section className="tracking-card"><div><h2>Order summary</h2><p>{order.items?.map((item) => `${item.quantity} × ${item.name}`).join(", ")}</p></div><strong>{etb(total)}</strong></section>

    <section className="history-section" aria-labelledby="history-heading"><div className="history-header"><div><h2 id="history-heading">Delivery history</h2><p>Every status received from the delivery service.</p></div><button className="button export-button" type="button" onClick={exportHistory}>Export CSV</button></div>
      <ol className="delivery-history">{history.map((item, index) => <li key={`${item.status}-${item.at}-${index}`}><time dateTime={item.at}>{when(item.at)}</time><div><strong>{item.title}</strong><p>{item.message}</p></div></li>)}</ol>
    </section>
  </div>;
}
