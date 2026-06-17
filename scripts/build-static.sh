#!/usr/bin/env bash
# Build K-Scoop as a static export for GitHub Pages / Cloudflare Pages.
#
# This script:
#   1. Temporarily moves the dynamic /api/refresh route out of the way
#      (it can't run on a static host anyway)
#   2. Builds the static export with Next.js `output: "export"`
#   3. Restores the route file
#   4. Verifies the out/ folder was created
#
# Usage:
#   STATIC_SITE_URL="https://YOUR-USERNAME.github.io/k-scoop" \
#   STATIC_BASE_PATH="/k-scoop" \
#   bash scripts/build-static.sh
#
# If you skip the env vars, defaults are used (edit them after building).

set -e

cd "$(dirname "$0")/.."

SITE_URL="${STATIC_SITE_URL:-https://YOUR-USERNAME.github.io/k-scoop}"
BASE_PATH="${STATIC_BASE_PATH:-/k-scoop}"

echo "🎬 Building K-Scoop static export"
echo "   Site URL:  $SITE_URL"
echo "   Base path: $BASE_PATH"
echo ""

# Step 1: Temporarily move all API route files out of the way
# (API routes can't run on a static host — they need a Node server)
ROUTES_TO_MOVE=(
  "src/app/api/route.ts"
  "src/app/api/news/route.ts"
  "src/app/api/refresh/route.ts"
)
MOVED_FILES=()
for route in "${ROUTES_TO_MOVE[@]}"; do
  if [ -f "$route" ]; then
    echo "📦 Moving $route out of the way (static export doesn't support API routes)..."
    mv "$route" "$route.bak"
    MOVED_FILES+=("$route")
  fi
done

# Cleanup function — restores moved files even on error
cleanup() {
  for route in "${MOVED_FILES[@]}"; do
    if [ -f "$route.bak" ] && [ ! -f "$route" ]; then
      mv "$route.bak" "$route"
    fi
  done
}
trap cleanup EXIT

# Step 2: Build
echo "🔨 Building..."
NEXT_PUBLIC_STATIC_EXPORT=1 \
NEXT_PUBLIC_SITE_URL="$SITE_URL" \
NEXT_PUBLIC_BASE_PATH="$BASE_PATH" \
bun run build 2>&1 | tail -30

# Step 3: Build output verified below — moved files are restored by the trap

# Step 4: Verify output
echo ""
if [ -d "out" ]; then
  echo "✅ Static export built successfully!"
  echo ""
  echo "📁 Output folder: $(pwd)/out"
  echo "   $(find out -type f | wc -l) files generated"
  echo ""
  echo "📋 Next steps:"
  echo "   1. Zip the out/ folder"
  echo "   2. Drag-and-drop the contents into your GitHub repo"
  echo "      (or use the gh-pages branch)"
  echo "   3. Enable GitHub Pages: Repo → Settings → Pages → gh-pages branch"
  echo ""
  echo "🔍 Verify these key files exist:"
  for f in index.html article/kim-soo-hyun-returns-to-work-with-fashion-brand-tie-up-after-dating-controversy/index.html sitemap.xml robots.txt; do
    if [ -f "out/$f" ]; then
      echo "   ✅ $f"
    else
      echo "   ❌ $f (missing!)"
    fi
  done
else
  echo "❌ Build failed — out/ folder not created"
  exit 1
fi
