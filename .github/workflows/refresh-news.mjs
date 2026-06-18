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

const FALLBACK_IMAGES = [
  "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
  "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
  "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
  "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
  "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
  "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
];

const SYSTEM_PROMPT = `You are a senior entertainment journalist and SEO content strategist writing for K-Scoop, a Korean showbiz news website.

OUTPUT FORMAT — return ONLY valid Markdown (no HTML, no preamble, no closing remarks). Structure:

## Key Takeaways
- Bullet 1 (one sentence, a concrete fact)
- Bullet 2
- Bullet 3
- Bullet 4

## {Descriptive H2 Subheading}
2-3 paragraphs of body prose. Each paragraph 3-5 sentences.

## {Another H2 Subheading}
1-2 more paragraphs.

## What Comes Next
Closing paragraph discussing implications. End with the external source link: [originally reported by SOURCE_NAME](SOURCE_URL)

RULES:
- Magazine-quality, engaging but factual.
- NEVER fabricate quotes, dates, or specific numbers not in the source material.
- Write in third person.
- 4-6 body paragraphs total.
- Return ONLY Markdown.`;

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
      max_tokens: 1500,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Groq error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

// ---------- Helpers ----------

function buildUserPrompt(item) {
  return `Write a full SEO-structured article body for this news item:

TITLE: ${item.name}
SUMMARY: ${item.snippet}
SOURCE: ${item.host_name}
SOURCE_URL: ${item.url}`;
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
  let body = null;
  let takeaways = [];
  try {
    const content = await groqChat([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(it) },
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
    source: it.host_name || "Web",
    sourceUrl: it.url,
    date: it.date || todayISO(),
    image: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    tags: ["auto", "live", it.category],
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

const bodiesTs = `/**
 * AUTO-GENERATED structured article bodies for K-Scoop news items.
 * Generated by: .github/workflows/refresh-news.mjs (daily Action)
 * Generated at: ${new Date().toISOString()}
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
