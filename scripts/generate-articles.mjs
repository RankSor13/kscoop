/**
 * Auto-generate full SEO-structured article bodies for each curated news item.
 *
 * For each NewsItem in src/data/news.ts, this script:
 *  1. Sends the title + summary + tags + a list of OTHER articles (for internal
 *     links) to z-ai chat completions
 *  2. Asks for a structured markdown response with H2/H3 subheadings, a
 *     "Key Takeaways" bullet list, internal links to other K-Scoop articles,
 *     and an external link to the original source
 *  3. Parses the markdown into BodyBlock[] + takeaways[]
 *  4. Saves to src/data/article-bodies.ts as { [id]: { body, takeaways } }
 *
 * Re-run any time new curated articles are added to news.ts.
 * Idempotent: skips IDs that already have a structured body (unless --force).
 *
 * Usage:
 *   node /home/z/my-project/scripts/generate-articles.mjs           # only missing
 *   node /home/z/my-project/scripts/generate-articles.mjs --force   # regenerate all
 */
import { ZaiClient } from "../src/lib/zai-client.ts";
import { writeFileSync, readFileSync, existsSync } from "node:fs";

// ---------- Load NEWS + slugs from src/data/news.ts ----------
const newsSrc = readFileSync("/home/z/my-project/src/data/news.ts", "utf8");

// Extract the IMG constant block first (so NEWS can reference it)
const imgMatch = newsSrc.match(/const IMG = (\{[\s\S]*?\n\});/);
if (!imgMatch) {
  console.error("Could not find IMG constant in src/data/news.ts");
  process.exit(1);
}
const IMG = eval("(" + imgMatch[1] + ")");

// Extract the NEWS array literal
const newsMatch = newsSrc.match(/export const NEWS:[\s\S]*?= (\[[\s\S]*?\n\]);/);
if (!newsMatch) {
  console.error("Could not find NEWS array in src/data/news.ts");
  process.exit(1);
}
const NEWS = eval("(function(IMG){ return " + newsMatch[1] + "; })(IMG)");
console.log(`Loaded ${NEWS.length} news items from src/data/news.ts`);

// Compute slugs (mirror the slugify logic in news.ts)
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
const usedSlugs = new Set();
NEWS.forEach((item) => {
  let base = slugify(item.title) || `article-${item.id}`;
  let slug = base;
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
  item.slug = slug;
  usedSlugs.add(slug);
});

// ---------- Load existing bodies (idempotency) ----------
const BODIES_PATH = "/home/z/my-project/src/data/article-bodies.ts";
let existing = {};
if (existsSync(BODIES_PATH)) {
  const src = readFileSync(BODIES_PATH, "utf8");
  const m = src.match(/export const ARTICLE_BODIES[\s\S]*?= (\{[\s\S]*\});/);
  if (m) {
    try {
      existing = eval("(" + m[1] + ")");
    } catch {
      console.warn("Could not parse existing bodies; starting fresh.");
    }
  }
}
console.log(`Found ${Object.keys(existing).length} existing entries.`);

const FORCE = process.argv.includes("--force");
if (FORCE) console.log("--force flag set: regenerating all bodies.\n");

// ---------- LLM prompt ----------
const SYSTEM_PROMPT = `You are a senior entertainment journalist and SEO content strategist writing for K-Scoop, a Korean showbiz news website. Your article bodies are designed to rank on Google.

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

### {Optional H3 sub-subheading}
1 paragraph if needed.

## What Comes Next
Closing paragraph discussing implications.

WRITING RULES:
- Magazine-quality, engaging but factual.
- Lead paragraph hooks the reader with the key facts (who/what/when/where).
- NEVER fabricate quotes, dates, or specific numbers not in the source material.
- NEVER use the words "according to" or other direct-citation phrases.
- Write in third person, past or present tense as appropriate.
- 4-6 body paragraphs total across all sections.

LINK RULES — include 2-3 internal links + 1 external source link:
- Internal links use the syntax: [link text](/article/SLUG) — link to OTHER K-Scoop articles I'll provide. Use them naturally in the prose.
- The external source link goes in the final paragraph: [originally reported by SOURCE_NAME](SOURCE_URL)
- Do NOT link to the current article itself.
- Use descriptive link text (not "click here" or "read more").

Return ONLY the Markdown. No code fences, no commentary.`;

