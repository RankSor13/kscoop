"use client";

import * as React from "react";
import { Header } from "@/components/news/header";
import { Hero } from "@/components/news/hero";
import { Ticker } from "@/components/news/ticker";
import { NewsCard } from "@/components/news/news-card";
import { ActorGrid } from "@/components/news/actor-grid";
import { UpcomingSeriesSection } from "@/components/news/upcoming-series";
import { ArticleDialog } from "@/components/news/article-dialog";
import { BookmarksSheet } from "@/components/news/bookmarks-sheet";
import { RefreshButton } from "@/components/news/refresh-button";
import { Footer } from "@/components/news/footer";
import {
  NEWS,
  ACTORS,
  UPCOMING_SERIES,
  HERO_FEATURES,
  LAST_UPDATED,
  type NewsItem,
  type BodyBlock,
} from "@/data/news";
import { SearchX, Flame, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LiveNewsItem {
  id: string;
  title: string;
  summary: string;
  body?: BodyBlock[];
  takeaways?: string[];
  category: string;
  source: string;
  sourceUrl: string;
  date: string;
}

// Default image rotation for live-refresh items (which don't have images)
const LIVE_IMAGES = [
  "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg",
  "https://sfile.chatglm.cn/images-ppt/0ba5c3374361.jpg",
  "https://sfile.chatglm.cn/images-ppt/0cbd0a3ee8b8.jpg",
  "https://sfile.chatglm.cn/images-ppt/a78d07243519.jpg",
  "https://sfile.chatglm.cn/images-ppt/4b718e6f12d7.jpg",
  "https://sfile.chatglm.cn/images-ppt/381738f62ea9.jpeg",
];

const STORAGE_KEY = "kscoop.bookmarks.v1";

export default function HomePage() {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);
  const [bookmarksOpen, setBookmarksOpen] = React.useState(false);
  const [activeArticle, setActiveArticle] = React.useState<NewsItem | null>(null);
  const [articleOpen, setArticleOpen] = React.useState(false); // quick-preview dialog (live articles only)
  const [liveItems, setLiveItems] = React.useState<NewsItem[]>([]);

  // Merge live items on top of base news
  const allItems = React.useMemo(() => [...liveItems, ...NEWS], [liveItems]);

  // ----- Bookmarks persistence -----
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      /* ignore */
    }
  }, [bookmarks]);

  const toggleSave = React.useCallback((id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  // Quick-preview dialog (only used for live-refreshed articles without slugs)
  const openQuickView = (item: NewsItem) => {
    setActiveArticle(item);
    setArticleOpen(true);
  };

  // ----- Live refresh handler -----
  const handleRefresh = (items: LiveNewsItem[]) => {
    const mapped: NewsItem[] = items.map((it, i) => ({
      id: it.id,
      // Live articles intentionally have NO slug — they're ephemeral and
      // shouldn't be indexed. They open the quick-view dialog instead.
      slug: "",
      title: it.title,
      summary: it.summary,
      body: it.body,
      takeaways: it.takeaways,
      category: (["gossip", "upcoming", "trending", "casting"].includes(
        it.category
      )
        ? it.category
        : "trending") as NewsItem["category"],
      source: it.source,
      sourceUrl: it.sourceUrl,
      date: it.date,
      image: LIVE_IMAGES[i % LIVE_IMAGES.length],
      tags: ["live"],
      hot: true,
    }));
    setLiveItems(mapped);
    setTimeout(() => {
      document
        .getElementById("feed")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // ----- Filtered feed -----
  const filtered = React.useMemo(() => {
    let list = allItems;
    if (activeCategory !== "all")
      list = list.filter((n) => n.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)) ||
          n.source.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [allItems, activeCategory, search]);

  const savedItems = React.useMemo(
    () => allItems.filter((n) => bookmarks.includes(n.id)),
    [bookmarks, allItems]
  );

  const tickerItems = React.useMemo(
    () => NEWS.filter((n) => n.hot).slice(0, 8),
    []
  );

  const lastUpdatedLabel = React.useMemo(() => {
    const d = new Date(LAST_UPDATED);
    return d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        search={search}
        onSearch={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />

      <Hero slides={HERO_FEATURES} />

      <Ticker items={tickerItems} />

      <main className="flex-1">
        {/* Feed section */}
        <section id="feed" className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-crimson mb-1">
                <TrendingUp className="inline h-3.5 w-3.5 mr-1" />
                Latest Headlines
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {activeCategory === "all"
                  ? "All Korean Showbiz News"
                  : activeCategory === "gossip"
                  ? "Celebrity Gossip & Scandals"
                  : activeCategory === "upcoming"
                  ? "Upcoming K-Drama Releases"
                  : activeCategory === "trending"
                  ? "Trending Right Now"
                  : "Casting News"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filtered.length} stories · Last refreshed {lastUpdatedLabel} ·
                Sourced from across the web
              </p>
            </div>
            <RefreshButton onRefresh={handleRefresh} />
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <SearchX className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">
                No stories match your search
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or clear your filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  saved={bookmarks.includes(item.id)}
                  onSaveToggle={toggleSave}
                  onOpenFull={openQuickView}
                  index={i}
                />
              ))}
            </div>
          )}
        </section>

        {/* Upcoming K-Dramas */}
        <UpcomingSeriesSection series={UPCOMING_SERIES} />

        {/* Actors */}
        <ActorGrid actors={ACTORS} />

        {/* SEO + Daily update banner */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 gradient-dark-showbiz p-8 sm:p-12 text-center">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-crimson/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-crimson/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose">
                <Flame className="h-3 w-3" /> Daily Updates · SEO-First
              </div>
              <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-white">
                Fresh K-showbiz news, every single day
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/80">
                Each story is auto-expanded into a full article at a clean,
                SEO-friendly URL ({"/article/<slug>"}) with proper title tags,
                meta descriptions, Open Graph, Twitter cards, and JSON-LD
                NewsArticle structured data. Readers stay on our site; the
                original source is cited at the end of every article.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  /article/&lt;slug&gt; URLs
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Per-page &lt;title&gt;
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Meta description
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  JSON-LD NewsArticle
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Canonical URLs
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  sitemap.xml
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  robots.txt
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quick-preview dialog (live-refreshed articles only) */}
      <ArticleDialog
        item={activeArticle}
        open={articleOpen}
        onOpenChange={setArticleOpen}
        saved={activeArticle ? bookmarks.includes(activeArticle.id) : false}
        onSaveToggle={toggleSave}
      />

      <BookmarksSheet
        open={bookmarksOpen}
        onOpenChange={setBookmarksOpen}
        items={savedItems}
        onRemove={(id) => setBookmarks((p) => p.filter((b) => b !== id))}
        onClear={() => setBookmarks([])}
        onOpenArticle={openQuickView}
      />
    </div>
  );
}
