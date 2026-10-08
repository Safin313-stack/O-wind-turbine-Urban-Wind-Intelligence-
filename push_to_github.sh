#!/usr/bin/env bash
set -e

echo "==========================================================="
echo "  O-WIND AI: Pushing repository to GitHub via SSH"
echo "  Remote: git@github.com:Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-.git"
echo "  Branch: main"
echo "==========================================================="

cd "$(dirname "$0")"

# Ensure all changes are staged and committed
if [ -n "$(git status --porcelain)" ]; then
  echo "Staging remaining modified files..."
  git add .
  git commit -m "chore: responsive styling and UI polish"
fi

echo ""
echo "Attempting git push to origin main..."
git push -u origin main
