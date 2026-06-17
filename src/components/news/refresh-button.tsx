"use client";

import * as React from "react";
import { RefreshCw, CheckCircle2, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LiveNewsItem {
  id: string;
  title: string;
  summary: string;
  body?: unknown[];
  takeaways?: string[];
  category: string;
  source: string;
  sourceUrl: string;
  date: string;
}

interface RefreshButtonProps {
  onRefresh: (items: LiveNewsItem[]) => void;
}

/**
 * Refresh button.
 *
 * - On a Node.js server deployment (Vercel, standalone, etc.): calls
 *   POST /api/refresh which fires the z-ai web search + LLM body generation.
 * - On a static deployment (GitHub Pages, Cloudflare Pages static): the
 *   /api/refresh endpoint doesn't exist, so we show a friendly info toast
 *   explaining that content is refreshed daily by the GitHub Action instead.
 */
export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [lastRefresh, setLastRefresh] = React.useState<string | null>(null);

  // Detect static export mode (set at build time via NEXT_PUBLIC_STATIC_EXPORT)
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

  const handleRefresh = async () => {
    // Static export: no /api endpoint available
    if (isStaticExport) {
      toast.info("Daily auto-refresh is enabled", {
        description:
          "This static deployment refreshes its content automatically every morning via GitHub Actions. The on-demand button requires a server backend.",
        duration: 6000,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Refresh failed");
      onRefresh(data.items);
      setLastRefresh(new Date().toLocaleTimeString());
      toast.success(`Fetched ${data.items.length} fresh headlines`, {
        description: "Live results merged to the top of the feed.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error("Refresh unavailable", {
        description:
          "Live on-demand refresh needs a server backend. The site's curated content is refreshed daily via GitHub Actions.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        onClick={handleRefresh}
        disabled={loading}
        className="bg-gradient-to-r from-crimson to-rose text-primary-foreground hover:opacity-90 shadow-md"
      >
        {loading ? (
          <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
        ) : isStaticExport ? (
          <Info className="mr-1.5 h-3.5 w-3.5" />
        ) : (
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
        )}
        {loading
          ? "Fetching live news…"
          : isStaticExport
          ? "Daily auto-refresh enabled"
          : "Refresh with live web news"}
      </Button>
      {lastRefresh && !loading && (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          Last refreshed at {lastRefresh}
        </span>
      )}
    </div>
  );
}
