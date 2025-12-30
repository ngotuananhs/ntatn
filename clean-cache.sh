#!/bin/bash

echo "🧹 Cleaning project cache and build files..."

# Remove build folders
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Remove TypeScript cache
rm -rf .tsbuildinfo

# Remove npm/yarn cache
rm -rf .npm
rm -rf .yarn

# Remove OS files
find . -name ".DS_Store" -type f -delete

# Remove image backups
rm -rf public/images_backup_*

# Remove log files
rm -rf *.log
rm -rf npm-debug.log*
rm -rf yarn-debug.log*
rm -rf yarn-error.log*

echo "✅ Done! Project cleaned."
echo ""
echo "📊 Size after cleaning:"
du -sh .
echo ""
echo "💡 To restore node_modules, run: npm install"
