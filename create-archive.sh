#!/bin/bash

echo "📦 Creating backup archive..."

# Create archive name with timestamp
ARCHIVE_NAME="thiepcuoionline_backup_$(date +%Y%m%d_%H%M%S).zip"

# Create zip excluding heavy folders and build artifacts
zip -r "$ARCHIVE_NAME" . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x "out/*" \
  -x ".git/*" \
  -x "*.log" \
  -x ".DS_Store" \
  -x "*.tar.gz" \
  -x "*.zip" \
  -x "public/images_backup_*/*"

echo "✅ Backup created: $ARCHIVE_NAME"
ls -lh "$ARCHIVE_NAME"
echo ""
echo "📊 Archive size:"
du -sh "$ARCHIVE_NAME"
echo ""
echo "📁 To extract: unzip $ARCHIVE_NAME"
