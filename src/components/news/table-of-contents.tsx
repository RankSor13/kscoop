"use client";

import * as React from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * Sticky Table of Contents with scroll-spy.
 *
 * - Desktop (lg+): sticky sidebar on the right, visible alongside the article.
 * - Mobile: collapsible accordion at the top of the article.
 * - Active section is highlighted based on scroll position (scroll-spy via
 *   IntersectionObserver).
 * - Clicking a link smooth-scrolls to the section (native `scroll-mt-24` on
 *   the heading handles the sticky-header offset).
 * - Updates the URL hash without triggering a jump (so the URL is shareable
 *   to a specific section).
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Scroll-spy: track which H2 is currently in view
  React.useEffect(() => {
    if (items.length === 0) return;
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost entry that is currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when heading is in the top ~30% of the viewport
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      }
    );

    // Observe all H2 elements that have an ID matching our TOC items
    const elements: HTMLElement[] = [];
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without jumping (so links are shareable)
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
      setMobileOpen(false);
    }
  };

  const TocList = (
    <ol className="space-y-1.5">
      {items.map((item, i) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`group flex items-start gap-2 rounded-md px-2.5 py-1.5 text-xs leading-snug transition ${
                isActive
                  ? "bg-crimson/10 text-crimson font-semibold"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`mt-0.5 font-mono text-[10px] tabular-nums ${
                  isActive ? "text-crimson" : "text-muted-foreground/60"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="line-clamp-2">{item.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Mobile: collapsible accordion */}
      <div className="lg:hidden mb-6 rounded-xl border border-border/60 bg-card overflow-hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
          aria-expanded={mobileOpen}
          aria-controls="toc-mobile-content"
        >
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            <List className="h-4 w-4 text-crimson" />
            On this page
            <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {items.length}
            </span>
          </span>
          <span
            className={`text-muted-foreground transition-transform ${
              mobileOpen ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
        </button>
        {mobileOpen && (
          <div
            id="toc-mobile-content"
            className="border-t border-border/60 px-2 py-2"
          >
            {TocList}
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-rose"
      >
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <h2 className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
            <List className="h-3.5 w-3.5 text-crimson" />
            On this page
          </h2>
          {TocList}
          <div className="mt-4 pt-3 border-t border-border/60 text-[10px] text-muted-foreground">
            <p>
              Click any section to jump there. Links are shareable — the URL
              updates with the section anchor.
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
