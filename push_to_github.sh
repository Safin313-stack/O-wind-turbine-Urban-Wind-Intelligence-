#!/usr/bin/env bash
set -e

echo "==========================================================="
echo "  O-WIND AI: Pushing repository to GitHub"
echo "  Remote: https://github.com/Safin313-stack/O-wind-turbine-Urban-Wind-Intelligence-.git"
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
echo "If prompted, enter:"
echo "  Username: Safin313-stack"
echo "  Password: <Your GitHub Personal Access Token (PAT)>"
echo ""

git push -u origin main
