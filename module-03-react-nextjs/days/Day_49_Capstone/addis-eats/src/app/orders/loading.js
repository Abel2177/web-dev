export default function OrdersLoading() {
  return (
    <main className="orders-page">
      <header className="orders-header loading-header" />
      <section className="table-panel loading-table-panel">
        <div className="table-skeleton-row" />
        <div className="table-skeleton-row" />
        <div className="table-skeleton-row" />
        <div className="table-skeleton-row" />
        <div className="table-skeleton-row" />
      </section>
    </main>
  );
}
