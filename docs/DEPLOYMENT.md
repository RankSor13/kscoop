# K-Scoop — Korean Showbiz News Website

A daily-updated Korean showbiz news website built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui. Aggregates celebrity gossip, trending actor/actress news, and upcoming K-drama releases across Netflix, Disney+, and Prime Video.

Live preview: `https://preview-<bot-id>.space-z.ai/`

---

## Features

- **Hero carousel** featuring top 3 trending stories of the day
- **Breaking-news ticker** scrolling hot headlines
- **Category filter**: All / Gossip / Upcoming Series / Trending / Casting
- **Live search** across titles, summaries, tags, and sources
- **Save bookmarks** — articles persisted to `localStorage` (no login required)
- **Article detail dialog** — full summary, tags, share, save, link to source
- **Trending Actors & Actresses** spotlight grid (8 profiles)
- **Upcoming K-Dramas 2026** release calendar with hype meter (12 titles)
- **Live refresh button** — hits `/api/refresh` to fetch real-time headlines via z-ai web search SDK
- **Dark / light theme** toggle (defaults to dark — showbiz magazine aesthetic)
- **Fully responsive** — mobile-first, sticky footer
- **Daily auto-update** via GitHub Action (see below)

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Theme | next-themes |
| Animation | Framer Motion |
| Icons | lucide-react |
| Live news | z-ai-web-dev-sdk (`web_search` function) |
| Images | z-ai image-search (OSS-hosted) |

---

## Local Development

```bash
# Install dependencies
bun install

# Start dev server (auto-runs on port 3000)
bun run dev

# Lint
bun run lint

# Build for production (static export)
bun run build
```

Open `http://localhost:3000` in your browser.

---

## Live News Refresh

The site ships with 18 curated articles + 12 upcoming series + 8 actor profiles baked into the static bundle.

**On-demand refresh:** Click the "Refresh with live web news" button on the homepage. This calls `POST /api/refresh`, which fires 4 parallel web searches via the z-ai SDK and merges up to 40 fresh headlines to the top of the feed.

**Daily auto-refresh:** See the GitHub Action below. It commits new search results into `src/data/news.ts` every morning, so the next static build includes fresh content.

---

## Deployment — GitHub Pages + Cloudflare DNS

### 1. Prepare the repo

```bash
git init
git add .
git commit -m "feat: K-Scoop Korean showbiz news website"
git branch -M main
git remote add origin https://github.com/<your-username>/k-scoop.git
git push -u origin main
```

### 2. Configure Next.js for static export

`next.config.ts` already includes the standalone build setup. For pure GitHub Pages (no Node server), add static export:

```ts
// next.config.ts
const nextConfig = {
  output: "export",          // static HTML export
  images: { unoptimized: true }, // OSS images don't need Next/Image optimization
  basePath: process.env.NODE_ENV === "production" ? "/k-scoop" : "", // repo name
  assetPrefix: process.env.NODE_ENV === "production" ? "/k-scoop/" : "",
};
export default nextConfig;
```

> Replace `k-scoop` with your repo name. If deploying to a custom domain or user/organization root, omit `basePath` and `assetPrefix`.

### 3. Add the GitHub Action

Already included at `.github/workflows/daily-refresh-and-deploy.yml`. It:
1. Runs daily at 08:00 UTC (configurable)
2. Fires web searches via z-ai SDK
3. Regenerates `src/data/news.ts`
4. Builds the static site
5. Pushes to the `gh-pages` branch

### 4. Enable GitHub Pages

1. Push your code to GitHub
2. Repo → **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `gh-pages` / `(root)` — **Save**
5. Wait ~2 minutes. Your site is live at `https://<your-username>.github.io/k-scoop/`

### 5. Add the z-ai SDK secret

The Action needs `ZAI_API_KEY` to call web search. Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
- Name: `ZAI_API_KEY`
- Value: your z-ai-web-dev-sdk API key

### 6. Point Cloudflare DNS at GitHub Pages

In your Cloudflare dashboard for your domain (e.g. `kscoop.example.com`):

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `kscoop` | `<your-username>.github.io` | DNS only (gray cloud) |

Then in your GitHub repo, add a `CNAME` file at the repo root containing your custom domain:

```bash
echo "kscoop.example.com" > public/CNAME
```

