"use client";

import * as React from "react";

/**
 * Reading progress bar — a thin gradient bar fixed at the very top of the
 * viewport that fills as the user scrolls through the article.
 *
 * - Uses requestAnimationFrame for smooth, performant updates
 * - Hidden until the user scrolls past the hero image (~150px)
 * - gradient-rose-gold fills left-to-right based on scroll percentage
 * - Only rendered on article pages (parent controls mount/unmount)
 */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      // Show the bar once the user scrolls past the hero image
      setVisible(scrollTop > 150);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[60] h-1 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div
        className="h-full gradient-rose-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
