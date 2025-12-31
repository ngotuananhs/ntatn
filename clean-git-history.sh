#!/bin/bash

echo "🧹 Cleaning large files from git history..."

# Remove large old JPG files from entire git history
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch \
"public/images/20x30 gỗ cán mờ.jpg" \
"public/images/20x30 gỗ cán mờ (3).jpg" \
public/images/BBB01278.JPG \
public/images/BBB01565.jpg \
public/images/BBB01717.jpg \
public/images/BBB01883.jpg \
public/images/BBB01895.jpg \
public/images/BBB01987.jpg \
public/images/BBB02110.jpg \
public/images/BBB02315.jpg \
public/images/BBB02481-Recovered.jpg \
public/images/P1181964.jpg \
src/image/*.jpg \
src/image/*.JPG \
src/image/*.png' \
--prune-empty --tag-name-filter cat -- --all

echo "🗑️  Cleaning up git refs..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "📊 New repository size:"
git count-objects -vH

echo ""
echo "✅ Done! To push cleaned history to GitHub, run:"
echo "   git push origin main --force"
