/**
 * API & WebSocket data types for casino streamer leaderboard.
 * REST: GET /api/leaderboard | WebSocket: ws://[domain]/live-wagers
 */

export type LeaderboardPeriod = "daily" | "weekly" | "alltime";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string;
  /** Gamba VIP rank badge icon (e.g. Silver 1, Diamond 2). Optional. */
  badgeUrl?: string;
  wagered: number;
  previousRank?: number;
  previousWagered?: number;
}

export interface LeaderboardResponse {
  period: LeaderboardPeriod;
  entries: LeaderboardEntry[];
  updatedAt: string; // ISO
}

export interface LiveWagerPayload {
  userId: string;
  username: string;
  avatarUrl: string;
  wagered: number;
  period: LeaderboardPeriod;
}

export interface LeaderboardState {
  period: LeaderboardPeriod;
  entries: LeaderboardEntry[];
  updatedAt: string | null;
  loading: boolean;
  error: string | null;
  live: boolean;
}
