"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArticleView } from "@/components/news/article-view";
import type { NewsItem } from "@/data/news";

const STORAGE_KEY = "kscoop.bookmarks.v1";

interface ArticleViewClientProps {
  item: NewsItem;
  related: NewsItem[];
  siteUrl: string;
}

/**
 * Client wrapper around <ArticleView> for use inside the /article/[slug]
 * server route. Handles:
 *  - localStorage bookmark persistence
 *  - "Back" navigation (uses browser history; falls back to router.push("/"))
 *  - "Open related" navigation (uses Next.js router for client-side transition)
 */
export function ArticleViewClient({
  item,
  related,
  siteUrl,
}: ArticleViewClientProps) {
  const router = useRouter();
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);

  // Load bookmarks on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Persist bookmarks when they change
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

  const handleBack = React.useCallback(() => {
    // If there's history to go back to, use it; otherwise go to homepage
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  const handleOpenRelated = React.useCallback(
    (relatedItem: NewsItem) => {
      router.push(`/article/${relatedItem.slug}`);
    },
    [router]
  );

  return (
    <ArticleView
      item={item}
      related={related}
      saved={bookmarks.includes(item.id)}
      onSaveToggle={toggleSave}
      onBack={handleBack}
      onOpenRelated={handleOpenRelated}
      siteUrl={siteUrl}
    />
  );
}
