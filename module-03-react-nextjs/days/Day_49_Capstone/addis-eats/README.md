# Addis Eats

Addis Eats is a Next.js food-ordering demo with account-based ordering,
defence-in-depth route protection, server-seeded SWR polling, debounced menu
search, and SEO metadata.

## Deployed URL

**Live URL:** https://addis-eats.vercel.app

The source uses this value for the canonical metadata, sitemap, and robots file.

## Run from a fresh clone

```bash
git clone <your-repository-url>
cd Day_48/addis-eats
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. To check the production build locally:

```bash
npm run lint
npm run build
npm run start
```

## Demo accounts

| Account | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| Almaz | `almaz@addis-eats.com` | `kitfo123` | Customer |
| Dawit | `dawit@addis-eats.com` | `tibs456` | Customer |
| Chef Hana | `staff@addis-eats.com` | `kitchen789` | Staff |

## Deploy and verify

1. Create a Vercel project with `addis-eats` as its root directory.
2. Add `NEXT_PUBLIC_SITE_URL` with the production URL and, optionally,
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` for deferred Google Analytics.
3. Deploy, then verify `/`, `/menu`, `/sitemap.xml`, `/robots.txt`, and each
   Open Graph image route from the deployed URL.
4. Re-run the attacks documented in [AUTH.md](./AUTH.md) against the deployed
   site before submitting.

See [AUTH.md](./AUTH.md), [DATA.md](./DATA.md), and [PERF.md](./PERF.md) for
the implementation and verification records.
