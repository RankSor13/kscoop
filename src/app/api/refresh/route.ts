/**
 * POST /api/refresh
 * Live-fetches fresh Korean showbiz news from the web via the Z.ai API and
 * returns a normalized payload. The frontend uses this for the "Refresh now"
 * button; a GitHub Action also hits this endpoint daily to surface the latest
 * headlines for the next static build.
 *
 * For each fetched item, we also call Z.ai chat completions to AUTO-GENERATE
 * a structured article body (H2/H3 subheadings, Key Takeaways, internal +
 * external links) — so readers stay on our site when they click "Read full
 * article" and get SEO-optimized content.
 *
 * Uses the ZaiClient (fetch-based, no SDK) — works with your ZAI_API_KEY
 * from https://z.ai/manage-apikey/apikey-list.
 *
 * Body (optional):
 *   { queries?: string[], generateBodies?: boolean }
 */
import { NextResponse } from "next/server";
import { ZaiClient, type SearchResult } from "@/lib/zai-client";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes for the LLM body generation

interface BodyBlock {
  type: "h2" | "h3" | "p" | "quote" | "ul";
  text?: string;
  items?: string[];
  cite?: string;
}

const DEFAULT_QUERIES = [
  "Korean actor actress gossip scandal news this week",
  "Korean drama upcoming series 2026 release date Netflix Disney+",
  "Korean celebrity trending news today K-pop actor actress",
  "Kdrama new cast announcement 2026",
];

const SYSTEM_PROMPT = `You are a passionate K-entertainment writer for K-Scoop — you grew up watching K-dramas, you care about this stuff, and you write like it. Think Allkpop or Soompi at their best: opinionated, punchy, and real.

OUTPUT FORMAT — return ONLY valid Markdown. Structure:

## Key Takeaways
- Bullet 1 (one tight sentence, a real fact)
- Bullet 2
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

STRUCTURAL VARIETY:
- Do NOT always end with a "What Comes Next" section. Mix it up — use "The Bigger Picture", "Why This Matters", "Fan Reaction", "Where Things Stand Now", "What Fans Are Saying", etc.
- Do NOT always start H2 headings with the same pattern
- Lead with the most interesting or surprising angle first, not a dry summary

AVOID THESE AI GIVEAWAYS (never use these phrases):
- "it is worth noting", "it is important to mention", "it's important to note"
- "sent shockwaves through", "underscores the growing", "in the digital age"
- "has raised concerns about", "serves as a cautionary tale", "as a testament to"
- "it remains to be seen", "only time will tell", "at the end of the day"
- "in conclusion", "to summarize", "in summary"
- Starting two consecutive paragraphs with "The [noun]..."
- Filler transitions like "Furthermore,", "Moreover,", "Additionally,"
- Re-summarizing what you just said at the end of a section

CONTENT RULES:
- NEVER fabricate quotes, dates, or specific numbers not in the source material
- Write in third person
- 4-6 body paragraphs total
- Return ONLY Markdown — no HTML, no preamble, no "Here is the article:"`;

function buildUserPrompt(item: {
  name: string;
  snippet: string;
  host_name: string;
  url: string;
}) {
  return `Write a K-Scoop article about this news story. Lead with what's most interesting or surprising about it — don't bury the hook.

TITLE: ${item.name}
SUMMARY: ${item.snippet}
SOURCE: ${item.host_name}
SOURCE_URL: ${item.url}

Write like a real person who actually follows K-drama news. Use contractions. Vary sentence length. Keep the tone fun and direct — not a press release, not a Wikipedia entry. Only use facts from the summary above.`;
}

/** Parse the LLM's Markdown response into BodyBlock[] + takeaways[]. */
function parseMarkdown(md: string): {
  body: BodyBlock[];
  takeaways: string[];
} {
  const lines = md.split("\n");
  const blocks: BodyBlock[] = [];
  let takeaways: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      i++;
      continue;
    }

    const h2 = trimmed.match(/^##\s+(.+)$/);
    if (h2) {
      const headingText = h2[1].trim();
      if (/^key takeaways/i.test(headingText)) {
        i++;
        const items: string[] = [];
        while (i < lines.length) {
          const t = lines[i].trim();
          if (!t) {
            i++;
            continue;
          }
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

    const h3 = trimmed.match(/^###\s+(.+)$/);
    if (h3) {
      blocks.push({ type: "h3", text: h3[1].trim() });
      i++;
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (!t) {
          i++;
          continue;
        }
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

    const quote = trimmed.match(/^>\s+(.+)$/);
    if (quote) {
      const text = quote[1].trim();
      i++;
      let cite: string | undefined;
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

    const paraLines: string[] = [];
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

async function generateBody(
  zai: ZaiClient,
  item: { name: string; snippet: string; host_name: string; url: string }
): Promise<{ body: BodyBlock[]; takeaways: string[] } | undefined> {
  try {
    const completion = await zai.chatCompletions({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(item) },
      ],
      temperature: 0.9,
      max_tokens: 2000,
    });
    const content = completion.choices[0]?.message?.content?.trim();
    if (!content || content.length < 200) return undefined;
    const cleaned = content
      .replace(/^```(?:markdown)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();
    const parsed = parseMarkdown(cleaned);
    if (parsed.body.length < 2) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const queries: string[] = body?.queries?.length
      ? body.queries
      : DEFAULT_QUERIES;
    const generateBodies = body?.generateBodies !== false;

    // ZaiClient reads ZAI_API_KEY + ZAI_BASE_URL from env
    const zai = new ZaiClient();

    // ----- Step 1: Run web search queries in parallel -----
    const allResults = await Promise.all(
      queries.map((q) =>
        zai
          .webSearch(q, { num: 10, recency_days: 7 })
          .then((r: SearchResult[]) => r ?? [])
          .catch(() => [])
      )
    );

    // Flatten & dedupe by URL
    const seen = new Set<string>();
    const merged: SearchResult[] = [];
    for (const list of allResults) {
      for (const item of list) {
        if (!item?.url || seen.has(item.url)) continue;
        seen.add(item.url);
        merged.push(item);
      }
    }

    // Categorize heuristically
    const categorize = (item: SearchResult): string => {
      const text = `${item.name} ${item.snippet}`.toLowerCase();
      if (/(scandal|lawsuit|defamation|dating|divorce|controversy|rumor|rumour|arrest)/.test(text))
        return "gossip";
      if (/(cast|casting|joins|stars|leads|to star|confirmed for)/.test(text))
        return "casting";
      if (/(upcoming|premiere|release|lineup|coming|schedule|2026|2027)/.test(text))
        return "upcoming";
      return "trending";
    };

    // Take top 8 (to keep LLM body generation fast and within rate limits)
    const top = merged.slice(0, 8);

    // ----- Step 2: Auto-generate structured article bodies -----
    const items = await Promise.all(
      top.map(async (item, i) => {
        let structured:
          | { body: BodyBlock[]; takeaways: string[] }
          | undefined;
        if (generateBodies) {
          structured = await generateBody(zai, item);
        }
        return {
          id: `live-${i}`,
          title: item.name,
          summary: item.snippet,
          body: structured?.body,
          takeaways: structured?.takeaways,
          category: categorize(item),
          source: item.host_name,
          sourceUrl: item.url,
          date: item.date ?? new Date().toISOString().slice(0, 10),
        };
      })
    );

    return NextResponse.json({
      success: true,
      fetchedAt: new Date().toISOString(),
      count: items.length,
      bodiesGenerated: items.filter((i) => i.body).length,
      items,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message, items: [] },
      { status: 500 }
    );
  }
}
