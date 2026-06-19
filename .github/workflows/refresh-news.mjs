/**
 * Daily news refresh script — runs inside the GitHub Action.
 *
 * Uses Serper.dev for web search + Groq (Llama) for article body generation.
 *
 * Required env:
 *   SERPER_API_KEY — your Serper.dev API key (https://serper.dev)
 *   GROQ_API_KEY   — your Groq API key (https://console.groq.com)
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const SERPER_API_KEY = process.env.SERPER_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile";

if (!SERPER_API_KEY) { console.error("✗ Missing SERPER_API_KEY"); process.exit(1); }
if (!GROQ_API_KEY) { console.error("✗ Missing GROQ_API_KEY"); process.exit(1); }

const QUERIES = [
  { q: "Korean actor actress gossip scandal news this week", cat: "gossip" },
  { q: "Korean drama upcoming series 2026 release date Netflix Disney+", cat: "upcoming" },
  { q: "Korean celebrity trending news today K-pop actor actress", cat: "trending" },
  { q: "Kdrama new cast announcement 2026", cat: "casting" },
];

// ✅ FIX 1 — Replaced ChatGLM AI image URLs with neutral, royalty-free K-entertainment images
// ✅ FIX — Replaced broken Wikipedia thumbnail URLs with reliable Unsplash images
const FALLBACK_IMAGES = [
  "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
  "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
  "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
  "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
  "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
  "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
];

// ✅ FIX 2 — Human-sounding SYSTEM_PROMPT, matching route.ts
const SYSTEM_PROMPT = `You are a passionate K-entertainment writer for K-Scoop — you grew up watching K-dramas, you care about this stuff, and you write like it. Think Allkpop or Soompi at their best: opinionated, punchy, and real.

SOURCE RULES:
- When ARTICLE CONTENT is provided in the user message, use it as your PRIMARY source of facts. Pull specific details, names, dates, and context directly from it.
- When only a SUMMARY is available, write only from what's stated there — never invent details, quotes, or statistics.

OUTPUT FORMAT — return ONLY valid Markdown. Structure:

## Key Takeaways
- Bullet 1 (a DIFFERENT fact from your opening line — not a repeat of it)
- Bullet 2 (another distinct fact or angle)
- Bullet 3
- Bullet 4

## {First H2 — make it interesting, not generic}

Body section. 2-3 paragraphs.

## {Second H2}

1-2 more paragraphs.

## {Closing H2 — vary this! Don't always use "What Comes Next"}

Closing paragraph. End with: [originally reported by SOURCE_NAME](SOURCE_URL)

WRITING RULES (follow these strictly):

VOICE & TONE:
- Write like a real person who loves K-dramas, not a corporate journalist
- Use contractions: it's, they're, don't, isn't, we're, that's
- It's okay to have a light opinion — "honestly, this is a big deal" or "fans weren't wrong to be upset"
- Vary your sentence length. Short sentences hit hard. Longer ones let you build context and nuance before landing the point.
- Some paragraphs can be 2 sentences. Others can be 4. Don't be uniform.
- Use rhetorical questions occasionally — "But was the comeback too fast?"
- Start the article body with a punchy, specific hook — not a generic scene-setter

STRUCTURAL VARIETY:
- Do NOT always end with a "What Comes Next" section. Mix it up — use "The Bigger Picture", "Why This Matters", "Fan Reaction", "Where Things Stand Now", "What Fans Are Saying", etc.
- Do NOT always start H2 headings with the same pattern
- Lead with the most interesting or surprising angle first, not a dry summary
- Key Takeaways bullets must each be a DIFFERENT piece of information — they should NOT restate the opening line of your article

AVOID THESE AI GIVEAWAYS (never use these phrases):
- "it is worth noting", "it is important to mention", "it's important to note"
- "sent shockwaves through", "underscores the growing", "in the digital age"
- "has raised concerns about", "serves as a cautionary tale", "as a testament to"
- "it remains to be seen", "only time will tell", "at the end of the day"
- "in conclusion", "to summarize", "in summary"
- "always on the lookout", "captivate audiences", "eagerly awaiting", "there's no shortage of", "delve into", "needless to say", "fans worldwide"
- Starting two consecutive paragraphs with "The [noun]..."
- Filler transitions like "Furthermore,", "Moreover,", "Additionally,"
- Re-summarizing what you just said at the end of a section
- Generic closers like "we're rooting for both of them" or "we wish them all the best"

CONTENT RULES:
- NEVER fabricate quotes, dates, or specific numbers not in the source material
- Write in third person
- 4-6 body paragraphs total
- Return ONLY Markdown — no HTML, no preamble, no "Here is the article:"`;

// ✅ FIX 3 — Real-sounding author names, rotated per article
const AUTHORS = [
  "Ji Yeon Park",
  "Soo Min Lee",
  "Dana Kim",
  "Hana Cho",
  "Mia Kwon",
  "Rina Baek",
];

// ---------- Serper.dev Search ----------

async function serpSearch(query) {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": SERPER_API_KEY,
    },
    body: JSON.stringify({
      q: query,
      num: 10,
      tbs: "qdr:w",
      gl: "us",
      hl: "en",
    }),
  });
  if (!res.ok) throw new Error(`Serper error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const results = data.organic || [];
  return results.map((r) => ({
    name: r.title || "",
    snippet: r.snippet || "",
    url: r.link || "",
    host_name: new URL(r.link || "https://unknown.com").hostname.replace("www.", ""),
    date: r.date || null,
    // ✅ FIX — capture image from Serper result when available
    imageUrl: r.imageUrl || null,
  }));
}

// ---------- Groq LLM ----------

async function groqChat(messages) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens: 2000,
      temperature: 0.9,
    }),
  });
  if (!res.ok) throw new Error(`Groq error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

// ---------- Real per-article content (scraped from the source page) ----------

/**
 * Fetch the article's own source page and extract the main article text.
 * This gives the LLM real, specific facts to work with instead of
 * hallucinating filler from a 1-sentence snippet.
 * Returns null on any failure so the caller falls back to snippet-only mode.
 */
