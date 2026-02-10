import { memo } from "react";

import { SITE } from "../../config/site";

function HeroComponent() {
  return (
    <section
      className="relative overflow-hidden px-4 py-10 md:py-14"
      style={{
        backgroundImage: "url('/shark-banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay + blobs for readability */}
      <div className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.55)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-24 -top-10 h-64 w-64 rounded-full bg-[rgba(250,204,21,0.4)] blur-3xl" />
        <div className="absolute right-[-40px] top-10 h-72 w-72 rounded-full bg-[rgba(56,189,248,0.55)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-stretch">
        {/* Left: PFP + goofy card */}
        <div className="flex w-full flex-1 flex-col items-center md:items-start">
          <div className="relative mb-4 rounded-[20px] border border-[rgba(255,255,255,0.1)] bg-[rgba(15,10,6,0.85)] px-6 py-5 shadow-[0_0_45px_rgba(0,0,0,0.9)] md:px-7 md:py-6">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt=""
                className="h-24 w-24 rounded-full object-cover ring-4 ring-[var(--color-accent)] shadow-[0_0_40px_rgba(249,115,22,0.5)] md:h-28 md:w-28"
                width={112}
                height={112}
              />
              <div>
                <p className="font-block text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] md:text-sm">
                  St1nkyP3te&apos;s shark tank
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold tracking-wide text-[var(--color-text-strong)] md:text-4xl lg:text-5xl">
                  {SITE.streamerName}
                </h1>
                <p className="mt-1 text-xs text-[var(--color-muted)] md:text-sm">
                  Slots, degen bonus hunts &amp; very serious shark business.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href={SITE.kickChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-display text-base font-semibold tracking-wide transition-all hover:scale-[1.02] hover:opacity-95 md:text-lg"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.95), rgba(59,130,246,0.95))",
                color: "var(--color-canvas)",
                boxShadow: "0 0 32px rgba(56,189,248,0.55)",
              }}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
              </span>
              Watch live on Kick
            </a>
            <button
              type="button"
              onClick={() => document.getElementById("leaderboard")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border-light)] bg-[rgba(10,10,10,0.7)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              🦈 Climb the 2026SENDER board
            </button>
          </div>
          <p className="mt-5 text-xs text-[var(--color-muted)]">
            18+ only · Gambling can be addictive · Do not gamble money you can&apos;t afford to lose.
          </p>
        </div>

        {/* Right: shark / leaderboard tease card using bold shapes */}
        <div className="w-full max-w-sm flex-1">
          <div className="relative overflow-hidden rounded-[26px] border border-[rgba(255,255,255,0.12)] bg-gradient-to-br from-[rgba(15,23,42,0.96)] via-[rgba(30,64,175,0.9)] to-[rgba(8,47,73,0.96)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-tr from-sky-400 via-sky-300 to-sky-200 opacity-80 blur-xl" />
            <div className="absolute -bottom-16 -left-12 h-40 w-40 rotate-12 rounded-[999px] border-4 border-[rgba(250,204,21,0.8)] opacity-30" />

            <div className="relative mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.9)] px-3 py-1 text-xs font-semibold tracking-wide text-sky-200">
              <span>🏁</span>
              <span>2026SENDER LEADERBOARD</span>
            </div>

            <p className="relative font-display text-xl font-semibold leading-tight text-white">
              Win by sending it harder than everyone else.
            </p>
            <p className="relative mt-2 text-xs text-sky-100">
              Your Gamba wagers power this board. Any account can spike to #1 if they go on a heater.
            </p>

            <div className="relative mt-4 rounded-2xl border border-[rgba(15,23,42,0.8)] bg-[rgba(15,23,42,0.9)] px-4 py-3 text-xs text-[var(--color-muted)]">
              <p className="font-semibold text-sky-300">Shark tip:</p>
              <p className="mt-1">
                Leaderboard updates every hour. One insane bonus can turn a minnow into a monster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
