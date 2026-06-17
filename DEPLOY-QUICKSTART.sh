#!/usr/bin/env bash
# K-Scoop — Quick deploy to GitHub + Cloudflare
# Run this AFTER extracting k-scoop-source.tar.gz
set -e

echo "🎬 K-Scoop — Deploy to GitHub + Cloudflare"
echo ""

# 1. Init git (if not already)
if [ ! -d .git ]; then
  git init
  git branch -M main
fi

# 2. Install deps
echo "📦 Installing dependencies..."
bun install  # or: npm install

# 3. Set your production domain (REQUIRED for SEO canonical URLs + sitemap)
echo ""
echo "⚠️  Set your production domain in .env.local before building."
echo "   Create .env.local with:"
echo "   NEXT_PUBLIC_SITE_URL=https://your-domain.com"
echo ""

# 4. Add z-ai API key (REQUIRED for live news refresh)
echo "⚠️  Add ZAI_API_KEY to your GitHub repo secrets:"
echo "   Repo → Settings → Secrets and variables → Actions → New repository secret"
echo "   Name: ZAI_API_KEY"
echo "   Value: your-z-ai-web-dev-sdk-api-key"
echo ""

# 5. Commit + push
read -p "Enter your GitHub repo URL (e.g. https://github.com/USER/k-scoop.git): " REPO_URL
if [ -z "$REPO_URL" ]; then
  echo "No repo URL provided. You can add it later with: git remote add origin <URL>"
else
  git remote remove origin 2>/dev/null || true
  git remote add origin "$REPO_URL"
fi

git add .
git commit -m "feat: K-Scoop Korean showbiz news website with SEO"

echo ""
echo "✅ Ready to push. Run:"
echo "   git push -u origin main"
echo ""
echo "📋 Next steps:"
echo "   1. Push to GitHub"
echo "   2. Repo → Settings → Pages → Source: Deploy from branch → gh-pages"
echo "   3. Add ZAI_API_KEY secret (see above)"
echo "   4. Trigger the 'Daily Refresh & Deploy' workflow manually (Actions tab)"
echo "   5. In Cloudflare: add CNAME record pointing your subdomain to <USER>.github.io"
echo "   6. Create public/CNAME with your custom domain"
echo ""
echo "📖 Full instructions: docs/DEPLOYMENT.md"
