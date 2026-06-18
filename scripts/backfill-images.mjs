/**
 * backfill-images.mjs
 *
 * One-shot script: reads all existing news items in src/data/news.ts,
 * fetches the real og:image / twitter:image from each story's source URL
 * (the same logic used in refresh-news.mjs for new articles), and patches
 * the image field in-place.
 *
 * Run from the repo root:
 *   node scripts/backfill-images.mjs
 *
 * No API keys required — it only scrapes public web pages.
 *
 * What counts as a "bad" image that needs replacing:
 *   • chatglm.cn  (AI stock pool — not related to the article)
 *   • upload.wikimedia.org  (generic Wikipedia thumbnails)
 *   • images.unsplash.com  (generic stock photos).
 */
import { readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NEWS_PATH = "src/data/news.ts";

/** Patterns that flag an image as a generic placeholder needing replacement. */
const BAD_IMAGE_PATTERNS = [
  /chatglm\.cn/i,
  /unsplash\.com/i,
  /upload\.wikimedia\.org/i,
];

function isBadImage(url) {
  if (!url) return true;
  return BAD_IMAGE_PATTERNS.some((re) => re.test(url));
}

// ---------------------------------------------------------------------------
// Scraper — identical to the one in refresh-news.mjs
// ---------------------------------------------------------------------------

/**
 * Fetch the article's own source page and pull its og:image / twitter:image
 * meta tag. Returns null on any failure so the caller can fall back gracefully.
 */
async function fetchArticleImage(url) {
  if (!url) return null;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    // Only read the <head> — og/twitter tags always live there.
    const html = await res.text();
    const head = html.slice(0, 80000);

    const metaRegex =
      /<meta\s+[^>]*(?:property|name)\s*=\s*["'](og:image|og:image:secure_url|twitter:image|twitter:image:src)["'][^>]*>/gi;
    const contentRegex = /content\s*=\s*["']([^"']+)["']/i;

    let best = null;
    let m;
    while ((m = metaRegex.exec(head))) {
      const tag = m[0];
      const cm = tag.match(contentRegex);
      if (cm && cm[1]) {
        best = cm[1];
        // Prefer plain og:image; keep going only if we haven't found it yet.
        if (/^og:image$/i.test(m[1])) break;
      }
    }
    if (!best) return null;

    // Resolve relative/protocol-relative URLs against the article URL.
    const resolved = new URL(best, url).toString();
    if (!/^https?:\/\//i.test(resolved)) return null;
    return resolved;
  } catch {
    return null; // timeout, network error, blocked, etc.
  }
}

// ---------------------------------------------------------------------------
// Parse the NEWS array out of news.ts (same eval trick as refresh-news.mjs)
// ---------------------------------------------------------------------------

console.log(`→ Reading ${NEWS_PATH} ...`);
const src = readFileSync(NEWS_PATH, "utf8");

// Extract the IMG constant so references inside NEWS resolve correctly.
const imgMatch = src.match(/const IMG = (\{[\s\S]*?\n\});/);
const IMG = imgMatch ? eval("(" + imgMatch[1] + ")") : {};

const newsMatch = src.match(/export const NEWS:[\s\S]*?= (\[[\s\S]*?\n\]);/);
if (!newsMatch) {
  console.error("✗ Could not find the NEWS array in " + NEWS_PATH);
  process.exit(1);
}

const NEWS = eval("(function(IMG){ return " + newsMatch[1] + "; })(IMG)");
console.log(`  ✓ Found ${NEWS.length} news items`);

// ---------------------------------------------------------------------------
// Identify items with bad images
// ---------------------------------------------------------------------------

const toFix = NEWS.filter((item) => isBadImage(item.image));
const alreadyOk = NEWS.length - toFix.length;
console.log(
  `  • ${alreadyOk} items already have good images — skipping`
);
console.log(
  `  • ${toFix.length} items need a real image — scraping source pages ...`
);

// ---------------------------------------------------------------------------
// Scrape + patch
// ---------------------------------------------------------------------------

let fixed = 0;
let failed = 0;

// Process sequentially to be polite to servers (and avoid bot-blocking).
for (let i = 0; i < toFix.length; i++) {
  const item = toFix[i];
  const label = `[${i + 1}/${toFix.length}] ${item.title?.slice(0, 55) ?? item.id}`;
  process.stdout.write(`  ${label} ... `);

  const scraped = await fetchArticleImage(item.sourceUrl);

  if (scraped) {
    // Patch the in-memory item so we can serialize the whole array back.
    item.image = scraped;
    console.log(`✓ ${scraped.slice(0, 70)}`);
    fixed++;
  } else {
    console.log(`✗ no og:image found — keeping old value`);
    failed++;
  }
}

console.log(`\n→ Patched: ${fixed} fixed, ${failed} unchanged (no og:image found)`);

// ---------------------------------------------------------------------------
// Write the updated NEWS array back into news.ts
// ---------------------------------------------------------------------------

// Re-serialize only the NEWS array; everything else in the file stays intact.
const updatedArrayStr = `export const NEWS: NewsItem[] = ${JSON.stringify(NEWS, null, 2)};`;
const updatedSrc = src.replace(
  /export const NEWS: NewsItem\[\][\s\S]*?\n\];/,
  updatedArrayStr
);

writeFileSync(NEWS_PATH, updatedSrc, "utf8");
console.log(`✓ Wrote updated images to ${NEWS_PATH}`);
console.log(`\n✅ Backfill complete — commit news.ts to apply changes.`);
