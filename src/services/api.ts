/**
 * REST API for leaderboard.
 * GET /api/leaderboard?period=daily|weekly|alltime
 * GET /api/gamba-leaderboard — scraped from Gamba 6865, refreshed every 1h
 */

import type { LeaderboardEntry, LeaderboardPeriod, LeaderboardResponse } from "../types/leaderboard";

const GAMBA_CACHE_KEY = "gamba_6865_cache";
const GAMBA_CACHE_TTL_MS = 55 * 60 * 1000; // 55 min (under 1h refresh)

export interface GambaLeaderboardResponse {
  entries: LeaderboardEntry[];
  updatedAt: string | null;
  source?: string;
  error?: string;
}

export async function fetchGambaLeaderboard(): Promise<GambaLeaderboardResponse> {
  const base = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
  const cached = getGambaCached();
  if (cached) return cached;
  try {
    const res = await fetch(`${base}/api/gamba-leaderboard`);
    const data: GambaLeaderboardResponse = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    if (data.entries?.length) setGambaCached(data);
    return data;
  } catch (e) {
    return {
      entries: [],
      updatedAt: null,
      error: e instanceof Error ? e.message : "Failed to load Gamba leaderboard",
    };
  }
}

function getGambaCached(): GambaLeaderboardResponse | null {
  try {
    const raw = localStorage.getItem(GAMBA_CACHE_KEY);
    if (!raw) return null;
    const { data, at } = JSON.parse(raw);
    if (!at || Date.now() - at > GAMBA_CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function setGambaCached(data: GambaLeaderboardResponse): void {
  try {
    localStorage.setItem(GAMBA_CACHE_KEY, JSON.stringify({ data, at: Date.now() }));
  } catch {
    // ignore
  }
}

const CACHE_KEY = "leaderboard_cache";
const CACHE_TTL_MS = 60_000; // 1 min

function getBaseUrl(): string {
  return typeof window !== "undefined"
    ? `${window.location.origin}`
    : "http://localhost:5173";
}

export async function fetchLeaderboard(
  period: LeaderboardPeriod
): Promise<LeaderboardResponse> {
  const url = `${getBaseUrl()}/api/leaderboard?period=${period}`;
  const cached = getCached(period);
  if (cached) return cached;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Leaderboard fetch failed: ${res.status}`);
    const data: LeaderboardResponse = await res.json();
    setCached(period, data);
    return data;
  } catch {
    return getMockLeaderboard(period);
  }
}

function getMockLeaderboard(period: LeaderboardPeriod): LeaderboardResponse {
  const names = ["HighRoller99", "LuckyDice", "ChipKing", "BetMaster", "SlotQueen", "RouletteRoy", "PokerAce", "JackpotJill", "VegasVibes", "StakeStar"];
  const entries = names.map((username, i) => ({
    rank: i + 1,
    userId: `user-${i}`,
    username,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    wagered: Math.round(50000 - i * 4000 + Math.random() * 2000),
  }));
  entries.sort((a, b) => b.wagered - a.wagered);
  entries.forEach((e, i) => { e.rank = i + 1; });
  return { period, entries, updatedAt: new Date().toISOString() };
}

function getCached(period: LeaderboardPeriod): LeaderboardResponse | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { period: p, data, at } = JSON.parse(raw);
    if (p !== period || !at) return null;
    if (Date.now() - at > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function setCached(period: LeaderboardPeriod, data: LeaderboardResponse): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ period, data, at: Date.now() })
    );
  } catch {
    // ignore
  }
}

export function clearLeaderboardCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}
