import type { NextConfig } from "next";

/**
 * Next.js config for K-Scoop.
 *
 * Two build modes:
 *
 * 1. STATIC EXPORT (for GitHub Pages / Cloudflare Pages / any static host):
 *      NEXT_PUBLIC_STATIC_EXPORT=1 bun run build
 *    Produces an `out/` folder you can drag-and-drop into GitHub Pages.
 *    The /api/refresh endpoint won't work in this mode (static hosts have no
 *    server) — the refresh button will show a friendly error. Use the daily
 *    GitHub Action for content refreshes instead.
 *
 * 2. STANDALONE (default, for Node.js servers / Vercel / Docker):
 *      bun run build
 *    Produces a `.next/standalone/` server bundle. The /api/refresh endpoint
 *    works in this mode.
 *
 * Set NEXT_PUBLIC_SITE_URL to your production domain so canonical URLs,
 * sitemap, and OG tags point to the right place. For GitHub Pages, use:
 *   NEXT_PUBLIC_SITE_URL=https://YOUR-USERNAME.github.io/k-scoop
 *
 * Set NEXT_PUBLIC_BASE_PATH to your repo name if deploying under a subpath
 * (e.g. GitHub Pages user repo → basePath "/k-scoop"). Defaults to "".
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-scoop.example.com";

const nextConfig: NextConfig = {
  // standalone for server deploys, export for static hosts
  output: isStaticExport ? "export" : "standalone",
  // GitHub Pages serves under /repo-name/, so we need a matching basePath
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Static hosts can't run Next's image optimizer
  images: isStaticExport ? { unoptimized: true } : undefined,
  // Add trailing slashes so /article/slug resolves to /article/slug/index.html
  // on static hosts (works without server-side routing)
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Expose env vars to the client bundle
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "1" : "0",
  },
};

export default nextConfig;
