import { memo, useState } from "react";

import { SITE } from "../../config/site";

const SECTIONS = [
  { id: "promotions", label: "Promotions" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "rewards", label: "Rewards" },
  { id: "bonus-hunt", label: "Bonus Hunt" },
] as const;

function NavComponent() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-[var(--color-border)]"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.92)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-xl font-display font-bold tracking-wide text-[var(--color-text-strong)] transition-opacity hover:opacity-90"
        >
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-[var(--color-accent)]" width={36} height={36} />
          <span>{SITE.streamerName}</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {label}
            </button>
          ))}
          <a
            href={SITE.kickChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-display text-sm font-semibold tracking-wide transition-all"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-canvas)",
            }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-current animate-pulse" aria-hidden />
            Watch on Kick
          </a>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={SITE.kickChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-semibold"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-canvas)" }}
          >
            Kick
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-[var(--color-text)] hover:bg-[var(--color-surface-elevated)]"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] px-4 py-3 md:hidden" style={{ backgroundColor: "var(--color-surface)" }}>
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full py-2 text-left text-sm font-medium text-[var(--color-text)]"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export const Nav = memo(NavComponent);
