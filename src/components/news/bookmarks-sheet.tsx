"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2, ExternalLink, X, ArrowRight } from "lucide-react";
import type { NewsItem } from "@/data/news";

interface BookmarksSheetProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  items: NewsItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  /** Fallback for items without a slug (live articles). */
  onOpenArticle?: (item: NewsItem) => void;
}

export function BookmarksSheet({
  open,
  onOpenChange,
  items,
  onRemove,
  onClear,
  onOpenArticle,
}: BookmarksSheetProps) {
  const handleOpen = (item: NewsItem) => {
    onOpenChange(false);
    if (item.slug) return; // let <Link> handle navigation
    onOpenArticle?.(item);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[440px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-crimson" />
            Saved Articles
            <Badge variant="secondary" className="ml-1">{items.length}</Badge>
          </SheetTitle>
          <SheetDescription>
            Your bookmarked Korean showbiz stories — stored locally on this device.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={items.length === 0}
            className="text-muted-foreground"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Clear all
          </Button>
        </div>

        <div className="mt-3 space-y-3">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              <Bookmark className="mx-auto mb-2 h-8 w-8 opacity-40" />
              No saved articles yet. Tap the bookmark icon on any story to save it for later.
            </div>
          ) : (
            items.map((item) => {
              const href = item.slug ? `/article/${item.slug}` : null;
              const Wrapper = href
                ? ({ children }: { children: React.ReactNode }) => (
                    <Link href={href!} onClick={() => onOpenChange(false)}>
                      {children}
                    </Link>
                  )
                : ({ children }: { children: React.ReactNode }) => (
                    <button onClick={() => handleOpen(item)}>{children}</button>
                  );
              return (
                <div
                  key={item.id}
                  className="group flex gap-3 rounded-xl border border-border/60 bg-card p-2"
                >
                  <Wrapper>
                    <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </span>
                  </Wrapper>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Wrapper>
                      <span className="line-clamp-2 block text-left text-sm font-semibold leading-snug hover:text-crimson">
                        {item.title}
                      </span>
                    </Wrapper>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      {item.source} · {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-1">
                      {href ? (
                        <Link
                          href={href}
                          onClick={() => onOpenChange(false)}
                          className="inline-flex items-center gap-1 text-[10px] font-medium text-crimson hover:underline"
                        >
                          Read full <ArrowRight className="h-2.5 w-2.5" />
                        </Link>
                      ) : null}
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-crimson"
                      >
                        Source <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    aria-label="Remove"
                    className="self-start text-muted-foreground hover:text-crimson"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
