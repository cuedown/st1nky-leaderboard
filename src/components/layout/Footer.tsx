import { memo } from "react";

import { SITE } from "../../config/site";

function FooterComponent() {
  return (
    <footer className="border-t border-[var(--color-border)] px-4 py-12 md:py-16" style={{ background: "var(--color-canvas)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold tracking-wide text-[var(--color-text-strong)]">{SITE.streamerName}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Casino streaming on Kick · Partnered with Gamba.com</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href={SITE.kickChannelUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--color-accent)] hover:underline">
              Watch on Kick
            </a>
            <a href={SITE.gambaUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--color-accent)] hover:underline">
              Gamba.com
            </a>
            <a href="#promotions" className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)]">
              Promotions
            </a>
            <a href="#leaderboard" className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)]">
              Leaderboard
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-muted)]">
          <p className="font-semibold text-[var(--color-text)]">18+ only. Gambling can be addictive. Play responsibly.</p>
          <p className="mt-2">
            This site is not operated by Gamba. All offers and terms are set by Gamba.com. Please gamble responsibly and only with what you can afford to lose.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
