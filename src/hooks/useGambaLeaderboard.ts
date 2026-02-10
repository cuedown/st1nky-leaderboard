/**
 * Fetches 2026SENDER leaderboard from /api/gamba-leaderboard (scraped from Gamba 6865, 1x/hour).
 */

import { useState, useCallback, useEffect } from "react";
import { fetchGambaLeaderboard } from "../services/api";
import type { LeaderboardEntry } from "../types/leaderboard";

export interface UseGambaLeaderboardResult {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  updatedAt: string | null;
  refetch: () => Promise<void>;
}

export function useGambaLeaderboard(): UseGambaLeaderboardResult {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchGambaLeaderboard();
      setEntries(res.entries ?? []);
      setUpdatedAt(res.updatedAt ?? null);
      if (res.error && !res.entries?.length) setError(res.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setEntries([]);
      setUpdatedAt(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { entries, loading, error, updatedAt, refetch };
}
