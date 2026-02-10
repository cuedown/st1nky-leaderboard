# St1nkyP3te — Casino streaming hub

A full **streamer hub** for St1nkyP3te: Kick channel, Gamba.com promotions, live leaderboard, rewards, and bonus hunt. Single-page site with Gamba-style theme (dark canvas, teal accent).

## What’s included

- **Nav** — Sticky nav with streamer name, Promotions / Leaderboard / Rewards / Bonus Hunt, and **Watch on Kick** CTA
- **Hero** — Headline, “Watch live on Kick”, “Climb the leaderboard”, 18+ disclaimer
- **Promotions** — 2026SENDER, Exclusive Leaderboards at Gamba.com, Welcome / sign-up at Gamba
- **Leaderboard** — Countdown to promo end, **View live leaderboard on Gamba** CTA → [Gamba 6865](https://gamba.com/promotions/exclusive-leaderboards/6865); table for preview (live stats: name, pfp, wager, timer on Gamba)
- **Rewards** — Rakeback, weekly bonuses, rejuice, VIP & more (Gamba-style copy)
- **Bonus Hunt** — What bonus hunts are, CTA to watch on Kick
- **Footer** — Kick + Gamba links, 18+ and responsible gambling

## Config

Edit **`src/config/site.ts`** to set:

- `streamerName` — e.g. `"St1nkyP3te"`
- `kickChannelUrl` — your Kick channel
- `gambaUrl` — Gamba.com base URL
- `gambaPromoUrl` — exclusive leaderboards list
- `gambaLeaderboard6865Url` — 2026SENDER leaderboard (live stats)
- `promoEndDate` — ISO end date for countdown (or null to hide)

## Tech stack

- **React 18+** + TypeScript
- **Tailwind CSS v4** — theme in `src/index.css` (Gamba-style colors)
- **Leaderboard**: REST + WebSocket (Socket.IO), virtualized list, mock data when no backend

## Run

```bash
cd leaderboard-app
npm install
npm run dev
```

Open the URL (e.g. http://localhost:5173). The leaderboard table pulls from **Gamba 6865** once per hour when the scraper server is running.

**Scraper (1×/hour):** In a second terminal run `npm run server`. This fetches [Gamba 6865](https://gamba.com/promotions/exclusive-leaderboards/6865), parses the HTML for usernames, avatars, and wager amounts, and serves them at `GET /api/gamba-leaderboard`. Vite proxies that path to the server in dev.

- **Live page loads list via JS:** Use a saved snapshot for testing: `GAMBA_HTML_FILE=/path/to/snapshot.html npm run server`. Or use headless Chrome: `npm install puppeteer` then `USE_PUPPETEER=1 npm run server` (refreshes every 1h).

## Project structure

```
src/
├── config/
│   └── site.ts              # Streamer name, Kick URL, Gamba URLs
├── components/
│   ├── layout/
│   │   ├── Nav.tsx          # Sticky nav + Kick CTA
│   │   └── Footer.tsx       # Links, 18+, disclaimer
│   ├── sections/
│   │   ├── Hero.tsx         # Hero + Kick CTA
│   │   ├── Promotions.tsx   # 2026SENDER, leaderboards, Gamba sign-up
│   │   ├── LeaderboardSection.tsx  # Wraps leaderboard + state
│   │   ├── Rewards.tsx      # Rakeback, VIP, weekly, rejuice
│   │   └── BonusHunt.tsx    # Bonus hunt copy + Kick CTA
│   ├── LeaderboardTable.tsx
│   ├── ScoreCard.tsx
│   ├── Countdown.tsx
│   ├── LiveBadge.tsx
│   ├── ViewTabs.tsx
│   └── SkeletonRow.tsx
├── hooks/
├── services/
├── types/
├── App.tsx
└── index.css
```

## Backend (optional)

- **REST** `GET /api/leaderboard?period=daily|weekly|alltime`
- **WebSocket** (Socket.IO) event `wager` with `{ userId, username, avatarUrl, wagered, period }`

See `src/types/leaderboard.ts` for types.
