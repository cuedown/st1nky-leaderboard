import { memo } from "react";

interface LiveBadgeProps {
  live: boolean;
  className?: string;
}

function LiveBadgeComponent({ live, className = "" }: LiveBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-badge)] px-2 py-0.5 text-xs font-medium transition-colors duration-[var(--duration-normal)] ${className}`}
      style={{
        backgroundColor: live ? "rgba(249, 115, 22, 0.25)" : "var(--color-surface-elevated)",
        color: live ? "var(--color-live)" : "var(--color-muted)",
      }}
      role="status"
      aria-live="polite"
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          backgroundColor: live ? "var(--color-live)" : "var(--color-muted)",
          boxShadow: live ? "0 0 6px var(--color-live)" : "none",
        }}
      />
      {live ? "Live" : "Offline"}
    </span>
  );
}

export const LiveBadge = memo(LiveBadgeComponent);
