# Addis Eats — Deferred Work

The following items were cut from the Day 49 capstone scope to protect the complete main flow, authentication, verification, documentation, and presentation.

| Deferred item | Why it is deferred | Next step |
| --- | --- | --- |
| Persistent database | The current demo uses in-memory users, sessions, and orders; adding persistence would expand the scope and deployment risk. | Replace the stores with a database and migrations. |
| Password hashing and account creation | Demo credentials are adequate for this classroom capstone but are not production authentication. | Add registration, Argon2/bcrypt hashing, reset, and rate limiting. |
| Real payments | Payment-provider setup and webhook handling are outside the assessed frontend flow. | Add a provider sandbox and server-verified webhooks. |
| Live driver location and notifications | The current order tracker demonstrates status polling without introducing a second real-time system. | Add a delivery service, map position updates, and push notifications. |
| Additional themes and animation | Visual polish does not improve completion of the assessed ordering flow enough to justify regression risk. | Revisit after usability and accessibility testing. |

No deferred item should be started after the verification pass unless it is required to fix a discovered defect.
