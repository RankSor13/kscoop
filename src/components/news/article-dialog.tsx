"use client";

import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  ExternalLink,
  Flame,
  Clock,
  Share2,
  ArrowRight,
} from "lucide-react";
import type { NewsItem } from "@/data/news";

interface ArticleDialogProps {
  item: NewsItem | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  saved: boolean;
  onSaveToggle: (id: string) => void;
}

const CATEGORY_LABEL: Record<NewsItem["category"], string> = {
  gossip: "Gossip",
  upcoming: "Upcoming Series",
  trending: "Trending",
  casting: "Casting News",
};

export function ArticleDialog({
  item,
  open,
  onOpenChange,
  saved,
  onSaveToggle,
}: ArticleDialogProps) {
  if (!item) return null;

  const hasStaticRoute = Boolean(item.slug);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 gap-0">
        {/* Image header */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-crimson text-primary-foreground border-0">
                {CATEGORY_LABEL[item.category]}
              </Badge>
              {item.hot && (
                <Badge className="bg-gold text-black border-0 flex items-center gap-1">
                  <Flame className="h-3 w-3" /> Hot
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white drop-shadow">
              {item.title}
            </DialogTitle>
          </div>
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.summary}</DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/80">
              K-Scoop Editorial
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />{" "}
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
            {item.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSaveToggle(item.id)}
              className={
                saved
                  ? "text-crimson hover:bg-crimson/10"
                  : "text-muted-foreground hover:text-crimson"
              }
            >
              <Bookmark
                className={`mr-1.5 h-3.5 w-3.5 ${saved ? "fill-current" : ""}`}
              />
              {saved ? "Saved" : "Save"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({ title: item.title, url: window.location.href })
                    .catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="text-muted-foreground hover:text-crimson"
            >
              <Share2 className="mr-1.5 h-3.5 w-3.5" /> Share
            </Button>

            {/* PRIMARY CTA: Read full article ON OUR SITE (Link for SEO) */}
            {hasStaticRoute ? (
              <Button
                asChild
                size="sm"
                className="ml-auto bg-crimson text-primary-foreground hover:bg-crimson/90"
                onClick={() => onOpenChange(false)}
              >
                <Link href={`/article/${item.slug}`}>
                  Read full article
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="ml-auto border-crimson/40 text-crimson hover:bg-crimson/10 hover:text-crimson"
              >
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  View on {item.source}
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>

          {/* Source attribution (secondary) */}
          <div className="mt-4 rounded-lg border border-border/60 bg-secondary/40 p-3">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              <span className="font-semibold">Source:</span> Originally reported
              by{" "}
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="font-medium text-crimson hover:underline inline-flex items-center gap-0.5"
              >
                {item.source}
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              . K-Scoop rewrites and contextualizes the story for our readers —
              the full version keeps you on our site.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
