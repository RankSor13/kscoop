"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, Flame, Star, Tv } from "lucide-react";
import type { UpcomingSeries } from "@/data/news";
import { Badge } from "@/components/ui/badge";

const PLATFORM_STYLES: Record<string, string> = {
  Netflix: "bg-red-600/15 text-red-600 dark:text-red-400 border-red-600/30",
  "Disney+": "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
  "Hulu / Disney+": "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
  "SBS / Netflix": "bg-red-600/15 text-red-600 dark:text-red-400 border-red-600/30",
  "ENA / Disney+":
    "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
  tvN: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
};

function platformClass(p: string): string {
  return PLATFORM_STYLES[p] ?? "bg-secondary text-secondary-foreground border-border";
}

function HypeMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Hype
      </span>
      <div className="flex h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full gradient-rose-gold"
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="text-[11px] font-bold text-crimson">{value}/10</span>
    </div>
  );
}

export function UpcomingSeriesSection({
  series,
}: {
  series: UpcomingSeries[];
}) {
  // Sort by hype desc
  const sorted = [...series].sort((a, b) => b.hype - a.hype);

  return (
    <section
      id="upcoming"
      className="relative overflow-hidden border-y border-border/60 bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-1">
              <Tv className="inline h-3.5 w-3.5 mr-1" />
              2026 Release Calendar
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Upcoming K-Dramas
            </h2>
            <p className="mt-1 text-sm text-muted-foreground max-w-xl">
              The most-anticipated Korean series premiering across Netflix, Disney+,
              Prime Video, and Korean broadcast networks in 2026 — ranked by fan hype.
            </p>
          </div>
          <Badge className="bg-crimson text-primary-foreground border-0 flex items-center gap-1">
            <Flame className="h-3 w-3" /> {series.length} titles tracked
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="card-hover group relative overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Premiere date pill */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  <Calendar className="h-3 w-3 text-gold" />
                  {s.premiere}
                </div>

                {/* Platform */}
                <div className="absolute right-3 top-3">
                  <Badge className={`${platformClass(s.platform)} border backdrop-blur`}>
                    {s.platform}
                  </Badge>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <div className="text-[10px] uppercase tracking-wider text-gold font-bold">
                    {s.genre}
                  </div>
                  <h3 className="text-lg font-black leading-tight drop-shadow">
                    {s.title}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Cast:</span>{" "}
                  {s.cast}
                </div>
                <HypeMeter value={s.hype} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
