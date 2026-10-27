# Addis Eats — Day 49 Triage and Verification Plan

## Must

- Keep the main flow complete: menu → cart → sign in → checkout → order tracking.
- Keep authentication and ownership checks active on `/checkout`, `/orders/[id]`, and `/kitchen`, including the API routes.
- Keep empty, loading, and error states usable for a new account.
- Keep the production build, README, and the three required architecture documents accurate.

## Should

- Run the security attacks against the deployed URL: no-session write, cross-user order ID, staff-route privilege escalation, and an absolute `next` URL.
- Run Lighthouse in an incognito window, keyboard-only navigation, a real-phone pass, and the clone/README test.
- Record the deployed measurements in `PERF.md` and replace any stale local-only claims.

## Could — cut for this assessment

- Persistent database and hashed-password account system.
- Real payment processing and transactional order updates.
- Live driver GPS and push notifications.
- Additional themes, animation, and other visual polish.

These are intentionally deferred because the assessed objective is a complete, demonstrable frontend capstone. They are recorded rather than started so they cannot destabilize the verified build.

## Four-hour working plan

| Time | Action | Evidence of completion |
| --- | --- | --- |
| 0:00–0:30 | Triage and cut scope | This file and `FUTURE.md` reviewed |
| 0:30–2:00 | Verify main flow and auth | Live flow completes; attack results recorded in `AUTH.md` |
| 2:00–3:00 | Verify all UI states | New-account pass completed |
| 3:00–3:30 | Build and verification battery | Build, Lighthouse, keyboard, phone, discovery checks |
| 3:30–4:00 | Documentation and rehearsal | README/docs current; eight-minute walkthrough rehearsed |

## Current local evidence

- `npm run lint`: completed without reported lint errors.
- `npm run build -- --webpack`: passes and generates all routes.
- `npm run build`: Turbopack cannot spawn/bind a worker in the restricted execution environment while processing Leaflet CSS; retry in the normal development environment.
- Deployed-URL checks, real-phone checks, and an eight-minute spoken rehearsal still require manual execution.