function buildUserPrompt(item, others) {
  // Provide 8 candidate internal-link targets (closest by shared tags)
  const candidates = others
    .map((o) => ({
      o,
      score: o.tags.filter((t) => item.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.o);

  const linkList = candidates
    .map((o) => `  - "${o.title}" → /article/${o.slug}`)
    .join("\n");

  return `Write a full SEO-structured article body for this news item:

TITLE: ${item.title}
SUMMARY: ${item.summary}
CATEGORY: ${item.category}
SOURCE: ${item.source}
SOURCE_URL: ${item.sourceUrl}
DATE: ${item.date}
TAGS: ${item.tags.join(", ")}

Available internal-link targets (use 2-3 of these where naturally relevant):
${linkList}

Remember:
- Start with ## Key Takeaways (3-4 bullets)
- Use ## H2 subheadings to organize the body (NOT the title — title is rendered separately)
- Use ### H3 only if a sub-section needs it
- Include 2-3 internal links to the articles listed above
- End the final paragraph with the external source link: [originally reported by ${item.source}](${item.sourceUrl})
- Return ONLY Markdown, no preamble.`;
}

// ---------- Markdown → BodyBlock[] + takeaways[] parser ----------
function parseMarkdown(md) {
  const lines = md.split("\n");
  const blocks = [];
  let takeaways = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // H2
    const h2 = trimmed.match(/^##\s+(.+)$/);
    if (h2) {
      const headingText = h2[1].trim();
      // Special case: Key Takeaways section
      if (/^key takeaways/i.test(headingText)) {
        i++;
        // Collect following bullet items
        const items = [];
        while (i < lines.length) {
          const t = lines[i].trim();
          if (!t) { i++; continue; }
          const bullet = t.match(/^[-*]\s+(.+)$/);
          if (bullet) {
            items.push(bullet[1].trim());
            i++;
          } else {
            break;
          }
        }
        takeaways = items;
        continue;
      }
      blocks.push({ type: "h2", text: headingText });
      i++;
      continue;
    }

    // H3
    const h3 = trimmed.match(/^###\s+(.+)$/);
    if (h3) {
      blocks.push({ type: "h3", text: h3[1].trim() });
      i++;
      continue;
    }

    // Bullet list (group consecutive bullets)
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      const items = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) { i++; continue; }
        const b = t.match(/^[-*]\s+(.+)$/);
        if (b) {
          items.push(b[1].trim());
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Blockquote
    const quote = trimmed.match(/^>\s+(.+)$/);
    if (quote) {
      const text = quote[1].trim();
      i++;
      // Check for cite on next line: > — Author
      let cite;
      if (i < lines.length) {
        const citeMatch = lines[i].trim().match(/^>\s+[-—]\s*(.+)$/);
        if (citeMatch) {
          cite = citeMatch[1].trim();
          i++;
        }
      }
      blocks.push({ type: "quote", text, cite });
      continue;
    }

    // Paragraph (consume consecutive non-empty, non-special lines)
    const paraLines = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t) break;
      if (/^(##|###|[-*]\s|>)/.test(t)) break;
      paraLines.push(t);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join(" ") });
    }
  }

  return { body: blocks, takeaways };
}

// ---------- Generation ----------
async function generateBody(zai, item, others, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const completion = await zai.chatCompletions({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(item, others) },
        ],
      });
      const content = completion.choices[0]?.message?.content?.trim();
      if (!content || content.length < 300) {
        throw new Error("Response too short or empty");
      }
      // Strip code fences if present
      const cleaned = content
        .replace(/^```(?:markdown)?\s*/i, "")
        .replace(/\s*```\s*$/, "")
        .trim();
      const parsed = parseMarkdown(cleaned);
      if (parsed.body.length < 3) {
        throw new Error(`Only ${parsed.body.length} blocks parsed`);
      }
      return parsed;
    } catch (err) {
      console.error(`  ! attempt ${attempt} for ${item.id} failed: ${err.message}`);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      } else {
        throw err;
      }
    }
  }
}

function writeBodiesFile(bodies) {
  const ts = `/**
 * AUTO-GENERATED structured article bodies for K-Scoop news items.
 * Generated by: /home/z/my-project/scripts/generate-articles.mjs
 * Generated at: ${new Date().toISOString()}
 *
 * Each value is { body: BodyBlock[], takeaways: string[] }.
 *  - body: ordered list of H2/H3/P/UL/Quote blocks (renders with proper HTML
 *          semantics for SEO; inline markdown links [text](url) supported)
 *  - takeaways: bullet list rendered as a "Key Takeaways" featured-snippet box
 *
 * Re-run the script (with --force to regenerate all) to refresh.
 *
 * DO NOT EDIT BY HAND — edit the script or the source news.ts instead.
 */
export const ARTICLE_BODIES: Record<string, { body: import("@/data/news").BodyBlock[]; takeaways: string[] }> = ${JSON.stringify(
    bodies,
    null,
    2
  )};
`;
  writeFileSync(BODIES_PATH, ts, "utf8");
}

async function main() {
  const zai = new ZaiClient();
  const bodies = { ...existing };
  let processed = 0;
  let failed = 0;

  for (const item of NEWS) {
    // Skip if already has structured body and not --force
    if (
      !FORCE &&
      bodies[item.id] &&
      bodies[item.id].body &&
      bodies[item.id].body.length >= 3
    ) {
      console.log(`✓ ${item.id} already has structured body, skipping.`);
      continue;
    }

    const others = NEWS.filter((n) => n.id !== item.id);
    console.log(`→ Generating ${item.id}: ${item.title.slice(0, 60)}…`);
    try {
      const result = await generateBody(zai, item, others);
      bodies[item.id] = result;
      processed++;
      console.log(
        `  ✓ ${result.body.length} blocks, ${result.takeaways.length} takeaways, ${result.body
          .map((b) => b.type)
          .join(",")}`
      );
      // Save incrementally so we don't lose progress on failure
      writeBodiesFile(bodies);
      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 800));
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\nDone. Processed: ${processed}, Failed: ${failed}, Total: ${
      Object.keys(bodies).length
    }`
  );
  writeBodiesFile(bodies);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
