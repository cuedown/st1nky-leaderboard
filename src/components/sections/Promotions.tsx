import { memo } from "react";

import { SITE } from "../../config/site";

const PROMOS = [
  {
    id: "2026sender",
    title: "2026SENDER",
    subtitle: "Exclusive race at Gamba.com",
    description: "Place bets, rise through the wager leaderboard, and claim your prize. Join the exclusive race and win big.",
    cta: "Join the race",
    href: SITE.gambaLeaderboard6865Url,
    accent: true,
  },
  {
    id: "leaderboards",
    title: "Exclusive Leaderboards",
    subtitle: "Climb & win",
    description: "Compete on daily, weekly, and all-time leaderboards. Top wagerers earn prizes and bragging rights.",
    cta: "View leaderboard",
    href: "#leaderboard",
    accent: false,
  },
  {
    id: "welcome",
    title: "Welcome at Gamba",
    subtitle: "Crypto casino & sports",
    description: "Bet in BTC, ETH, SOL & more. VIP perks: rakeback, weekly bonuses, rejuice, and more.",
    cta: "Sign up at Gamba",
    href: SITE.gambaUrl,
    accent: false,
  },
];

function PromotionsComponent() {
  return (
    <section id="promotions" className="scroll-mt-20 px-4 py-16 md:py-20" style={{ background: "var(--color-surface)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
<h2 className="font-block text-3xl font-normal tracking-wide text-[var(--color-text-strong)] md:text-4xl lg:text-[2.5rem]">
          Promotions
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Exclusive offers and races — play with St1nkyP3te on Gamba.com
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROMOS.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-accent)]"
              style={{ backgroundColor: "var(--color-surface-elevated)" }}
            >
              <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                {p.subtitle}
              </span>
              <h3 className="font-display text-xl font-bold tracking-wide text-[var(--color-text-strong)]">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-[var(--color-muted)]">{p.description}</p>
              <a
                href={p.href}
                {...(p.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: p.accent ? "var(--color-accent)" : "var(--color-text)" }}
              >
                {p.cta}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Promotions = memo(PromotionsComponent);
