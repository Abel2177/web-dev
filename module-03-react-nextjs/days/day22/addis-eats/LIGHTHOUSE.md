# Lighthouse Results — Addis Eats

> Latest capture: `http://localhost:3000/menu`. The screenshot does not show the audit device or network profile, so compare scores only across runs with matching conditions.

## Latest Audit

![Latest Lighthouse audit — Performance 97, Accessibility 100, Best Practices 100, SEO 100](<./public/Pasted image.png>)

| Category | Score | Status |
| :--- | ---: | :---: |
| **Performance** | 97 | 🟢 Excellent |
| **Accessibility** | 100 | 🟢 Perfect |
| **Best Practices** | 100 | 🟢 Perfect |
| **SEO** | 100 | 🟢 Perfect |

### Performance Metrics

| Metric | Result |
| :--- | ---: |
| **First Contentful Paint** | 0.3 s |
| **Largest Contentful Paint** | 0.8 s |
| **Total Blocking Time** | 150 ms |
| **Cumulative Layout Shift** | 0 |

> Lighthouse warned that stored IndexedDB data may affect loading performance. Re-run in an **incognito window** or clear site data for a cleaner comparison.

---

## Historical Round 1 → Round 2 Progress

---

## Round 1 → Round 2 Progress

| Metric | Round 1 (dev) | Round 2 (dev) | Δ |
| :--- | ---: | ---: | ---: |
| **Performance** | 54 | **74** | **+20** ✅ |
| **Accessibility** | — | **100** | 🟢 Perfect |
| **Best Practices** | — | **96** | 🟢 Excellent |
| **SEO** | — | **100** | 🟢 Perfect |

---

## Changes in Round 2

| Change | File | Impact |
| :--- | :--- | :--- |
| Removed `force-dynamic` from dishes API | `api/dishes/route.js` | Route is now cacheable by CDN/browser |
| Added `Cache-Control: s-maxage=60` | `api/dishes/route.js` | Repeat SWR fetches served from cache |
| Added `formats: ["image/avif", "image/webp"]` | `next.config.mjs` | AVIF ≈50% smaller than JPEG → faster LCP |
| Tuned `deviceSizes` / `imageSizes` | `next.config.mjs` | Browser picks tightest-fitting image source |
| Replaced inline cards with `<DishCard>` | `SearchBox.jsx` | Search images get `next/image` optimisation |

---

## Reproducing the Audit

```bash
# Stop the dev server first, then build and start the production app.
npm run build
npm run start

# Open Chrome DevTools → Lighthouse and audit http://localhost:3000/menu.
# Use Incognito mode or clear site data before measuring.
```
