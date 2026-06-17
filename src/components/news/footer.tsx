"use client";

import { Flame, Github, Twitter, Instagram, Youtube, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-rose-gold text-white shadow-md">
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
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
              K-Scoop aggregates the latest Korean celebrity gossip, trending news,
              and upcoming K-drama releases from across the web into one daily-updated
              feed. Built for fans, by fans. Every story links back to its original
              source — we curate, we don't copy.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Github, label: "GitHub" },
                { Icon: Rss, label: "RSS" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/60 text-muted-foreground hover:border-rose hover:text-crimson transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
              Sections
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-crimson">Gossip & Scandals</a></li>
              <li><a href="#upcoming" className="hover:text-crimson">Upcoming K-Dramas</a></li>
              <li><a href="#actors" className="hover:text-crimson">Trending Actors</a></li>
              <li><a href="#" className="hover:text-crimson">Casting News</a></li>
              <li><a href="#" className="hover:text-crimson">Netflix Slate</a></li>
              <li><a href="#" className="hover:text-crimson">Disney+ Slate</a></li>
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-3">
              Sources
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://www.soompi.com" target="_blank" rel="noopener noreferrer" className="hover:text-crimson">Soompi</a></li>
              <li><a href="https://www.koreaboo.com" target="_blank" rel="noopener noreferrer" className="hover:text-crimson">Koreaboo</a></li>
              <li><a href="https://www.allkpop.com" target="_blank" rel="noopener noreferrer" className="hover:text-crimson">allkpop</a></li>
              <li><a href="https://www.scmp.com/topics/south-korean-celebrities" target="_blank" rel="noopener noreferrer" className="hover:text-crimson">SCMP</a></li>
              <li><a href="https://www.bbc.com/news" target="_blank" rel="noopener noreferrer" className="hover:text-crimson">BBC News</a></li>
              <li><a href="https://sbsstar.net" target="_blank" rel="noopener noreferrer" className="hover:text-crimson">SBS Star</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} K-Scoop · Korean Showbiz Daily. For fan
            aggregation only — all stories belong to their original publishers.
          </div>
          <div className="flex items-center gap-3">
            <span>Built with Next.js · Deployed on GitHub Pages · DNS via Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
