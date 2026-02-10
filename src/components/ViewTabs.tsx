import { memo } from "react";
import type { LeaderboardPeriod } from "../types/leaderboard";

interface ViewTabsProps {
  period: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
}

const TABS: { value: LeaderboardPeriod; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "alltime", label: "All-time" },
];

function ViewTabsComponent({ period, onPeriodChange }: ViewTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-elevated)]" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={period === tab.value}
          onClick={() => onPeriodChange(tab.value)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-[var(--duration-normal)]"
          style={{
            backgroundColor: period === tab.value ? "var(--color-accent)" : "transparent",
            color: period === tab.value ? "var(--color-canvas)" : "var(--color-muted)",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export const ViewTabs = memo(ViewTabsComponent);