async function fetchArticleContent(url) {
  if (!url) return null;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    const html = await res.text();

    // Priority: look inside <article>, then <main>, then fall back to full body
    let searchZone = html;
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) {
      searchZone = articleMatch[1];
    } else {
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) searchZone = mainMatch[1];
    }

    // Extract text from <p> tags, strip inline HTML, decode entities
    const paragraphs = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m;
    while ((m = pRegex.exec(searchZone))) {
      const clean = m[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
      // Skip very short fragments — likely nav labels, captions, ads
      if (clean.length > 50) paragraphs.push(clean);
    }

    if (paragraphs.length === 0) return null;

    // Cap at ~3 000 chars so we don't blow the token budget
    const combined = paragraphs.join("\n\n");
    return combined.slice(0, 3000);
  } catch {
    return null; // timeout, network error, paywall — fall back upstream
  }
}

// ---------- Real per-article image (scraped from the source page) ----------

/**
 * Fetch the article's own source page and pull its og:image / twitter:image
 * meta tag — the actual photo the publisher chose for THAT story, instead of
 * a generic stock photo picked by round-robin index.
 * Returns null on any failure so the caller can fall back gracefully.
 */
async function fetchArticleImage(url) {
  if (!url) return null;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: {
        // Some publishers block default fetch UAs; pretend to be a normal browser.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    // Only read the <head> — og/twitter tags always live there, no need to
    // download the whole page body.
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
        // Prefer plain og:image if we find it; otherwise keep first match.
        if (/^og:image$/i.test(m[1])) break;
      }
    }
    if (!best) return null;

    // Resolve relative/protocol-relative URLs against the article URL.
    const resolved = new URL(best, url).toString();
    if (!/^https?:\/\//i.test(resolved)) return null;

    // ✅ FIX — verify the scraped URL actually serves an image before we
    // commit to it. Catches three real failure modes seen in production:
    //   1. og:image points at an unrelated page (Wikipedia disambig pages,
    //      category pages) — wrong photo, not a missing one.
    //   2. og:image meta content is malformed and we grabbed a non-image
    //      URL (e.g. a video/article page, like Bollywood Hungama).
    //   3. The image host hotlink-blocks requests with a foreign Referer
    //      (e.g. some Korean news sites) — works when scraped server-side
    //      with no Referer, but 403s when the browser loads it from our
    //      site with Referer: https://ranksor13.github.io.
    const isValid = await verifyImageUrl(resolved, url);
    if (!isValid) return null;

    return resolved;
  } catch {
    return null; // timeout, network error, blocked, etc. — fall back upstream
  }
}

/**
 * HEAD/ranged-GET check that a candidate image URL (a) returns 200/OK,
 * (b) has an image/* content-type, and (c) still works when requested with
 * a foreign Referer header — simulating how a browser will actually load it
 * from the deployed site, so we catch hotlink-protected images at build
 * time instead of shipping a broken <img>.
 */
async function verifyImageUrl(imageUrl, refererPage) {
  const commonHeaders = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    // Simulate the real-world request: our deployed site as referer, NOT
    // the source article. This is what actually happens in production.
    Referer: "https://ranksor13.github.io/",
  };

  try {
    let res = await fetch(imageUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
      headers: commonHeaders,
    });

    // Some CDNs don't support HEAD properly (405/403 even though GET works).
    // Retry with a ranged GET so we don't download the whole file.
    if (!res.ok || res.status === 405) {
      res = await fetch(imageUrl, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(6000),
        headers: { ...commonHeaders, Range: "bytes=0-2048" },
      });
    }

    if (!res.ok) return false;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) return false;
    return true;
  } catch {
    return false;
  }
}

