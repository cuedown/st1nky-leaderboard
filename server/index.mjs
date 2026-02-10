/**
 * Dev server: serves GET /api/gamba-leaderboard (scraped from Gamba 6865, refreshed every 1 hour).
 * Run: node server/index.mjs
 * Vite proxies /api to this server in dev.
 */

import { createServer } from "http";
import { scrapeGambaLeaderboard } from "./scrape-gamba.mjs";

const PORT = Number(process.env.GAMBA_SERVER_PORT) || 3001;
const REFRESH_MS = 60 * 60 * 1000; // 1 hour

let cache = { entries: [], updatedAt: null, error: null };

async function refresh() {
  try {
    const result = await scrapeGambaLeaderboard();
    cache = { ...result, error: null };
    console.log(`[gamba] Scraped ${result.entries.length} entries at ${result.updatedAt}`);
  } catch (err) {
    cache.error = err.message;
    console.error("[gamba] Scrape failed:", err.message);
  }
}

const server = createServer(async (req, res) => {
  if (req.url === "/api/gamba-leaderboard" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (cache.error && cache.entries.length === 0) {
      res.writeHead(503);
      res.end(JSON.stringify({ error: cache.error, entries: [], updatedAt: null }));
      return;
    }
    res.end(
      JSON.stringify({
        entries: cache.entries,
        updatedAt: cache.updatedAt,
        source: "https://gamba.com/promotions/exclusive-leaderboards/6865",
      })
    );
    return;
  }
  res.writeHead(404);
  res.end();
});

// Initial scrape and then every hour
refresh();
setInterval(refresh, REFRESH_MS);

server.listen(PORT, () => {
  console.log(`[gamba] API listening on http://localhost:${PORT} (GET /api/gamba-leaderboard, refresh every 1h)`);
});
