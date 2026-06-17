"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Flame, Bookmark, Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  search: string;
  onSearch: (v: string) => void;
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All News" },
  { id: "gossip", label: "Gossip" },
  { id: "upcoming", label: "Upcoming Series" },
  { id: "trending", label: "Trending" },
  { id: "casting", label: "Casting" },
];

export function Header({
  search,
  onSearch,
  activeCategory,
  onCategoryChange,
  bookmarkCount,
  onOpenBookmarks,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      {/* Top strip */}
      <div className="border-b border-border/40 bg-crimson text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 font-medium">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
            <span className="tracking-wide uppercase">Live · Updated daily</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="opacity-80">Sourced from Soompi · Koreaboo · SCMP · Forbes · BBC · allkpop · SBS Star</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl gradient-rose-gold text-white shadow-md">
            <Flame className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-black tracking-tight">
              K<span className="text-gradient-rose-gold">Scoop</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Korean Showbiz Daily
            </div>
          </div>
        </Link>

        {/* Desktop search */}
        <div className="relative ml-auto hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search actors, dramas, scandals…"
            className="pl-9 bg-background/60 border-border/60 focus-visible:ring-rose"
          />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenBookmarks}
            aria-label="Saved articles"
            className="relative"
          >
            <Bookmark className="h-4.5 w-4.5" />
            {bookmarkCount > 0 && (
              <Badge
                variant="secondary"
                className="absolute -right-1 -top-1 h-4 min-w-4 px-1 justify-center bg-crimson text-[10px] text-primary-foreground"
              >
                {bookmarkCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-crimson" />
                  K-Scoop Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search…"
                    className="pl-9"
                  />
                </div>
                <nav className="flex flex-col gap-1">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onCategoryChange(c.id)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        activeCategory === c.id
                          ? "bg-crimson text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop category nav */}
      <nav className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-2 scrollbar-rose">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategoryChange(c.id)}
              className={`relative whitespace-nowrap px-4 py-2.5 text-sm font-medium transition ${
                activeCategory === c.id
                  ? "text-crimson"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
              {activeCategory === c.id && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-crimson" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