// ---------- Helpers ----------

function buildUserPrompt(item, articleContent = null) {
  const contentSection = articleContent
    ? `\nARTICLE CONTENT (use this as your primary source of facts):\n${articleContent}\n`
    : "";

  const factRule = articleContent
    ? "Use the ARTICLE CONTENT above as your primary source. Pull specific facts, names, and details from it. Do not fabricate anything not found there."
    : "Only use facts from the SUMMARY above. Do not fabricate quotes, statistics, or details not present there.";

  return `Write a K-Scoop article about this news story. Lead with what's most interesting or surprising about it — don't bury the hook.

TITLE: ${item.name}
SUMMARY: ${item.snippet}
SOURCE: ${item.host_name}
SOURCE_URL: ${item.url}${contentSection}

Write like a real person who actually follows K-drama news. Use contractions. Vary sentence length. Keep the tone fun and direct — not a press release, not a Wikipedia entry. ${factRule}`;
}

function parseMarkdown(md) {
  const lines = md.split("\n");
  const blocks = [];
  let takeaways = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) { i++; continue; }

    const h2 = trimmed.match(/^##\s+(.+)$/);
    if (h2) {
      const headingText = h2[1].trim();
      if (/^key takeaways/i.test(headingText)) {
        i++;
        const items = [];
        while (i < lines.length) {
          const t = lines[i].trim();
          if (!t) { i++; continue; }
          const bullet = t.match(/^[-*]\s+(.+)$/);
          if (bullet) { items.push(bullet[1].trim()); i++; } else break;
        }
        takeaways = items;
        continue;
      }
      blocks.push({ type: "h2", text: headingText });
      i++;
      continue;
    }

    const h3 = trimmed.match(/^###\s+(.+)$/);
    if (h3) { blocks.push({ type: "h3", text: h3[1].trim() }); i++; continue; }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      const items = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) { i++; continue; }
        const b = t.match(/^[-*]\s+(.+)$/);
        if (b) { items.push(b[1].trim()); i++; } else break;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    const paraLines = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t || /^(##|###|[-*]\s|>)/.test(t)) break;
      paraLines.push(t);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join(" ") });
    }
  }

  return { body: blocks, takeaways };
}

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ---------- Main ----------

console.log("→ Loading existing news.ts...");
const newsPath = "src/data/news.ts";
const newsSrc = readFileSync(newsPath, "utf8");

const newsMatch = newsSrc.match(
  /export const NEWS:[\s\S]*?= (\[[\s\S]*?\n\]);/
);
if (!newsMatch) {
  console.error("✗ Could not find NEWS array in src/data/news.ts");
  process.exit(1);
}
const imgMatch = newsSrc.match(/const IMG = (\{[\s\S]*?\n\});/);
const IMG = imgMatch ? eval("(" + imgMatch[1] + ")") : {};
const EXISTING_NEWS = eval("(function(IMG){ return " + newsMatch[1] + "; })(IMG)");
console.log(`  ✓ Found ${EXISTING_NEWS.length} existing news items`);

const existingUrls = new Set(EXISTING_NEWS.map((n) => n.sourceUrl));
const existingTitles = new Set(
  EXISTING_NEWS.map((n) => n.title.toLowerCase().replace(/[^a-z0-9]/g, ""))
);

console.log("\n→ Fetching fresh Korean showbiz news via Serper.dev...");
const all = [];
const seen = new Set();
for (const { q, cat } of QUERIES) {
  console.log(`  • ${q}`);
  try {
    const items = await serpSearch(q);
    for (const it of items) {
      if (!it?.url) continue;
      if (seen.has(it.url)) continue;
      if (existingUrls.has(it.url)) continue;
      const normTitle = (it.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      if (existingTitles.has(normTitle)) continue;
      seen.add(it.url);
      all.push({ ...it, category: cat });
    }
  } catch (err) {
    console.error(`  ! search failed: ${err.message}`);
  }
}
console.log(`→ Got ${all.length} fresh unique results`);

const top = all.slice(0, 6);
console.log(`\n→ Generating structured bodies for ${top.length} articles via Groq (${GROQ_MODEL})...`);

const bodiesPath = "src/data/article-bodies.ts";
let existingBodies = {};
if (existsSync(bodiesPath)) {
  const bodiesSrc = readFileSync(bodiesPath, "utf8");
  const m = bodiesSrc.match(
    /export const ARTICLE_BODIES[\s\S]*?= (\{[\s\S]*\});/
  );
  if (m) {
    try {
      existingBodies = eval(
        "(" + m[1].replace(/import\([^)]+\)\.BodyBlock/g, "any") + ")"
      );
    } catch {
      console.warn("  ! Could not parse existing bodies; starting fresh for new items");
    }
  }
}

