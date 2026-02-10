import { SITE } from "../../config/site";
import { useGambaLeaderboard } from "../../hooks/useGambaLeaderboard";
import { LeaderboardTable } from "../LeaderboardTable";
import { Countdown } from "../Countdown";

function LeaderboardSectionComponent() {
  const gamba = useGambaLeaderboard();
  const entries = gamba.entries;
  const loading = gamba.loading;
  const error = gamba.error;

  const showCountdown = SITE.promoEndDate != null;

  return (
    <section id="leaderboard" className="relative scroll-mt-20 px-4 py-12 md:py-16" style={{ background: "var(--color-canvas)" }}>
      <img
        src="/shark-bite.png"
        alt=""
        className="pointer-events-none absolute -top-10 right-3 h-28 w-28 md:h-36 md:w-36 select-none"
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-block text-2xl font-normal tracking-wide text-[var(--color-text-strong)] md:text-3xl lg:text-4xl">
              Climb the Leaderboard
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              at <span className="font-medium text-[var(--color-accent)]">Gamba.com</span>
              {" · "}
              <span className="text-[var(--color-text)]">Hosted by {SITE.streamerName}</span>
              {gamba.updatedAt && (
                <span className="ml-1 text-[var(--color-muted)]">
                  · Updated {new Date(gamba.updatedAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-stretch gap-4">
          {showCountdown && (
            <Countdown
              endDate={SITE.promoEndDate}
              label="2026SENDER ends in"
            />
          )}
          <a
            href={SITE.gambaLeaderboard6865Url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-[var(--radius-card)] border-2 border-[var(--color-accent)] px-5 py-3 text-base font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-canvas)",
            }}
          >
            View live leaderboard on Gamba
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {error && (
          <div
            className="mb-4 rounded-[var(--radius-card)] border border-[var(--color-down)] px-4 py-3 text-sm text-[var(--color-down)]"
            style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
            role="alert"
          >
            {error}
          </div>
        )}

        <p className="mb-3 text-xs text-[var(--color-muted)]">
          Live data from{" "}
          <a
            href={SITE.gambaLeaderboard6865Url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--color-accent)] hover:underline"
          >
            Gamba 2026SENDER leaderboard
          </a>
          . Updates every hour.
        </p>

        <LeaderboardTable entries={entries} loading={loading} height={520} />
      </div>
    </section>
  );
}

export const LeaderboardSection = LeaderboardSectionComponent;
