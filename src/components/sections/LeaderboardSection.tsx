import { SITE } from "../../config/site";
import { useGambaLeaderboard } from "../../hooks/useGambaLeaderboard";
import { useLeaderboardData } from "../../hooks/useLeaderboardData";
import { LeaderboardTable } from "../LeaderboardTable";
import { Countdown } from "../Countdown";

function LeaderboardSectionComponent() {
  const gamba = useGambaLeaderboard();
  const fallback = useLeaderboardData("daily");

  const fromGamba = gamba.entries.length > 0;
  const entries = fromGamba ? gamba.entries : fallback.entries;
  const loading = fromGamba ? gamba.loading : fallback.loading;
  const error = fromGamba ? gamba.error : fallback.error;

  const showCountdown = SITE.promoEndDate != null;

  return (
    <section id="leaderboard" className="scroll-mt-20 px-4 py-16 md:py-20" style={{ background: "var(--color-canvas)" }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-block text-2xl font-normal tracking-wide text-[var(--color-text-strong)] md:text-3xl lg:text-4xl">
              Climb the Leaderboard
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              at <span className="font-medium text-[var(--color-accent)]">Gamba.com</span>
              {" · "}
              <span className="text-[var(--color-text)]">Hosted by {SITE.streamerName}</span>
              {fromGamba && gamba.updatedAt && (
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

        {error && !fromGamba && (
          <div
            className="mb-4 rounded-[var(--radius-card)] border border-[var(--color-down)] px-4 py-3 text-sm text-[var(--color-down)]"
            style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
            role="alert"
          >
            {error}
          </div>
        )}

        {fromGamba ? (
          <p className="mb-3 text-xs text-[var(--color-muted)]">
            Data pulled from Gamba once per hour. Live rankings and timer:{" "}
            <a href={SITE.gambaLeaderboard6865Url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--color-accent)] hover:underline">
              Gamba.com/promotions/exclusive-leaderboards/6865
            </a>
          </p>
        ) : (
          <p className="mb-3 text-xs text-[var(--color-muted)]">
            Start the scraper server for live data: <code className="rounded bg-[var(--color-surface)] px-1">node server/index.mjs</code>
            {" · "}
            <a href={SITE.gambaLeaderboard6865Url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--color-accent)] hover:underline">
              View on Gamba
            </a>
          </p>
        )}

        <LeaderboardTable entries={entries} loading={loading} height={520} />
      </div>
    </section>
  );
}

export const LeaderboardSection = LeaderboardSectionComponent;
