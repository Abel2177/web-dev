"use client";

import { useRouter } from "next/navigation";

const categories = [
  { label: "All dishes", value: "all" },
  { label: "Italian", value: "Italian" },
  { label: "Asian", value: "Asian" },
  { label: "American", value: "American" },
];

// This is the client FilterShell. DishList is received as children instead of
// imported here, which keeps its rendering and data dependencies on the server.
export default function CategoryBar({ activeCategory, children }) {
  const router = useRouter();

  function selectCategory(category) {
    router.push(category === "all" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`);
  }

  return <><aside className="category-sidebar"><h2>Browse categories</h2><ul>{categories.map(({ label, value }) => <li key={value}><button aria-pressed={activeCategory === value} className={activeCategory === value ? "is-active" : ""} onClick={() => selectCategory(value)} type="button">{label}</button></li>)}</ul></aside><section className="menu-content">{children}</section></>;
}
