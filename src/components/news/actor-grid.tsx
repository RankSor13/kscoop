"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Heart } from "lucide-react";
import type { ActorProfile } from "@/data/news";

export function ActorGrid({ actors }: { actors: ActorProfile[] }) {
  return (
    <section id="actors" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-crimson mb-1">
            Spotlight
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Trending Actors & Actresses
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The faces driving this week's headlines — from breakout stars to veteran leads.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {actors.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="card-hover group relative overflow-hidden rounded-2xl border border-border/60 bg-card"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={a.image}
                alt={a.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Followers */}
              <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                <Heart className="h-2.5 w-2.5 text-rose" /> {a.followers}
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="text-[10px] uppercase tracking-wider text-rose font-bold">
                  {a.role}
                </div>
                <div className="text-base font-bold leading-tight drop-shadow">
                  {a.name}
                </div>
              </div>
            </div>

            <div className="p-3">
              <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
                {a.blurb}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {a.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
