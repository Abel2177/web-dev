const formatNumber = new Intl.NumberFormat("en-ET", {
  maximumFractionDigits: 0,
});

export default function RevenueChart({ title, data, valueFormatter, maxValue }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card chart-card-empty">
        <h2>{title}</h2>
        <p>No neighborhood revenue data available.</p>
      </div>
    );
  }

  const chartHeight = 220;
  const chartWidth = 420;
  const padding = { top: 18, right: 18, bottom: 36, left: 44 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;
  const safeMax = Math.max(maxValue || 1, 1);

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h2>{title}</h2>
        <span>ETB</span>
      </div>

      <div className="bar-chart-wrap" role="img" aria-label={title}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="bar-chart-svg" preserveAspectRatio="none">
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const value = safeMax * tick;
            const y = padding.top + innerHeight - (value / safeMax) * innerHeight;
            return (
              <g key={tick}>
                <line x1={padding.left} x2={chartWidth - padding.right} y1={y} y2={y} className="grid-line" />
                <text x={12} y={y + 4} className="chart-axis-label">
                  {formatNumber.format(value)}
                </text>
              </g>
            );
          })}

          {data.map((entry, index) => {
            const barWidth = innerWidth / data.length - 18;
            const x = padding.left + index * (innerWidth / data.length) + 10;
            const barHeight = (entry.revenue / safeMax) * innerHeight;
            const y = padding.top + innerHeight - barHeight;

            return (
              <g key={entry.label}>
                <rect x={x} y={y} width={barWidth} height={barHeight} rx="8" className="bar" />
                <text x={x + barWidth / 2} y={chartHeight - 10} textAnchor="middle" className="chart-label">
                  {entry.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="chart-footer" aria-label="Revenue summary values">
        {data.map((entry) => (
          <div key={entry.label} className="chart-foot-item">
            <span>{entry.label}</span>
            <strong>{valueFormatter(entry.revenue)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