GitHub will automatically serve your Pages site over HTTPS at `https://kscoop.example.com`. Cloudflare's DNS-only mode is recommended so GitHub can issue the SSL cert directly. (If you want Cloudflare's proxy/CDN, set the proxy to orange-cloud and use Cloudflare's "Full (strict)" SSL mode — but you'll need to add a Cloudflare Origin Certificate to the GitHub Pages repo, which GitHub doesn't natively support, so DNS-only is simpler.)

---

## Daily Update Workflow

The `.github/workflows/daily-refresh-and-deploy.yml` Action:

1. **Cron schedule**: `0 8 * * *` (08:00 UTC daily — adjust to your timezone)
2. **Manual trigger**: also runnable via `workflow_dispatch` from the Actions tab
3. **Steps**:
   - Checks out the repo
   - Runs a Node script that calls `z-ai function -n web_search` 4 times in parallel
   - Parses and normalizes the results
   - Rewrites `src/data/news.ts` with fresh items (preserves the curated actor/series lists)
   - Runs `bun run build` to produce a static export
   - Pushes the build to the `gh-pages` branch

To change the search queries, edit the `queries` array in `.github/workflows/refresh-news.mjs`.

---

## Project Structure

```
.
├── .github/workflows/
│   └── daily-refresh-and-deploy.yml    # Daily cron + manual deploy
├── docs/
│   └── DEPLOYMENT.md                   # This file
├── public/
│   ├── CNAME                           # Custom domain (create manually)
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── news/route.ts           # GET dataset (static)
│   │   │   └── refresh/route.ts        # POST live web search
│   │   ├── globals.css                 # K-showbiz theme tokens
│   │   ├── layout.tsx                  # Root layout + ThemeProvider
│   │   └── page.tsx                    # Main page (single route)
│   ├── components/
│   │   ├── news/
│   │   │   ├── header.tsx              # Sticky header + search + nav
│   │   │   ├── hero.tsx                # Auto-rotating hero carousel
│   │   │   ├── ticker.tsx              # Breaking-news marquee
│   │   │   ├── news-card.tsx           # Article card with bookmark
│   │   │   ├── actor-grid.tsx          # Actor spotlight
│   │   │   ├── upcoming-series.tsx     # 2026 release calendar
│   │   │   ├── article-dialog.tsx      # Article detail modal
│   │   │   ├── bookmarks-sheet.tsx     # Saved articles drawer
│   │   │   ├── refresh-button.tsx      # Live web-search trigger
│   │   │   └── footer.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/                         # shadcn/ui components
│   ├── data/
│   │   └── news.ts                     # Structured dataset (regenerated daily)
│   └── lib/
│       └── utils.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## Customization

**Change the search queries** (for both live refresh and daily Action):
- Live button: edit `DEFAULT_QUERIES` in `src/app/api/refresh/route.ts`
- Daily Action: edit `queries` in `.github/workflows/refresh-news.mjs`

**Change the color palette**: edit the CSS variables in `src/app/globals.css` (`:root` and `.dark` blocks). The brand tokens are `--rose`, `--crimson`, `--gold`.

**Add a new category**: extend the `NewsCategory` type and `CATEGORIES` array in `src/components/news/header.tsx`, then add a `CATEGORY_META` entry in `src/components/news/news-card.tsx`.

**Add new actors/series**: edit the `ACTORS` and `UPCOMING_SERIES` arrays in `src/data/news.ts`.

---

## Sources

All headlines link back to the original publisher. Aggregated sources include:
- [Soompi](https://www.soompi.com)
- [Koreaboo](https://www.koreaboo.com)
- [allkpop](https://www.allkpop.com)
- [South China Morning Post](https://www.scmp.com/topics/south-korean-celebrities)
- [BBC News](https://www.bbc.com/news)
- [Forbes](https://www.forbes.com)
- [TIME](https://time.com)
- [SBS Star](https://sbsstar.net)
- [The Korea Times](https://www.koreatimes.co.kr/entertainment)
- [The Straits Times](https://www.straitstimes.com)
- [MyDramaList](https://mydramalist.com)
- [Wikipedia](https://en.wikipedia.org/wiki/2026_in_South_Korean_television)

---

## License

For fan aggregation only. All article content belongs to its original publishers. Code is MIT-licensed.
