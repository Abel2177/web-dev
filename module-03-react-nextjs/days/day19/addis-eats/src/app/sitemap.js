// app/sitemap.js
// Next.js calls this at build time (or on-demand with ISR) and serves the result
// at GET /sitemap.xml. Private routes (/cart, /checkout, /kitchen, /orders,
// /signin) are intentionally excluded.

import { dishes } from "./menu/dishes";

const BASE_URL = "https://addiseats.et";

export default function sitemap() {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/menu`,
      lastModified: new Date(),
      changeFrequency: "hourly", // matches revalidate: 3600 on the menu page
      priority: 0.9,
    },
  ];

  // ── Dynamic dish routes ────────────────────────────────────────────────────
  const dishRoutes = dishes.map((dish) => ({
    url: `${BASE_URL}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dishRoutes];
}
