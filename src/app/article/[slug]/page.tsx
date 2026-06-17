import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  NEWS,
  getNewsBySlug,
  getRelatedNews,
  type NewsItem,
} from "@/data/news";
import { ArticleViewClient } from "@/components/news/article-view-client";

// ---------------------------------------------------------------------------
// Static generation — pre-render every article at build time so the static
// export (/article/<slug>/index.html) ships to GitHub Pages and crawlers see
// fully server-rendered HTML with proper title / meta / JSON-LD.
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return NEWS.map((item) => ({ slug: item.slug }));
}

// ---------------------------------------------------------------------------
// Per-article SEO metadata: title, description, canonical, Open Graph,
// Twitter card, keywords. This is what makes each article rank on Google.
// ---------------------------------------------------------------------------
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-scoop.example.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    return {
      title: "Article not found",
      description: "The article you were looking for could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/article/${item.slug}`;
  const description =
    item.summary.length > 155
      ? item.summary.slice(0, 152).trimEnd() + "…"
      : item.summary;

  const title = `${item.title} | K-Scoop Korean Showbiz News`;

  return {
    title,
    description,
    keywords: [
      "Korean showbiz",
      "K-drama",
      "Korean celebrity",
      item.category,
      ...item.tags,
    ],
    authors: [{ name: "K-Scoop Editorial" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "K-Scoop",
      publishedTime: item.date,
      authors: ["K-Scoop Editorial"],
      tags: item.tags,
      images: [
        {
          url: item.image,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.image],
      creator: "@kscoop",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data — gives Google rich-result eligibility
// (NewsArticle + BreadcrumbList schemas).
// ---------------------------------------------------------------------------
function buildJsonLd(item: NewsItem) {
  const url = `${SITE_URL}/article/${item.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${url}#article`,
        headline: item.title,
        description: item.summary,
        image: [item.image],
        datePublished: item.date,
        dateModified: item.date,
        author: {
          "@type": "Organization",
          name: "K-Scoop Editorial",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "K-Scoop",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        articleSection: item.category,
        keywords: item.tags.join(", "),
        // Flatten the body blocks into a single text string for the
        // NewsArticle schema. This helps Google understand the article
        // content for rich results and knowledge graph.
        articleBody: item.body
          ?.map((b) => {
            if (b.type === "ul") return b.items.join(" ");
            return b.text ?? "";
          })
          .join("\n\n")
          .slice(0, 5000),
        wordCount: item.body
          ? item.body
              .map((b) =>
                b.type === "ul" ? b.items.join(" ") : b.text ?? ""
              )
              .join(" ")
              .split(/\s+/)
              .filter(Boolean).length
          : undefined,
        url,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name:
              item.category === "gossip"
                ? "Gossip"
                : item.category === "upcoming"
                ? "Upcoming Series"
                : item.category === "trending"
                ? "Trending"
                : "Casting News",
            item: `${SITE_URL}/#feed`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: url,
          },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Page render
// ---------------------------------------------------------------------------
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedNews(item, 6);
  const jsonLd = buildJsonLd(item);

  return (
    <>
      {/* JSON-LD structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleViewClient
        item={item}
        related={related}
        siteUrl={SITE_URL}
      />
    </>
  );
}
