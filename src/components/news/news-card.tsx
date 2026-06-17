"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Bookmark, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "@/data/news";

interface NewsCardProps {
  item: NewsItem;
  saved: boolean;
  onSaveToggle: (id: string) => void;
  /**
   * Fallback for items without a slug (e.g. live-refreshed articles that
   * don't have a static /article/[slug] route). Opens the quick dialog.
   */
  onOpenFull?: (item: NewsItem) => void;
  index?: number;
}

const CATEGORY_META: Record<
  NewsItem["category"],
  { label: string; className: string }
> = {
  gossip: {
    label: "Gossip",
    className: "bg-crimson/15 text-crimson border-crimson/30",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-gold/15 text-gold border-gold/30",
  },
  trending: {
    label: "Trending",
    className: "bg-rose/15 text-rose border-rose/30",
  },
  casting: {
    label: "Casting",
    className:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
};

function timeAgo(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const diff = Date.now() - d.getTime();
  const day = 24 * 3600 * 1000;
  if (diff < day) return "Today";
  if (diff < 2 * day) return "Yesterday";
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
  if (diff < 30 * day) return `${Math.floor(diff / (7 * day))}w ago`;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsCard({
  item,
  saved,
  onSaveToggle,
  onOpenFull,
  index = 0,
}: NewsCardProps) {
  const meta = CATEGORY_META[item.category];

  // Curated articles (with slug) → real /article/[slug] route for SEO.
  // Live articles (no slug) → fallback to the quick dialog.
  const hasStaticRoute = Boolean(item.slug);
  const articleHref = hasStaticRoute ? `/article/${item.slug}` : null;

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (articleHref) return; // let <Link> handle the navigation
    onOpenFull?.(item);
  };

  return (
    <motion.article
      id={`article-${item.id}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
    >
      {/* Image — clickable if it has a static route */}
      {articleHref ? (
        <Link
          href={articleHref}
          aria-label={`Read: ${item.title}`}
          className="relative aspect-[16/10] block overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
            <Badge className={`${meta.className} border backdrop-blur`}>
              {meta.label}
            </Badge>
            {item.hot && (
              <Badge className="bg-crimson text-primary-foreground border-0 backdrop-blur flex items-center gap-1">
                <Flame className="h-3 w-3" /> Hot
              </Badge>
            )}
          </div>
        </Link>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
            <Badge className={`${meta.className} border backdrop-blur`}>
              {meta.label}
            </Badge>
            {item.hot && (
              <Badge className="bg-crimson text-primary-foreground border-0 backdrop-blur flex items-center gap-1">
                <Flame className="h-3 w-3" /> Hot
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Save button (always present, top-right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onSaveToggle(item.id);
        }}
        aria-label={saved ? "Remove from saved" : "Save article"}
        className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full backdrop-blur transition ${
          saved
            ? "bg-crimson text-primary-foreground"
            : "bg-black/50 text-white hover:bg-black/70"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground/80">{item.source}</span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {timeAgo(item.date)}
          </span>
        </div>

        {/* Title — clickable for curated, plain for live */}
        {articleHref ? (
          <Link href={articleHref} className="block">
            <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight group-hover:text-crimson transition-colors">
              {item.title}
            </h3>
          </Link>
        ) : (
          <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight group-hover:text-crimson transition-colors">
            {item.title}
          </h3>
        )}

        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* CTA — Read full article ON OUR SITE */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/50">
          {articleHref ? (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-crimson hover:text-crimson hover:bg-crimson/10 px-2"
            >
              <Link href={articleHref}>
                Read full article <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleOpen}
              className="text-crimson hover:text-crimson hover:bg-crimson/10 px-2"
            >
              Quick view <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onSaveToggle(item.id);
            }}
            className="text-xs text-muted-foreground hover:text-crimson"
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
