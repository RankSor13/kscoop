"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { NewsItem } from "@/data/news";

interface BreadcrumbNavProps {
  item: NewsItem;
}

const CATEGORY_LABEL: Record<NewsItem["category"], string> = {
  gossip: "Gossip",
  upcoming: "Upcoming Series",
  trending: "Trending",
  casting: "Casting News",
};

const CATEGORY_FRAGMENT: Record<NewsItem["category"], string> = {
  gossip: "#feed",
  upcoming: "#feed",
  trending: "#feed",
  casting: "#feed",
};

/**
 * Breadcrumb navigation: Home > Category > Article title.
 *
 * - Home and Category are <Link> elements (SEO-friendly internal links)
 * - Current article is plain text (no link) — standard breadcrumb pattern
 * - Complements the JSON-LD BreadcrumbList schema already in the page
 * - Visually subtle (small text, muted color) so it doesn't compete with
 *   the article title
 */
export function BreadcrumbNav({ item }: BreadcrumbNavProps) {
  const truncatedTitle =
    item.title.length > 60 ? item.title.slice(0, 57) + "…" : item.title;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded px-1 py-0.5 hover:text-crimson transition-colors"
      >
        <Home className="h-3 w-3" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
      <Link
        href={`/${CATEGORY_FRAGMENT[item.category]}`}
        className="rounded px-1 py-0.5 hover:text-crimson transition-colors font-medium"
      >
        {CATEGORY_LABEL[item.category]}
      </Link>
      <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
      <span
        className="px-1 py-0.5 text-foreground/70 font-medium line-clamp-1"
        aria-current="page"
      >
        {truncatedTitle}
      </span>
    </nav>
  );
}
