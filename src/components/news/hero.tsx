"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNewsById } from "@/data/news";

interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  link: string;
}

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (d: number) =>
    setIdx((p) => (p + d + slides.length) % slides.length);

  const slide = slides[idx];
  if (!slide) return null;

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* Main feature */}
          <div className="relative aspect-[16/11] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-img-zoom h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-crimson px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <Flame className="h-3 w-3" /> {slide.kicker}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/80">
                  <Clock className="h-3 w-3" /> Trending now
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight max-w-2xl drop-shadow-md">
                {slide.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/85 max-w-xl line-clamp-2 sm:line-clamp-3">
                {slide.body}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-black hover:bg-white/90"
                >
                  <Link
                    href={
                      getNewsById(slide.link)?.slug
                        ? `/article/${getNewsById(slide.link)!.slug}`
                        : "/"
                    }
                  >
                    Read story
                  </Link>
                </Button>
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 sm:grid"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 sm:grid"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Side list — next slides */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Top Stories
              </h3>
              <span className="text-xs text-muted-foreground">
                {idx + 1} / {slides.length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIdx(i)}
                  className={`group flex items-center gap-3 rounded-xl border p-2 text-left transition ${
                    i === idx
                      ? "border-crimson bg-accent/60"
                      : "border-border/60 hover:border-rose/60 hover:bg-accent/40"
                  }`}
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-crimson font-bold">
                      {s.kicker}
                    </div>
                    <div className="line-clamp-2 text-sm font-semibold leading-snug">
                      {s.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-7 bg-crimson" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
