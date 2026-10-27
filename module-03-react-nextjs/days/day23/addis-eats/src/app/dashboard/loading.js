export default function DashboardLoading() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-header loading-block-heading" />

      <div className="summary-grid">
        <div className="summary-card loading-card" />
        <div className="summary-card loading-card" />
        <div className="summary-card loading-card" />
      </div>

      <div className="chart-grid">
        <div className="chart-card loading-chart" />
        <div className="chart-card loading-chart" />
      </div>
    </main>
  );
}
