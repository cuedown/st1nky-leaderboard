import { memo } from "react";

import { SITE } from "../../config/site";

const REWARDS = [
  {
    title: "Rakeback",
    description: "Get a percentage of your wagers back. The more you play, the more you earn.",
    icon: "↩",
  },
  {
    title: "Weekly bonuses",
    description: "Weekly reloads and free spins. Check Gamba for the latest weekly offers.",
    icon: "📅",
  },
  {
    title: "Rejuice",
    description: "Extra juice on selected games. Boost your potential wins during promotions.",
    icon: "⚡",
  },
  {
    title: "VIP & more",
    description: "Higher limits, dedicated support, and exclusive perks as you level up.",
    icon: "👑",
  },
];

function RewardsComponent() {
  return (
    <section id="rewards" className="scroll-mt-20 px-4 py-16 md:py-20" style={{ background: "var(--color-canvas)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-block text-3xl font-normal tracking-wide text-[var(--color-text-strong)] md:text-4xl lg:text-[2.5rem]">
            Rewards & VIP
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Rakeback, weekly bonuses, rejuice, and VIP perks at Gamba.com
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REWARDS.map((r) => (
            <div
              key={r.title}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 text-center transition-colors hover:border-[var(--color-accent)]"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <span className="text-2xl" aria-hidden>{r.icon}</span>
              <h3 className="mt-3 font-display font-bold tracking-wide text-[var(--color-text-strong)]">{r.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{r.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--color-muted)]">
          All rewards are subject to Gamba.com terms.{" "}
          <a href={SITE.gambaUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--color-accent)] hover:underline">
            View Gamba rewards
          </a>
        </p>
      </div>
    </section>
  );
}

export const Rewards = memo(RewardsComponent);
