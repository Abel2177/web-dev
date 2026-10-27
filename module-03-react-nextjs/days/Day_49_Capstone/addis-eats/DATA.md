# Addis Eats — Data Architecture & Query Strategy (DATA.md)

This document specifies every query utilized in Addis Eats, defining its **Query Key**, **Refresh Rule / Stale Time**, and the architectural **Justification (Why)**.

---

## Shared Fetcher: `lib/fetcher.js`

All client-side queries use the shared fetcher in [`lib/fetcher.js`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/lib/fetcher.js) (and [`src/lib/fetcher.js`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/src/lib/fetcher.js)):

```javascript
export async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    try {
      error.info = await res.json();
    } catch {
      error.info = await res.text();
    }
    error.status = res.status;
    throw error;
  }
  return res.json();
}
```

### Why a Single Shared Fetcher?
- **Unified Error Handling**: Unpacks JSON error bodies from failed responses (`res.ok === false`) and normalizes status codes for SWR error boundaries.
- **Consistency**: Guarantees identical response parsing and serialization across all queries in the application.

---

## Data Decision Table (written before implementation)

| Query | Runs on | Key | Refresh rule | Decision |
| :--- | :--- | :--- | :--- | :--- |
| Initial order status | Server component | Order ID route parameter | Once per request | Seed the client cache with an authorised server read. |
| Live order status | Client (SWR) | `/api/orders/${orderId}` | Every 5 seconds and on focus | Order state changes while delivery is in progress. |
| Menu search | Client (SWR) | Search term or `null` | 300 ms debounce; no fetch for blank input | Avoid a request per keystroke and idle searches. |
| Paged menu | Server first, then client (SWR) | Page and category | 60-second dedupe | Provide fast HTML first, then smooth client navigation. |

## Query 1: Polling Order Status Screen

- **Component**: [`app/orders/[id]/page.js`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/src/app/orders/[id]/page.js) (Server Component) & [`OrderTracker.jsx`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/src/app/orders/[id]/OrderTracker.jsx) (Client Polling)
- **Endpoint**: `GET /api/orders/[id]`

### Query Definition
```javascript
const { data, error, isValidating, mutate } = useSWR(
  `/api/orders/${orderId}`,
  fetcher,
  {
    fallbackData: { order: initialOrder },
    refreshInterval: 5000, // Polls every 5 seconds
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  }
);
```

### Query Key
- **Key**: `/api/orders/${orderId}`
- **Parameters**: `orderId` uniquely identifies the order placed by the customer.

### Refresh Rule & Timing
- **`refreshInterval: 5000` (5 Seconds)**: Automatically polls the server every 5 seconds for status updates.
- **`revalidateOnFocus: true`**: Automatically checks for fresh status if the user switches browser tabs or returns to the application.
- **`fallbackData: { order: initialOrder }`**: Pre-populates the cache on initial render with the server-rendered order data.

### Why & Architectural Justification
1. **Zero Spinner on First Paint**: By fetching the initial order state on the server in `page.js` and passing it to the client as `fallbackData`, SWR is immediately hydrated. `isLoading` is false on initial mount, completely eliminating layout shift, blank screens, and loading spinners on first paint.
2. **Real-time Lifecycle Updates**: Food preparation and delivery is dynamic. Orders transition through 4 stages: `Confirmed` → `Preparing in Kitchen` → `Out for Delivery` → `Delivered`. A 5-second polling interval guarantees the customer sees courier dispatch and delivery progress without overwhelming mobile network bandwidth or server load.
3. **Resilience & Background Sync**: SWR's background polling updates the UI smoothly without unmounting DOM nodes or resetting scroll position.

---

## Query 2: Debounced Live Menu Search

- **Component**: [`app/menu/SearchBox.jsx`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/src/app/menu/SearchBox.jsx)
- **Endpoint**: `GET /api/dishes?search=${encodeURIComponent(trimmed)}`

### Query Definition
```javascript
// 1. Local state updated on each keystroke
const [searchTerm, setSearchTerm] = useState("");
const [debouncedTerm, setDebouncedTerm] = useState("");

// 2. Debounce by 300ms
useEffect(() => {
  const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
  return () => clearTimeout(timer);
}, [searchTerm]);

// 3. Conditional NULL KEY: No request when search box is empty
const trimmed = debouncedTerm.trim();
const searchKey = trimmed
  ? `/api/dishes?search=${encodeURIComponent(trimmed)}`
  : null;

// 4. SWR with keepPreviousData
const { data, error, isValidating } = useSWR(searchKey, fetcher, {
  keepPreviousData: true,
  revalidateOnFocus: false,
  dedupingInterval: 10000,
});
```

### Query Key
- **Key**: `trimmed ? `/api/dishes?search=${encodeURIComponent(trimmed)}` : null`
- **Null-Key Behavior**: When the user clears the search input or it consists only of whitespace, the query key is `null`.

