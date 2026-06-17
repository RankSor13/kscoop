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

function buildUserPrompt(item: {
  name: string;
  snippet: string;
  host_name: string;
  url: string;
}) {
  return `Write a full SEO-structured article body for this news item:

TITLE: ${item.name}
SUMMARY: ${item.snippet}
SOURCE: ${item.host_name}
SOURCE_URL: ${item.url}

Remember:
- Start with ## Key Takeaways (3-4 bullets)
- Use ## H2 subheadings to organize the body (NOT the title — title is rendered separately)
- Use ### H3 only if a sub-section needs it
- End the final paragraph with the external source link: [originally reported by ${item.host_name}](${item.url})
- Return ONLY Markdown, no preamble.`;
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
