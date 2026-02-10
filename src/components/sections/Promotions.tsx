import { memo } from "react";

import { SITE } from "../../config/site";

type PromoBase = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent?: boolean;
};

type PromoWithHref = PromoBase & {
  href: string;
  cta: string;
  links?: undefined;
};

type PromoWithLinks = PromoBase & {
  links: { id: string; label: string; href: string }[];
  href?: undefined;
  cta?: undefined;
};

type Promo = PromoWithHref | PromoWithLinks;

const PROMOS: Promo[] = [
  {
    id: "2026sender",
    title: "2026SENDER",
    subtitle: "Exclusive race at Gamba.com",
    description:
      "Place bets, rise through the wager leaderboard, and claim your prize. Join the exclusive race and win big.",
    cta: "Join the race",
    href: SITE.gambaLeaderboard6865Url,
    accent: true,
  },
  {
    id: "community",
    title: "Join the St1nky Gang",
    subtitle: "Kick, X & Discord",
    description:
      "Hang out with Pete live, catch bonus hunts, and never miss a code drop across all socials.",
    links: [
      { id: "kick", label: "Watch on Kick", href: SITE.kickChannelUrl },
      { id: "twitter", label: "Follow on X", href: "https://x.com/ST1NKYP3TE" },
      { id: "discord", label: "Join Discord", href: "https://discord.gg/4Q4HfXEW" },
    ],
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
              {"links" in p ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-light)] px-3 py-1 text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : (
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
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Promotions = memo(PromotionsComponent);
