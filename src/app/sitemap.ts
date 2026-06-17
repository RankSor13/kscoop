import type { MetadataRoute } from "next";
import { NEWS } from "@/data/news";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-scoop.example.com";

/**
 * Auto-generated sitemap.xml — lists the homepage plus every article page.
 * Served at /sitemap.xml by Next.js. Submit this to Google Search Console
 * for faster indexing.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const articles: MetadataRoute.Sitemap = NEWS.map((item) => ({
    url: `${SITE_URL}/article/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...articles,
  ];
}
