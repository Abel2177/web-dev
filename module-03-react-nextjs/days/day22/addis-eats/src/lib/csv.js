function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(rows, columns) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const keys = columns?.length ? columns.map((column) => typeof column === "string" ? column : column.key) : [...new Set(safeRows.flatMap((row) => Object.keys(row || {})))];
  const labels = columns?.length ? columns.map((column) => typeof column === "string" ? column : column.label || column.key) : keys;
  return [labels, ...safeRows.map((row) => keys.map((key) => row?.[key]))].map((line) => line.map(csvCell).join(",")).join("\r\n");
}

export function downloadCsv(csv, filename = "export.csv") {
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