### Refresh Rule & Timing
- **`keepPreviousData: true`**: When the search query changes, the previously rendered results remain on screen while the new request is in flight.
- **`revalidateOnFocus: false`**: Avoids re-fetching search queries when returning to the tab.
- **`dedupingInterval: 10000` (10 seconds)**: Prevents redundant fetches if the user deletes and retypes the same search term within 10 seconds.

### Why & Architectural Justification
1. **No Blank Flashing Between Searches**: Without `keepPreviousData: true`, every change in the search term unmounts existing results and flashes an empty state or loading skeleton. With `keepPreviousData: true`, current results remain visible until new data resolves, providing a desktop-app quality user experience.
2. **Bandwidth Preservation via Null Key**: Passing `null` when the search query is empty tells SWR not to trigger any HTTP request. This prevents wasteful `/api/dishes?search=` requests when the user is simply browsing the default menu.
3. **No Race Conditions**: SWR intrinsically ties query execution to the exact query key. If a user quickly searches `"pizza"` and then `"salad"`, and the `"pizza"` request is delayed on the network, SWR automatically ignores the outdated response once the active key changes to `"salad"`.
4. **300ms Debounce**: Protects the API from firing requests on every keystroke, allowing natural typing flow before committing to network I/O.

---

## Query 3: Paged Dish List

- **Component**: [`app/menu/PagedDishList.jsx`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/src/app/menu/PagedDishList.jsx) & [`app/menu/page.js`](file:///home/johny_x/Documents/IBT_COLLGE_OF_CANADA/sq2-ermias-dereje/module-03-react-nextjs/Days/Day_41/addis-eats/src/app/menu/page.js)
- **Endpoint**: `GET /api/dishes?page=${page}&category=${category}`

### Query Definition
```javascript
const queryKey = `/api/dishes?page=${currentPage}&category=${encodeURIComponent(category)}`;

const { data, isValidating } = useSWR(queryKey, fetcher, {
  fallbackData: isInitial
    ? {
        dishes: initialDishes,
        total: initialTotal,
        page: initialPage,
        totalPages: initialTotalPages,
      }
    : undefined,
  keepPreviousData: true,
  dedupingInterval: 60000, // 60s stale time
  revalidateOnFocus: false,
});
```

### Query Key
- **Key**: `/api/dishes?page=${currentPage}&category=${encodeURIComponent(category)}`
- **Parameters**:
  - `page`: Page index (1-indexed, read directly from URL search params).
  - `category`: Selected cuisine filter (`all`, `Italian`, `Asian`, `American`, etc.).

### Refresh Rule & Timing
- **`keepPreviousData: true`**: Eliminates screen flickering when moving between pages (e.g. from page 1 to page 2).
- **`dedupingInterval: 60000` (60 Seconds Stale Time)**: Dish data is stable and rarely alters mid-session. Requests for previously viewed pages within 60 seconds are served instantly from the client cache.
- **`fallbackData`**: Initial server-rendered page items populate the cache synchronously on first load.

### Why & Architectural Justification
1. **Query String Persistence (`?page=N`)**: Embedding the page number into the URL query string enables shareable links (`/menu?category=Italian&page=2`), allows users to bookmark specific pages, and ensures browser Back/Forward navigation works naturally.
2. **Zero-Flicker Page Transitions**: With `keepPreviousData: true`, the user continues seeing the previous page's dishes while the next page is fetched in the background. A subtle `page-updating-badge` notifies the user without disrupting the page layout.
3. **SEO and Initial Speed**: The first page is server-rendered via Next.js App Router with `fallbackData`, delivering fast time-to-first-byte (TTFB), fast Largest Contentful Paint (LCP), and indexing for search engines.

---

## Summary Matrix

| Query Purpose | Runs on | SWR Query Key | Refresh / Stale Rule | Justification |
| :--- | :--- | :--- | :--- | :--- |
| **Order Polling** | Server seed + client SWR | `/api/orders/${orderId}` | `refreshInterval: 5000`<br>`fallbackData: initialOrder` | Polls order state every 5s; initial data pre-seeded by server so zero loading spinner appears on first paint. |
| **Live Menu Search** | Client SWR | `trimmed ? `/api/dishes?search=${trimmed}` : null` | `keepPreviousData: true`<br>`null key when empty` | 300ms debounce prevents request spam; null key stops idle queries; `keepPreviousData` prevents flashing and layout shifts. |
| **Paged Dish List** | Server seed + client SWR | `/api/dishes?page=${p}&category=${c}` | `keepPreviousData: true`<br>`dedupingInterval: 60000` | Query string drives URL state for bookmarking/history; stale time avoids redundant fetches; `keepPreviousData` smooths page transitions. |
