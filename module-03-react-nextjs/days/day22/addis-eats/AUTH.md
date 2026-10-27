# Addis Eats — Authentication Architecture (AUTH.md)

This document describes every protected route, its security layers, and what each layer proves.

---

## Session Cookie & Session Store

| Property       | Value                                                              |
| :------------- | :----------------------------------------------------------------- |
| **Name**       | `session`                                                          |
| **Value**      | Cryptographically random UUID token (`crypto.randomUUID()`)        |
| **Store**      | In-memory `Map` (`sessionId → { userId, expiresAt }`) on server     |
| **TTL**        | 7 days (`7 * 24 * 60 * 60 * 1000` ms)                              |
| **httpOnly**   | `true` — JavaScript cannot read the cookie                          |
| **secure**     | `true` in production (`process.env.NODE_ENV === "production"`)     |
| **sameSite**   | `lax` — mitigates CSRF on cross-site POSTs                         |
| **path**       | `/`                                                                |

The cookie stores only an opaque random session ID. User data, passwords, and expiration are stored securely server-side.

---

## Demo Accounts

| Name        | Email                   | Password     | Role       | User ID |
| :---------- | :---------------------- | :----------- | :--------- | :------ |
| **Almaz**   | `almaz@addis-eats.com`  | `kitfo123`   | `customer` | `usr_1` |
| **Dawit**   | `dawit@addis-eats.com`  | `tibs456`    | `customer` | `usr_2` |
| **Chef Hana** | `staff@addis-eats.com`| `kitchen789` | `staff`    | `usr_3` |

---

## Protected Routes & Defense in Depth

## Security Decision Table (written before implementation)

| Decision | Options considered | Chosen approach | Reason |
| :--- | :--- | :--- | :--- |
| Session model | JWT in browser storage; opaque cookie session | Opaque, httpOnly cookie plus server-side session map | Browser JavaScript never receives the credential, and sessions can be revoked on sign-out. |
| Route gate | Client-only hiding; proxy only; layered checks | Proxy, server component, and API enforcement | Each layer independently protects against a different bypass path. |
| Order access | Any signed-in user; owner-only; owner plus staff | Owner-only with staff exception | Customers can only read their own orders while kitchen staff can fulfil all orders. |

### 1. `/checkout` — Customer Checkout

| Layer                | File                          | What It Proves                                                              |
| :------------------- | :---------------------------- | :-------------------------------------------------------------------------- |
| **Proxy (Middleware)**| `proxy.js` / `src/proxy.js`   | Checks `session` cookie presence. Redirects to `/signin?next=/checkout` if missing. |
| **Server Component** | `src/app/checkout/page.js` | Calls `getSession()` and redirects when the cookie is forged, expired, or no longer in the session store. |
| **API Route (POST)** | `src/app/api/orders/route.js` | Server calls `getSession()`. Stamped with authenticated `userId` on creation. |

### 2. `/orders/[id]` — Order Tracking

| Layer                 | File                              | What It Proves                                                                    |
| :-------------------- | :-------------------------------- | :-------------------------------------------------------------------------------- |
| **Proxy (Middleware)**| `proxy.js` / `src/proxy.js`       | Checks `session` cookie presence. Redirects to `/signin?next=/orders/[id]` if missing. |
| **Server Component**  | `src/app/orders/[id]/page.js`     | `getSession()` validates active session. Verifies `order.userId === session.id` (or `role === "staff"`). Redirects home otherwise. |
| **API Route (GET)**   | `src/app/api/orders/[id]/route.js`| `getSession()` validates session. Returns `403 Forbidden` if customer does not own order. |

### 3. `/kitchen` — Staff Dashboard (Kitchen Orders)

| Layer                 | File                              | What It Proves                                                                    |
| :-------------------- | :-------------------------------- | :-------------------------------------------------------------------------------- |
| **Proxy (Middleware)**| `src/proxy.js` | Requires a session cookie before the kitchen page is reached. |
| **Server Component**  | `src/app/kitchen/page.js`         | `getSession()` checks `session.role === "staff"`. Non-staff and unauthenticated requests are redirected to `/`. Role checked strictly in server code, not just markup. |
| **API Route (GET)** | `src/app/api/kitchen/orders/route.js` | Revalidates the session and returns `403` unless the role is `staff`, so the order feed cannot be exposed by a future client implementation. |

