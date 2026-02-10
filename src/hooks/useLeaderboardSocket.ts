/**
 * Custom hook: WebSocket for live wager updates with 10s polling fallback.
 * Merges live payloads into current entries and re-sorts by wagered.
 */

import { useEffect, useRef, useCallback } from "react";
import { connectLiveWagers, isConnected } from "../services/socket";
import type { LeaderboardEntry, LeaderboardPeriod, LiveWagerPayload } from "../types/leaderboard";

const POLL_INTERVAL_MS = 10_000;

export interface UseLeaderboardSocketOptions {
  period: LeaderboardPeriod;
  entries: LeaderboardEntry[];
  setEntries: (entries: LeaderboardEntry[] | ((prev: LeaderboardEntry[]) => LeaderboardEntry[])) => void;
  onLiveChange?: (live: boolean) => void;
  refetch: () => Promise<void>;
}

function applyWagerUpdate(
  entries: LeaderboardEntry[],
  payload: LiveWagerPayload
): LeaderboardEntry[] {
  const idx = entries.findIndex((e) => e.userId === payload.userId);
  const prev = idx >= 0 ? entries[idx] : null;
  const nextWagered = payload.wagered;
  const next: LeaderboardEntry = {
    rank: prev?.rank ?? entries.length + 1,
    userId: payload.userId,
    username: payload.username,
    avatarUrl: payload.avatarUrl,
    wagered: nextWagered,
    previousRank: prev?.rank,
    previousWagered: prev?.wagered,
  };

  let nextList: LeaderboardEntry[];
  if (idx >= 0) {
    nextList = entries.slice();
    nextList[idx] = next;
  } else {
    nextList = [...entries, next];
  }

  nextList.sort((a, b) => b.wagered - a.wagered);
  return nextList.map((e, i) => ({ ...e, rank: i + 1 }));
}

export function useLeaderboardSocket({
  period,
  entries,
  setEntries,
  onLiveChange,
  refetch,
}: UseLeaderboardSocketOptions): void {
  const setEntriesRef = useRef(setEntries);
  const entriesRef = useRef(entries);
  const periodRef = useRef(period);

  setEntriesRef.current = setEntries;
  entriesRef.current = entries;
  periodRef.current = period;

  const handleWager = useCallback((payload: LiveWagerPayload) => {
    if (payload.period !== periodRef.current) return;
    setEntriesRef.current((prev) => applyWagerUpdate(prev, payload));
  }, []);

  useEffect(() => {
    onLiveChange?.(true);
    const unsubscribe = connectLiveWagers(handleWager);

    return () => {
      unsubscribe();
      onLiveChange?.(false);
    };
  }, [handleWager, onLiveChange]);

  // Fallback: polling every 10s when WebSocket is down
  useEffect(() => {
    if (isConnected()) return;
    const interval = setInterval(() => {
      if (!isConnected()) refetch();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refetch]);
}
