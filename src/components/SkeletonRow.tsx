import { memo } from "react";

interface SkeletonRowProps {
  style?: React.CSSProperties;
}

function SkeletonRowComponent({ style }: SkeletonRowProps) {
  return (
    <div
      role="presentation"
      style={style}
      className="grid grid-cols-5 gap-2 items-center w-full border-b border-[var(--color-border)] py-3 px-4 animate-pulse"
    >
      <div className="h-4 w-8 rounded bg-[var(--color-surface-elevated)]" />
      <div className="h-8 w-8 rounded-full bg-[var(--color-surface-elevated)]" />
      <div className="h-4 w-24 rounded bg-[var(--color-surface-elevated)]" />
      <div className="h-4 w-16 rounded bg-[var(--color-surface-elevated)]" />
      <div className="h-4 w-6 rounded bg-[var(--color-surface-elevated)]" />
    </div>
  );
}

export const SkeletonRow = memo(SkeletonRowComponent);
