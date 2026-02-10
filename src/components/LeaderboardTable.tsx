import { memo, useCallback } from "react";
import { List } from "react-window";
import { ScoreCard } from "./ScoreCard";
import { SkeletonRow } from "./SkeletonRow";
import type { LeaderboardEntry } from "../types/leaderboard";

const ROW_HEIGHT = 56;
const HEADER_HEIGHT = 48;

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  loading: boolean;
  height?: number;
}

interface RowProps {
  entries: LeaderboardEntry[];
}

function TableHeader() {
  return (
    <div
      role="row"
      className="grid grid-cols-5 gap-2 items-center w-full border-b-2 border-[var(--color-border)] py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]"
    >
      <div>Rank</div>
      <div className="flex justify-center">Avatar</div>
      <div>Username</div>
      <div>Wagered</div>
      <div>Change</div>
    </div>
  );
}

function LeaderboardTableComponent({ entries, loading, height = 420 }: LeaderboardTableProps) {
  const Row = useCallback(
    ({
      index,
      style,
      ariaAttributes,
      entries: listEntries,
    }: {
      index: number;
      style: React.CSSProperties;
      ariaAttributes: { "aria-posinset": number; "aria-setsize": number; role: "listitem" };
    } & RowProps) => {
      const entry = listEntries[index];
      if (!entry) return <SkeletonRow style={style} />;
      return (
        <div {...ariaAttributes} style={style}>
          <ScoreCard entry={entry} />
        </div>
      );
    },
    []
  );

  if (loading && entries.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
        <TableHeader />
        <div className="min-h-[300px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonRow key={i} style={{ height: ROW_HEIGHT }} />
          ))}
        </div>
      </div>
    );
  }

  const listHeight = Math.min(height - HEADER_HEIGHT, entries.length * ROW_HEIGHT) || 300;

  return (
    <div className="rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
      <TableHeader />
      {entries.length === 0 ? (
        <div className="py-12 text-center text-[var(--color-muted)]">No entries yet.</div>
      ) : entries.length > 100 ? (
        <List<RowProps>
          rowComponent={Row}
          rowCount={entries.length}
          rowHeight={ROW_HEIGHT}
          rowProps={{ entries }}
          overscanCount={5}
          style={{ height: listHeight, width: "100%" }}
        />
      ) : (
        <div style={{ maxHeight: listHeight, overflow: "auto" }}>
          {entries.map((entry) => (
            <ScoreCard key={entry.userId} entry={entry} style={{ height: ROW_HEIGHT }} />
          ))}
        </div>
      )}
    </div>
  );
}

export const LeaderboardTable = memo(LeaderboardTableComponent);
