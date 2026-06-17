/**
 * GET /api/news
 * Returns the current structured news dataset (compiled from real-time web search).
 * Query params:
 *   - category: "gossip" | "upcoming" | "trending" | "casting" | "all" (default "all")
 *   - q: free-text search filter
 *   - hot: "true" to return only hot items
 */
import { NextResponse } from "next/server";
import { NEWS, ACTORS, UPCOMING_SERIES, HERO_FEATURES, LAST_UPDATED, type NewsCategory } from "@/data/news";

export const dynamic = "force-static";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = (url.searchParams.get("category") ?? "all") as
    | "all"
    | NewsCategory;
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const hotOnly = url.searchParams.get("hot") === "true";

  let items = NEWS.slice();
  if (category !== "all") items = items.filter((n) => n.category === category);
  if (hotOnly) items = items.filter((n) => n.hot);
  if (q) {
    items = items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)) ||
        n.source.toLowerCase().includes(q)
    );
  }

  // Sort by date desc
  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  return NextResponse.json({
    success: true,
    lastUpdated: LAST_UPDATED,
    count: items.length,
    items,
    actors: ACTORS,
    upcoming: UPCOMING_SERIES,
    heroes: HERO_FEATURES,
  });
}