---

## Sign-In / Sign-Out Flow

### Sign-In Flow
1. Unauthenticated user visits `/checkout` or `/orders/xyz`.
2. Proxy middleware detects no `session` cookie and redirects to `/signin?next=<path>`.
3. User enters credentials or clicks a quick-fill demo account.
4. Client POSTs to `/api/auth/signin`.
5. Server calls `signIn(email, password)`, creates a session in `sessions` Map, and sets `session` cookie with httpOnly, secure, and sameSite flags.
6. Client navigates to the validated `next` destination.

### Open-Redirect Protection
- The `next` query parameter is validated in both proxy middleware and `/signin/page.js`.
- It must start with `/` (relative URL).
- Any attempt to pass an absolute URL (e.g. `?next=https://evil.com` or `?next=//evil.com`) is rejected and reset to `/`.

### Sign-Out Flow
1. User clicks "Sign Out" button in navigation.
2. Client POSTs to `/api/auth/signout`.
3. Server deletes the session token from the `sessions` Map and clears the cookie (`maxAge: 0`).
4. Client redirects to `/` and refreshes layout.

---

## Order Ownership Model

Every order is stamped with a `userId` on creation:
- **Write:** `POST /api/orders` retrieves `session.id` and assigns it as `order.userId`.
- **Read:** `GET /api/orders/[id]` and `OrderStatusPage` ensure that customer A cannot read customer B's orders by URL guessing or API probing.
- **Staff Exemption:** Staff (`role === "staff"`) can view all orders across the restaurant for fulfillment.

## Attack Verification Record

The following attacks were run against the production-mode route handlers after build steps 1–3. Status codes and redirects were checked with a clean browser session and with the listed demo accounts.

| Attack | Request / action | Expected result | Layer that stopped it | Recorded result |
| :--- | :--- | :--- | :--- | :--- |
| No-session checkout bypass | Visit `/checkout` with no `session` cookie, then `POST /api/orders` directly | Redirect for the page; `401` for the API | Proxy; checkout server component; orders API | Stopped — redirect to `/signin?next=/checkout`; direct write rejected. |
| IDOR order read | Sign in as Almaz and request Dawit’s `/orders/sample-1` and `/api/orders/sample-1` | Page redirect and API `403` | Order server component; order API | Stopped — Almaz cannot view Dawit’s order. |
| Privilege escalation | Sign in as Almaz and request `/kitchen` and `/api/kitchen/orders` | Page redirect and API `403` | Kitchen server component; kitchen API | Stopped — customer account cannot access kitchen data. |

## Build Sequence

1. Define the session, ownership, and data-query decision tables.
2. Implement account sign-in/sign-out, the three protection layers, and server-seeded SWR queries.
3. Run `npm run lint`, `npm run build`, and the three attacks above before deployment.

---

## File Summary

| File                                | Purpose                                            |
| :---------------------------------- | :------------------------------------------------- |
| `proxy.js` / `src/proxy.js`         | Edge cookie existence check & redirect with `next` |
| `src/lib/session.js`                | In-memory session store, `signIn`, `signOut`, `getSession`, cookie config |
| `src/app/signin/page.js`            | Sign-in page with open-redirect validation         |
| `src/app/signin/SignInForm.jsx`     | Interactive sign-in form with demo account buttons |
| `src/app/SignOutButton.jsx`         | Client component for signing out                   |
| `src/app/api/auth/signin/route.js`  | API endpoint calling `signIn()`                    |
| `src/app/api/auth/signout/route.js` | API endpoint calling `signOut()`                   |
| `src/app/kitchen/page.js`           | Staff-only kitchen management dashboard            |
| `src/app/orders/[id]/page.js`       | Protected order tracking page with ownership check |
| `src/app/api/orders/route.js`       | Protected order creation route                     |
| `src/app/api/orders/[id]/route.js`  | Protected order polling route                      |
| `src/lib/orders.js`                 | In-memory orders store & helper queries            |
| `src/app/layout.js`                 | Dynamic navigation showing auth status & staff link|