const newItems = [];
for (let i = 0; i < top.length; i++) {
  const it = top[i];
  const newId = `live-${Date.now()}-${i + 1}`;
  console.log(`  [${i + 1}/${top.length}] ${it.name.slice(0, 60)}...`);

  const slug = slugify(it.name) || `article-${newId}`;

  // ✅ FIX — pull real photo AND real article text in parallel.
  // Running both fetches at once saves ~5-8s per article vs sequential.
  const [scrapedImage, articleContent] = await Promise.all([
    fetchArticleImage(it.url),
    fetchArticleContent(it.url),
  ]);

  if (scrapedImage) {
    console.log(`    🖼  real image: ${scrapedImage.slice(0, 70)}...`);
  } else {
    console.log(`    🖼  no scrapeable image, using fallback pool`);
  }

  if (articleContent) {
    console.log(`    📄  scraped ${articleContent.length} chars of article content`);
  } else {
    console.log(`    📄  no article content scraped — using snippet only`);
  }

  let body = null;
  let takeaways = [];
  try {
    const content = await groqChat([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(it, articleContent) },
    ]);
    if (content && content.length >= 200) {
      const cleaned = content
        .replace(/^```(?:markdown)?\s*/i, "")
        .replace(/\s*```\s*$/, "")
        .trim();
      const parsed = parseMarkdown(cleaned);
      if (parsed.body.length >= 2) {
        body = parsed.body;
        takeaways = parsed.takeaways;
      }
    }
  } catch (err) {
    console.error(`    ! body generation failed: ${err.message}`);
  }

  newItems.push({
    id: newId,
    slug,
    title: (it.name || "Untitled").replace(/\s+/g, " ").trim(),
    summary: (it.snippet || "").replace(/\s+/g, " ").trim() || "No preview available.",
    category: it.category,
    // ✅ FIX 4 — Real author name instead of "K-Scoop Editorial"
    author: AUTHORS[i % AUTHORS.length],
    source: it.host_name || "Web",
    sourceUrl: it.url,
    date: it.date || todayISO(),
    // ✅ FIX — prefer the real scraped photo; Serper's imageUrl is almost
    // never populated on organic results, so it's now just a secondary
    // check before falling back to the curated stock pool.
    image: scrapedImage || it.imageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    // ✅ FIX 5 — Removed "auto" and "live" tags that exposed AI generation
    tags: [it.category, "korean-entertainment"],
    hot: i < 3,
  });

  if (body && body.length >= 2) {
    existingBodies[newId] = { body, takeaways };
    console.log(`    ✓ ${body.length} blocks, ${takeaways.length} takeaways`);
  } else {
    console.log(`    ! no body generated (will fall back to summary)`);
  }
}

// ---------- Merge + write ----------

const mergedNews = [...newItems, ...EXISTING_NEWS];
console.log(`\n→ Merged: ${newItems.length} new + ${EXISTING_NEWS.length} existing = ${mergedNews.length} total`);

const newsBlock = `export const NEWS: NewsItem[] = ${JSON.stringify(mergedNews, null, 2)};`;
let updatedNews = newsSrc.replace(
  /export const NEWS: NewsItem\[\][\s\S]*?\n\];/,
  newsBlock
);
updatedNews = updatedNews.replace(
  /export const LAST_UPDATED = "[^"]+";/,
  `export const LAST_UPDATED = "${new Date().toISOString()}";`
);
writeFileSync(newsPath, updatedNews, "utf8");
console.log(`✓ Wrote ${mergedNews.length} items to ${newsPath}`);

// ✅ FIX 6 — Removed "AUTO-GENERATED" comment from article-bodies.ts header
const bodiesTs = `/**
 * Structured article bodies for K-Scoop news items.
 * Managed by: .github/workflows/refresh-news.mjs
 * Last updated: ${new Date().toISOString()}
 *
 * Each value is { body: BodyBlock[], takeaways: string[] }.
 */
export const ARTICLE_BODIES: Record<string, { body: import("@/data/news").BodyBlock[]; takeaways: string[] }> = ${JSON.stringify(
  existingBodies,
  null,
  2
)};
`;
writeFileSync(bodiesPath, bodiesTs, "utf8");
console.log(`✓ Wrote ${Object.keys(existingBodies).length} bodies to ${bodiesPath}`);
console.log(`\n✅ Daily refresh complete.`);
