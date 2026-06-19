"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  ExternalLink,
  Flame,
  ListChecks,
  Share2,
  Tag,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/data/news";
import {
  renderBodyBlocks,
  renderInlineLinks,
  extractH2Headings,
} from "@/components/news/render-body";
import { TableOfContents } from "@/components/news/table-of-contents";
import { ReadingProgress } from "@/components/news/reading-progress";
import { BreadcrumbNav } from "@/components/news/breadcrumb-nav";

interface ArticleViewProps {
  item: NewsItem;
  related: NewsItem[];
  saved: boolean;
  onSaveToggle: (id: string) => void;
  onBack: () => void;
  onOpenRelated: (item: NewsItem) => void;
  siteUrl?: string;
}

const CATEGORY_LABEL: Record<NewsItem["category"], string> = {
  gossip: "Gossip",
  upcoming: "Upcoming Series",
  trending: "Trending",
  casting: "Casting News",
};

// ✅ Safety net — if a scraped/source image 404s, gets hotlink-blocked, or
// was a malformed URL that slipped past the build-time check in
// refresh-news.mjs, swap in a known-good placeholder instead of showing a
// broken <img> icon. The `data-fallback` guard stops an infinite loop if
// the fallback itself ever fails to load.
const FALLBACK_IMAGE = "https://sfile.chatglm.cn/images-ppt/9be0638b46b2.jpg";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.dataset.fallback === "1") return;
  img.dataset.fallback = "1";
  img.src = FALLBACK_IMAGE;
}

function readTime(item: NewsItem): string {
  const blocks = item.body ?? [];
  if (blocks.length === 0) return "1 min read";
  const text = blocks
    .map((b) => {
      if (b.type === "ul") return b.items.join(" ");
      return b.text ?? "";
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function timeAgo(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleView({
  item,
  related,
  saved,
  onSaveToggle,
  onBack,
  onOpenRelated,
  siteUrl,
}: ArticleViewProps) {
  // Scroll to top on mount and whenever the item changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [item.id]);

  const body = item.body;
  const hasBody = body && body.length >= 1;
  const takeaways = item.takeaways ?? [];

  // Extract H2 headings for the Table of Contents (memoized per item)
  const tocItems = React.useMemo(
    () => (hasBody ? extractH2Headings(body!) : []),
    [body, hasBody]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {/* Reading progress bar — fills as user scrolls */}
      <ReadingProgress />

      {/* Sticky back bar */}
      <div className="sticky top-0 z-30 border-b border-border/60 glass">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="px-2 text-foreground hover:text-crimson"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to feed
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSaveToggle(item.id)}
              aria-label={saved ? "Remove bookmark" : "Save article"}
              className="h-9 w-9"
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-current text-crimson" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({ title: item.title, url }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(url);
                }
              }}
              aria-label="Share article"
              className="h-9 w-9"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Article — 2-column layout on desktop (body + TOC sidebar) */}
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-6">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
          {/* Main column */}
          <article className="min-w-0 max-w-3xl lg:max-w-none">
            {/* Breadcrumb — Home > Category > Article */}
            <div className="mb-4">
              <BreadcrumbNav item={item} />
            </div>

            {/* Category + hot badge */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-crimson text-primary-foreground border-0">
                {CATEGORY_LABEL[item.category]}
              </Badge>
              {item.hot && (
                <Badge className="bg-gold text-black border-0 flex items-center gap-1">
                  <Flame className="h-3 w-3" /> Hot
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              {item.title}
            </h1>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground border-b border-border/60 pb-4">
              <span className="font-semibold text-foreground/80">K-Scoop Editorial</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {timeAgo(item.date)}
              </span>
              <span className="text-border">·</span>
              <span>{readTime(item)}</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1 text-crimson">
                <TrendingUp className="h-3.5 w-3.5" /> Trending
              </span>
            </div>

            {/* Hero image */}
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                onError={handleImgError}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-[11px] text-white/80">
                  Image: {item.source} / via K-Scoop
                </p>
              </div>
            </div>

            {/* Mobile TOC — collapsible, shown above the body */}
            <div className="mt-6">
              <TableOfContents items={tocItems} />
            </div>

            {/* Key Takeaways — featured-snippet box */}
            {hasBody && takeaways.length > 0 && (
              <aside
                className="mt-6 rounded-2xl border border-crimson/30 bg-gradient-to-br from-crimson/5 to-gold/5 p-5 sm:p-6"
                aria-label="Key Takeaways"
              >
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-crimson mb-3">
                  <ListChecks className="h-4 w-4" />
                  Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {takeaways.map((t, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm sm:text-base leading-relaxed text-foreground/90"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      <span>{renderInlineLinks(t)}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Article body — structured blocks (H2/H3/P/UL/Quote) */}
            {hasBody ? (
              <div className="mt-8 article-body">
                {renderBodyBlocks(body!)}
              </div>
            ) : (
              <div className="mt-8">
                <p className="text-base sm:text-lg leading-relaxed text-foreground/85">
                  {item.summary}
                </p>
                <p className="mt-4 text-sm text-muted-foreground italic">
                  Full article body is being generated. Please check back shortly.
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2 border-t border-border/60 pt-6">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Tag className="h-3 w-3" /> Tags
              </span>
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Source citation box */}
            <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/40 p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Source & Attribution
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                This article was compiled and edited by K-Scoop's editorial team based on
                reporting originally published by{" "}
                <span className="font-semibold text-foreground">{item.source}</span>.
                K-Scoop aggregates, rewrites, and contextualizes Korean entertainment
                news for our readers — we do not claim authorship of the underlying
                reporting. All trademarks, images, and quoted material remain the
                property of their respective owners.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-crimson/40 text-crimson hover:bg-crimson/10 hover:text-crimson"
                >
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    View original report on {item.source}
                    <ExternalLink className="ml-1.5 h-3 w-3" />
                  </a>
                </Button>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                Original URL:{" "}
                <span className="font-mono break-all">{item.sourceUrl}</span>
              </p>
              {siteUrl && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Permalink:{" "}
                  <span className="font-mono break-all">
                    {siteUrl}/article/{item.slug}
                  </span>
                </p>
              )}
            </div>

            {/* Action row */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Button
                onClick={() => onSaveToggle(item.id)}
                variant={saved ? "default" : "outline"}
                className={
                  saved
                    ? "bg-crimson text-primary-foreground hover:bg-crimson/90"
                    : "border-crimson/40 text-crimson hover:bg-crimson/10 hover:text-crimson"
                }
              >
                <Bookmark className={`mr-1.5 h-4 w-4 ${saved ? "fill-current" : ""}`} />
                {saved ? "Saved to your reading list" : "Save for later"}
              </Button>
              <Button
                onClick={onBack}
                variant="ghost"
                className="text-muted-foreground hover:text-crimson"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to all news
              </Button>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-12 border-t border-border/60 pt-8">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-crimson mb-4">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {related.length > 3 ? "More stories you might like" : `More from ${CATEGORY_LABEL[item.category]}`}
                  <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {related.length}
                  </span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/article/${r.slug}`}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-left card-hover"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                          loading="lazy"
                          onError={handleImgError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute left-2 top-2 rounded bg-crimson/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur">
                          {CATEGORY_LABEL[r.category]}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-crimson">
                          {r.title}
                        </h4>
                        <div className="mt-1 text-[10px] text-muted-foreground">
                          {r.source} · {timeAgo(r.date)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
