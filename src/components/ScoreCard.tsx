import { memo, useState, useEffect } from "react";
import type { LeaderboardEntry } from "../types/leaderboard";

interface ScoreCardProps {
  entry: LeaderboardEntry;
  style?: React.CSSProperties;
}

function formatWagered(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function ScoreCardComponent({ entry, style }: ScoreCardProps) {
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (entry.previousRank == null && entry.previousWagered == null) return;
    const rankImproved = (entry.previousRank ?? entry.rank) > entry.rank;
    const wageredUp = (entry.previousWagered ?? 0) < entry.wagered;
    if (rankImproved || wageredUp) setFlash("up");
    else if ((entry.previousRank ?? entry.rank) < entry.rank) setFlash("down");
    const t = setTimeout(() => setFlash(null), 300);
    return () => clearTimeout(t);
  }, [entry.rank, entry.wagered, entry.previousRank, entry.previousWagered]);

  const flashClass = flash === "up" ? "animate-flash-up" : flash === "down" ? "animate-flash-down" : "";

  return (
    <div
      role="row"
      style={{ ...style, backgroundColor: "var(--color-surface)" }}
      className={`grid grid-cols-5 gap-2 items-center w-full border-b border-[var(--color-border)] py-3 px-4 transition-colors duration-[var(--duration-normal)] ${flashClass}`}
    >
      <div className="text-[var(--color-muted)] font-mono text-sm tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
        #{entry.rank}
      </div>
      <div className="flex items-center justify-center">
        <div className="relative h-10 w-10">
          <img
            src={entry.avatarUrl}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-[var(--color-surface-elevated)] object-cover"
            loading="lazy"
          />
          {entry.badgeUrl && (
            <img
              src={entry.badgeUrl}
              alt=""
              width={20}
              height={20}
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[var(--color-surface)] object-contain"
              loading="lazy"
            />
          )}
        </div>
      </div>
      <div className="font-display text-[var(--color-text-strong)] text-sm md:text-base truncate">
        {entry.username}
      </div>
      <div className="font-mono tabular-nums text-[var(--color-accent)]" style={{ fontFamily: "var(--font-mono)" }}>
        {formatWagered(entry.wagered)}
      </div>
      <div className="text-sm">
        {entry.previousRank != null && entry.previousRank !== entry.rank ? (
          <span className={entry.previousRank > entry.rank ? "text-[var(--color-up)]" : "text-[var(--color-down)]"}>
            {entry.previousRank > entry.rank ? "↑" : "↓"} {Math.abs(entry.rank - entry.previousRank)}
          </span>
        ) : (
          <span className="text-[var(--color-muted)]">—</span>
        )}
      </div>
    </div>
  );
}

export const ScoreCard = memo(ScoreCardComponent);
