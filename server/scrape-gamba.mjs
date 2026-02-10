/**
 * Scrape leaderboard entries from Gamba.com exclusive leaderboard page (6865).
 * Parses HTML for: username (truncate span), wagered ($ amount), avatar (img src).
 * Source: https://gamba.com/promotions/exclusive-leaderboards/6865
 */

const GAMBA_6865_URL = "https://gamba.com/promotions/exclusive-leaderboards/6865";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * Parse wager string like "$48,452" or "$29,035" to number.
 */
function parseWagered(str) {
  if (!str || typeof str !== "string") return 0;
  const cleaned = str.replace(/[$,]/g, "").trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

/**
 * Extract one entry: username from "before" HTML, avatar, wagered from amount string.
 * Includes "Hidden" users (avatar/name hidden by Gamba but row still has wager).
 */
function extractEntry(beforeHtml, amountStr, rank, seenKeys) {
  const truncateRegex = /<span[^>]*class="[^"]*truncate[^"]*"[^>]*>([^<]+)<\/span>/gi;
  let usernameClean = "";
  let m;
  while ((m = truncateRegex.exec(beforeHtml)) !== null) usernameClean = m[1].trim();
  if (!usernameClean) {
    if (/\bHidden\b/i.test(beforeHtml)) usernameClean = "Hidden";
    else return null;
  }
  if (/^\d{2}\/\d{2}\/\d{2}/.test(usernameClean) || (usernameClean.includes("/") && !usernameClean.toLowerCase().includes("hidden"))) return null;
  const key = usernameClean.toLowerCase() === "hidden" ? `hidden-${amountStr}` : usernameClean.toLowerCase();
  if (seenKeys.has(key)) return null;
  seenKeys.add(key);

  const imgMatch = beforeHtml.match(/<img[^>]+src="([^"]+)"/gi);
  let avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(usernameClean)}`;
  let badgeUrl;
  if (imgMatch && imgMatch.length > 0) {
    for (const raw of imgMatch) {
      const srcMatch = raw.match(/src="([^"]+)"/i);
      if (!srcMatch || !srcMatch[1]) continue;
      const src = srcMatch[1];
      if (/vip-rank-icons/i.test(src)) {
        badgeUrl = src;
      } else if (src.startsWith("http") || src.startsWith("data:")) {
        avatarUrl = src;
      }
    }
  }

  const wagered = parseWagered(amountStr);
  return {
    rank,
    userId: `gamba-6865-${rank}-${usernameClean.toLowerCase().replace(/\W/g, "-")}`,
    username: usernameClean,
    avatarUrl,
    badgeUrl,
    wagered,
  };
}

/**
 * Extract leaderboard entries from Gamba 6865 HTML.
 * Top 3: cards with "Wagered: </span><span>$X". Table (4+): rows with $amount and truncate username.
 */
function parseLeaderboardFromHtml(html) {
  const entries = [];
  if (!html || typeof html !== "string") return entries;
  const seenKeys = new Set();

  // 1) "Wagered: " followed by $amount (cards + any row using same pattern)
  const wageredRegex = /Wagered:\s*<\/span>\s*<span[^>]*>\s*(\$[\d,]+(?:\.\d{2})?)/gi;
  let match;
  const wageredMatches = [];
  while ((match = wageredRegex.exec(html)) !== null) {
    wageredMatches.push({ index: match.index, amount: match[1] });
  }

  for (let i = 0; i < wageredMatches.length; i++) {
    const { index, amount } = wageredMatches[i];
    const before = html.substring(Math.max(0, index - 1500), index);
    const entry = extractEntry(before, amount, entries.length + 1, seenKeys);
    if (entry) entries.push(entry);
  }

  // 2) Table rows (4+): WAGERED column only — $amount with preceding username (or "Hidden"). Skip PRIZE column (right, red) and banner by >= 1000.
  const tableAmountRegex = />(\$[\d,]+(?:\.[\d]{2})?)</g;
  let tableMatch;
  const tableAmounts = [];
  while ((tableMatch = tableAmountRegex.exec(html)) !== null) {
    const amt = tableMatch[1];
    const num = parseWagered(amt);
    if (num < 1000 || num > 1e9) continue;
    tableAmounts.push({ index: tableMatch.index, amount: amt });
  }

  for (const { index, amount } of tableAmounts) {
    const before = html.substring(Math.max(0, index - 1200), index);
    const entry = extractEntry(before, amount, entries.length + 1, seenKeys);
    if (entry) entries.push(entry);
  }

  entries.sort((a, b) => b.wagered - a.wagered);
  entries.forEach((e, i) => {
    e.rank = i + 1;
    e.userId = `gamba-6865-${e.rank}-${e.username.toLowerCase().replace(/\W/g, "-")}`;
  });
  return entries;
}

/**
 * Fetch HTML via headless browser (Puppeteer). Use when Gamba loads leaderboard client-side.
 * Closes the "Custom Wager Contribution" modal (X top-right) so the full leaderboard is visible.
 */
async function fetchWithPuppeteer() {
  const mod = await import("puppeteer").catch(() => null);
  if (!mod) throw new Error("puppeteer not installed; run: npm install puppeteer");
  const puppeteer = mod.default;
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || undefined;
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1280,900"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent(USER_AGENT);
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
    page.setDefaultNavigationTimeout(60000);
    await page.goto(GAMBA_6865_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 3000));

    // Wait for modal to appear, then click X (top-right close)
    try {
      await page.waitForSelector(".GModal-root, [data-cy='GModal-root']", { timeout: 8000 });
    } catch {
      // Modal may not always be present
    }
    const closeBtn =
      (await page.$('[data-cy="modal-close"]')) ||
      (await page.$(".GModalClose button")) ||
      (await page.$(".Gmodal-title-container .GModalClose button"));
    if (closeBtn) {
      await closeBtn.click();
      await new Promise((r) => setTimeout(r, 3000));
    }

    // Wait for leaderboard to appear (Wagered: in body)
    await page.waitForFunction(
      () => document.body && document.body.innerText && document.body.innerText.includes("Wagered:"),
      { timeout: 25000 }
    );
    await new Promise((r) => setTimeout(r, 1000));

    // Scroll main window in steps so content below the fold (table rows) renders
    for (let i = 0; i < 12; i++) {
      await page.evaluate(() => window.scrollBy(0, 400));
      await new Promise((r) => setTimeout(r, 350));
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 1000));

    // Find the leaderboard table container (has WAGERED / PRIZE columns) and scroll it so all rows (4–20+) render
    await page.evaluate(() => {
      const withWagered = (el) => el.innerText && el.innerText.includes("WAGERED");
      const candidates = document.querySelectorAll("[class*='scroll'], [class*='overflow'], .vertical-scrollbar, [class*='leaderboard'], [class*='Scroll']");
      for (const el of candidates) {
        if (el.scrollHeight > el.clientHeight + 50 && (withWagered(el) || el.querySelector("[class*='truncate']"))) {
          el.setAttribute("data-gamba-table", "1");
          break;
        }
      }
      const header = Array.from(document.querySelectorAll("*")).find((el) => el.innerText && el.innerText.trim() === "WAGERED");
      if (header && !document.querySelector("[data-gamba-table='1']")) {
        let p = header.parentElement;
        while (p && p !== document.body) {
          if (p.scrollHeight > p.clientHeight + 50) {
            p.setAttribute("data-gamba-table", "1");
            break;
          }
          p = p.parentElement;
        }
      }
    });

    for (let step = 0; step < 25; step++) {
      const done = await page.evaluate(() => {
        const el = document.querySelector("[data-gamba-table='1']");
        if (!el) return true;
        const was = el.scrollTop;
        el.scrollTop = el.scrollHeight;
        return el.scrollTop === was && was > 0;
      });
      await new Promise((r) => setTimeout(r, 400));
      if (done) break;
    }

    await page.evaluate(() => {
      document.querySelectorAll("[data-gamba-table='1']").forEach((el) => el.removeAttribute("data-gamba-table"));
      document.querySelectorAll("[class*='scroll'], [class*='overflow']").forEach((el) => {
        if (el.scrollHeight > el.clientHeight) el.scrollTop = el.scrollHeight;
      });
    });
    await new Promise((r) => setTimeout(r, 1500));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 600));

    const html = await page.content();
    return html;
  } finally {
    await browser.close();
  }
}

/**
 * Fetch Gamba 6865 page and return parsed entries.
 * - GAMBA_HTML_FILE: read HTML from this path (saved snapshot) instead of fetching.
 * - USE_PUPPETEER=1: use headless Chrome to load the page (leaderboard is client-rendered).
 */
export async function scrapeGambaLeaderboard() {
  let html;
  const filePath = process.env.GAMBA_HTML_FILE;
  if (filePath) {
    const { readFile } = await import("fs/promises");
    html = await readFile(filePath, "utf8");
  } else if (process.env.USE_PUPPETEER === "1") {
    html = await fetchWithPuppeteer();
  } else {
    const res = await fetch(GAMBA_6865_URL, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": USER_AGENT,
      },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Gamba fetch failed: ${res.status} ${res.statusText}`);
    html = await res.text();
  }
  const entries = parseLeaderboardFromHtml(html);
  return { entries, updatedAt: new Date().toISOString() };
}
