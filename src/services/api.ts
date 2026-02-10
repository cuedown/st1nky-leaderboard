/**
 * REST API for leaderboard.
 * GET /api/leaderboard?period=daily|weekly|alltime
 * GET /api/gamba-leaderboard — scraped from Gamba 6865, refreshed every 1h
 */

import type { LeaderboardEntry, LeaderboardPeriod, LeaderboardResponse } from "../types/leaderboard";
import { SITE } from "../config/site";

const GAMBA_CACHE_KEY = "gamba_6865_cache";
const GAMBA_CACHE_TTL_MS = 55 * 60 * 1000; // 55 min (under 1h refresh)

export interface GambaLeaderboardResponse {
  entries: LeaderboardEntry[];
  updatedAt: string | null;
  source?: string;
  error?: string;
}

function getApiBase(): string {
  if (typeof window === "undefined") return "http://localhost:5173";
  // Prefer explicit Render API base if provided at build time; otherwise fall back to current origin.
  const envBase = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  return envBase || window.location.origin;
}

export async function fetchGambaLeaderboard(): Promise<GambaLeaderboardResponse> {
  const primaryBase = getApiBase();
  const fallbackBase = SITE.gambaUrl.startsWith("http")
    ? new URL(SITE.gambaUrl).origin.replace("https://gamba.com", "https://st1nky-leaderboard.onrender.com")
    : "https://st1nky-leaderboard.onrender.com";
  const cached = getGambaCached();
  if (cached) return cached;
  try {
    const bases = [primaryBase, fallbackBase].filter(
      (b, idx, arr) => b && arr.indexOf(b) === idx
    ) as string[];

    let lastError: unknown;
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, "")}/api/gamba-leaderboard`);
        const data: GambaLeaderboardResponse = await res.json();
        if (!res.ok) {
          lastError = data?.error || `HTTP ${res.status}`;
          continue;
        }
        if (data.entries?.length) {
          setGambaCached(data);
        }
        return data;
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError ?? new Error("Unable to reach Gamba leaderboard API");
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
  return getApiBase();
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
