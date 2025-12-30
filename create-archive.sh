#!/bin/bash

echo "📦 Creating clean archive for deployment..."

# Create archive name with timestamp
ARCHIVE_NAME="thiepcuoionline_$(date +%Y%m%d_%H%M%S).tar.gz"

# Create tar excluding heavy folders
tar -czf "$ARCHIVE_NAME" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='out' \
  --exclude='.git' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='public/images_backup_*' \
  .

echo "✅ Archive created: $ARCHIVE_NAME"
ls -lh "$ARCHIVE_NAME"
echo ""
echo "📊 Archive size:"
du -sh "$ARCHIVE_NAME"
