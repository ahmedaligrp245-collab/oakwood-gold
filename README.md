# Oakwood Advisory Group — Gold Edition

Institutional-style Forex & CFD client portal (frontend only).

## What's included

- **Login page** – Professional dark navy / gold institutional design
- **Client Portal** with sidebar navigation:
  - **Dashboard** – Account summary, market watch, open positions
  - **Trading Terminal** – Instrument list, chart area, full order ticket (Buy/Sell, Market/Limit, SL/TP)
  - **Portfolio** – Exposure table, asset allocation, risk notes
  - **Trade History** – Closed trades with P/L and performance stats

All data is simulated (demo mode). No real trading or backend.

## Tech stack

- Next.js 15/16 (App Router)
- TypeScript
- Tailwind CSS v4
- Pure CSS design tokens (no external UI library required)

## How to run locally

```bash
cd oakwood-gold
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

**Login:** Enter any email + password → you will be taken to the portal.

## Deploy (get a public link)

1. Push the folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import project
3. Deploy → you get a free public URL (e.g. `https://oakwood-gold.vercel.app`)

Alternatively use Netlify or Cloudflare Pages.

## Project structure

```
src/
  app/
    page.tsx                 → Login / landing
    layout.tsx               → Root layout + fonts
    globals.css              → Design system
    portal/
      layout.tsx             → Sidebar + auth guard
      dashboard/page.tsx
      trading/page.tsx
      portfolio/page.tsx
      history/page.tsx
  components/
    Sidebar.tsx
```

## Next steps (when you want backend)

- NestJS API + Prisma + PostgreSQL
- Real authentication + MFA
- Live price feeds
- Order management & risk engine
- CRM / Admin panel

---

© 2026 Oakwood Advisory Group — Gold Edition (Demo)
