"use client";

import * as React from "react";
import Link from "next/link";
import type { BodyBlock } from "@/data/news";

/**
 * Generate a stable, URL-safe ID from heading text.
 * Used for anchor links in the Table of Contents and #fragment deep-links.
 * Example: "Scandal Resolution and Career Resilience" → "scandal-resolution-and-career-resilience"
 */
export function headingToId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/**
 * Extract the list of H2 headings from a BodyBlock array.
 * Used to build the Table of Contents.
 */
export function extractH2Headings(blocks: BodyBlock[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ id: headingToId(b.text), text: b.text }));
}

/**
 * Parse a text string that may contain markdown-style links `[text](url)`
 * and return an array of React nodes (strings + <a>/<Link> elements).
 *
 * - Internal links (URLs starting with `/article/`) → Next.js <Link>
 * - External links → <a> with target=_blank rel="nofollow noopener noreferrer"
 */
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderInlineLinks(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    // Push the preceding plain text
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, url] = match;
    const isInternal = url.startsWith("/article/") || url.startsWith("/");
    if (isInternal) {
      nodes.push(
        <Link
          key={`l-${key++}`}
          href={url}
          className="text-crimson underline decoration-crimson/40 underline-offset-2 hover:decoration-crimson font-medium"
        >
          {linkText}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`l-${key++}`}
          href={url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-crimson underline decoration-crimson/40 underline-offset-2 hover:decoration-crimson font-medium"
        >
          {linkText}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  // Push the trailing plain text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

/**
 * Render a list of BodyBlock elements with proper HTML semantics for SEO.
 * - H1 is the article title (rendered separately in ArticleView)
 * - H2 / H3 / P / UL / BLOCKQUOTE all rendered here
 */
export function renderBodyBlocks(blocks: BodyBlock[]): React.ReactNode {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "h2": {
        const id = headingToId(block.text);
        return (
          <h2
            key={i}
            id={id}
            className="mt-8 mb-3 text-xl sm:text-2xl font-black tracking-tight text-foreground scroll-mt-24"
          >
            {renderInlineLinks(block.text)}
          </h2>
        );
      }
      case "h3": {
        const id = headingToId(block.text);
        return (
          <h3
            key={i}
            id={id}
            className="mt-6 mb-2 text-lg sm:text-xl font-bold tracking-tight text-foreground/90 scroll-mt-24"
          >
            {renderInlineLinks(block.text)}
          </h3>
        );
      }
      case "p":
        return (
          <p
            key={i}
            className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/85"
          >
            {renderInlineLinks(block.text)}
          </p>
        );
      case "quote":
        return (
          <blockquote
            key={i}
            className="my-6 border-l-4 border-crimson pl-4 italic text-foreground/80 text-base sm:text-lg"
          >
            “{renderInlineLinks(block.text)}”
            {block.cite && (
              <cite className="block mt-2 not-italic text-sm text-muted-foreground">
                — {block.cite}
              </cite>
            )}
          </blockquote>
        );
      case "ul":
        return (
          <ul
            key={i}
            className="my-4 ml-5 list-disc space-y-1.5 text-base sm:text-lg leading-relaxed text-foreground/85 marker:text-crimson"
          >
            {block.items.map((item, j) => (
              <li key={j}>{renderInlineLinks(item)}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}
