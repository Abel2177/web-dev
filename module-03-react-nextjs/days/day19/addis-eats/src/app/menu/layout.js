// The menu segment wraps all /menu/* routes in a <main> shell.
// Metadata lives in page.js (static) and [id]/page.js (dynamic) — not here,
// because a layout's metadata export is merged before its children override it.
export default function MenuLayout({ children }) {
  return <main className="menu-shell">{children}</main>;
}