# Research: Gambling streamer websites & leaderboard integration

References used to shape layout, CTAs, and leaderboard behaviour for this streamer hub.

---

## Gambling streamer / Kick creator sites

- **IceInMyVein** — [iceinmyvein.com](https://iceinmyvein.com)  
  Streamer hub with profile, tournaments, and links to Stake.com / Stake.us. Layout: home, profile, tournaments; crypto casino and community focus.  
  *Used as layout reference: clear nav, promo sections, CTA to casino.*

- **TrainwrecksTV** — No dedicated personal site; promo presence via Kick + Stake.  
  - [Kick: trainwreckstv](https://kick.com/trainwreckstv)  
  - Stake streamer bonus pages (e.g. [Trainwreckstv Stake bonus code](https://stake-casino-bonus.com/bonus-giveaways/trainwreckstv-stake-code-1)): bonus details, signup via streamer code, CTA to register.  
  *Pattern: streamer name + “sign up with my code” + bonus/leaderboard CTAs.*

- **xQc** — No standalone streamer website; Kick + Stake promo.  
  - [Kick](https://kick.com), Stake.com streamer deals.  
  - Layout pattern from affiliate/streamer pages: hero, bonus/promo, “use my code” CTA, responsible gambling note.  
  *Pattern: single clear CTA (register with code), minimal clutter.*

---

## Gamba.com leaderboard (2026SENDER / 6865)

- **Live leaderboard URL**  
  [https://gamba.com/promotions/exclusive-leaderboards/6865](https://gamba.com/promotions/exclusive-leaderboards/6865)

- **Data shown on Gamba**  
  Promo period (date range / timer), hosted-by streamer, rank, avatar (PFP), username, wagered amount, prize.  
  *Source: saved snapshot “2026SENDER ｜ Climb the Leaderboard at Gamba.com” and live page.*

- **Integration approach**  
  Gamba does not expose a public API for this leaderboard. This site:
  - Links all “leaderboard” CTAs to the live Gamba URL above so users see real stats (name, pfp, wager, timer).
  - Shows a countdown to the promo end date (config: `promoEndDate` in `src/config/site.ts`).
  - Keeps an on-site leaderboard table for preview/demo; copy clarifies that live rankings, avatars, wager and timer are on Gamba.

---

## Gamba.com references

- [Gamba — Online Crypto Casino & Sports Betting](https://gamba.com)
- [Gamba Promotions / Exclusive Leaderboards](https://gamba.com/promotions/exclusive-leaderboards)
- [2026SENDER leaderboard (6865)](https://gamba.com/promotions/exclusive-leaderboards/6865)
- [Gamba Affiliate Program](https://gamba.com/affiliate) — leaderboards and promo tools for affiliates

---

## Layout takeaways applied here

1. **Hero** — Streamer name, “Watch on Kick”, one main partner CTA (Gamba / leaderboard).
2. **Promotions** — 2026SENDER first, linking to 6865; then other offers; no filler.
3. **Leaderboard** — Single primary CTA: “View live leaderboard on Gamba” → 6865; countdown when promo end date is set; small note that live data is on Gamba.
4. **Rewards / Bonus Hunt** — Short copy, bullets, one CTA each (Gamba or Kick).
5. **Footer** — 18+, responsible gambling, Kick + Gamba links.

*Last updated: 2026-02-09*
