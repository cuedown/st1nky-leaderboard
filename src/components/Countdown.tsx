/**
 * Countdown to promo end date. Shows days, hours, minutes (and seconds if < 1 hour).
 * Source: Gamba exclusive leaderboard promo period (e.g. 2026SENDER).
 */

import { memo, useState, useEffect } from "react";

interface CountdownProps {
  /** ISO end date string */
  endDate: string;
  /** Optional label above the countdown */
  label?: string;
  /** Called when countdown reaches zero */
  onEnd?: () => void;
}

function getTimeLeft(endMs: number): { days: number; hours: number; minutes: number; seconds: number } {
  const now = Date.now();
  const diff = Math.max(0, endMs - now);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownComponent({ endDate, label, onEnd }: CountdownProps) {
  const endMs = new Date(endDate).getTime();
  const [left, setLeft] = useState(() => getTimeLeft(endMs));
  const [ended, setEnded] = useState(endMs <= Date.now());

  useEffect(() => {
    if (ended) return;
    const tick = () => {
      const next = getTimeLeft(endMs);
      setLeft(next);
      if (next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        setEnded(true);
        onEnd?.();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endMs, ended, onEnd]);

  if (ended) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] px-4 py-3 text-center" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
        {label && <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">{label}</p>}
        <p className="mt-1 font-display text-lg font-bold text-[var(--color-muted)]">Promo ended</p>
      </div>
    );
  }

  const showSeconds = left.days === 0 && left.hours === 0;

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] px-4 py-3" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
      {label && <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">{label}</p>}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {left.days > 0 && (
          <span className="font-mono text-lg tabular-nums text-[var(--color-text-strong)]" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="text-[var(--color-accent)]">{left.days}</span>d
          </span>
        )}
        <span className="font-mono text-lg tabular-nums text-[var(--color-text-strong)]" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="text-[var(--color-accent)]">{left.hours}</span>h
        </span>
        <span className="font-mono text-lg tabular-nums text-[var(--color-text-strong)]" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="text-[var(--color-accent)]">{left.minutes}</span>m
        </span>
        {showSeconds && (
          <span className="font-mono text-lg tabular-nums text-[var(--color-text-strong)]" style={{ fontFamily: "var(--font-mono)" }}>
            <span className="text-[var(--color-accent)]">{left.seconds}</span>s
          </span>
        )}
      </div>
    </div>
  );
}

export const Countdown = memo(CountdownComponent);
