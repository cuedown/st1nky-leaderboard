/**
 * Site config — update these for your stream / brand.
 */

export const SITE = {
  /** Streamer / host name */
  streamerName: "St1nkyP3te",
  /** Kick channel URL */
  kickChannelUrl: "https://kick.com/st1nkyp3te",
  /** Gamba.com base URL */
  gambaUrl: "https://gamba.com",
  /** Gamba exclusive leaderboards base (promos list) */
  gambaPromoUrl: "https://gamba.com/promotions/exclusive-leaderboards",
  /** 2026SENDER leaderboard — live stats: name, pfp, wager, timer (https://gamba.com/promotions/exclusive-leaderboards/6865) */
  gambaLeaderboard6865Url: "https://gamba.com/promotions/exclusive-leaderboards/6865",
  /** Promo end date for countdown (ISO string). Set to null to hide countdown. */
  promoEndDate: "2026-02-10T23:59:59.000Z",
} as const;
