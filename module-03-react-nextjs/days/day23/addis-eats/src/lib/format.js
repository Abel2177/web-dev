/** Shared presentation helpers for order and tracking screens. */
export function etb(value) {
  return new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0);
}

export function when(value, options = {}) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-ET", { dateStyle: "medium", timeStyle: "short", ...options }).format(date);
}

export function relative(value, base = Date.now()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const seconds = (date.getTime() - new Date(base).getTime()) / 1000;
  const units = [["year", 31_536_000], ["month", 2_592_000], ["week", 604_800], ["day", 86_400], ["hour", 3_600], ["minute", 60], ["second", 1]];
  const [unit, secondsInUnit] = units.find(([, size]) => Math.abs(seconds) >= size) || units.at(-1);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.round(seconds / secondsInUnit), unit);
}
