/**
 * Fetches leaderboard by period and exposes loading/error state.
 * Used for initial load and period switch; live updates handled by useLeaderboardSocket.
 */

import type { Dispatch, SetStateAction } from "react";
import { useState, useCallback, useEffect } from "react";
import { fetchLeaderboard } from "../services/api";
import type { LeaderboardEntry, LeaderboardPeriod } from "../types/leaderboard";

export interface UseLeaderboardDataResult {
  entries: LeaderboardEntry[];
  setEntries: Dispatch<SetStateAction<LeaderboardEntry[]>>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLeaderboardData(period: LeaderboardPeriod): UseLeaderboardDataResult {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchLeaderboard(period);
      setEntries(res.entries);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load leaderboard");
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { entries, setEntries, loading, error, refetch };
}
