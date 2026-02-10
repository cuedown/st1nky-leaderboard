import { memo } from "react";

import { SITE } from "../../config/site";

function HeroComponent() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24" style={{ background: "var(--color-canvas)" }}>
      {/* Orange/gold glow – PFP-style, restrained */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, var(--color-accent), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, var(--color-gold), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <img
          src="/logo.png"
          alt=""
          className="mx-auto mb-5 h-28 w-28 rounded-full object-cover ring-4 ring-[var(--color-accent)] shadow-[0_0_40px_rgba(249,115,22,0.5)] md:h-32 md:w-32"
          width={128}
          height={128}
        />
        <p className="mb-2 font-block text-sm font-normal uppercase tracking-[0.2em] text-[var(--color-accent)] md:text-base">
          Casino streaming on Kick
        </p>
        <h1 className="font-display text-4xl font-bold tracking-wide text-[var(--color-text-strong)] md:text-5xl lg:text-6xl xl:text-7xl">
          {SITE.streamerName}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-muted)]">
          Slots, bonus hunts &amp; exclusive leaderboards. Partnered with{" "}
          <span className="font-semibold" style={{ color: "var(--color-gold)" }}>Gamba.com</span> — climb the ranks and win.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE.kickChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-base font-semibold tracking-wide transition-all hover:opacity-90 md:text-lg"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-canvas)",
              boxShadow: "0 0 24px rgba(249, 115, 22, 0.4)",
            }}
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
            </span>
            Watch live on Kick
          </a>
          <a
            href="#leaderboard"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("leaderboard")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-6 py-3 text-base font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Climb the leaderboard
          </a>
        </div>
        <p className="mt-6 text-xs text-[var(--color-muted)]">
          18+ only · Gambling can be addictive · Play responsibly
        </p>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
