"use client";

import { Flame } from "lucide-react";

interface TickerProps {
  items: { id: string; title: string }[];
}

export function Ticker({ items }: TickerProps) {
  // Duplicate the items so the marquee can loop seamlessly
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-crimson text-primary-foreground">
      <div className="flex items-center">
        <div className="z-10 flex items-center gap-1.5 bg-black/30 px-3 py-2 text-[11px] font-bold uppercase tracking-wider shrink-0">
          <Flame className="h-3.5 w-3.5" />
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track flex whitespace-nowrap py-2">
            {loop.map((it, i) => (
              <span
                key={`${it.id}-${i}`}
                className="mx-6 inline-flex items-center gap-2 text-xs font-medium"
              >
                <span className="h-1 w-1 rounded-full bg-white/70" />
                {it.title}
              </span>
            ))}
          </div>
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-crimson to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-crimson to-transparent" />
        </div>
      </div>
    </div>
  );
}
