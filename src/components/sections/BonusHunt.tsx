import { memo } from "react";

import { SITE } from "../../config/site";

function BonusHuntComponent() {
  return (
    <section id="bonus-hunt" className="scroll-mt-20 px-4 py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-8 md:p-12" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Bonus Hunt
          </span>
          <h2 className="mt-2 font-block text-3xl font-normal tracking-wide text-[var(--color-text-strong)] md:text-4xl">
            Chase bonuses live
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Bonus hunts are a big part of the stream. We buy bonuses, chase multipliers, and track wins live on Kick.
            Join the channel to see the next hunt, get involved in the community, and sometimes jump in on viewer hunts.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--color-muted)]">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Live bonus hunts on stream
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Slots &amp; casino games on Gamba
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Community &amp; viewer events
            </li>
          </ul>
          <a
            href={SITE.kickChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-canvas)",
            }}
          >
            Watch on Kick
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export const BonusHunt = memo(BonusHuntComponent);
