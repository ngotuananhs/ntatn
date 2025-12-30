#!/bin/bash

# Script để compress ảnh trong public/images

echo "🖼️  Compressing images..."

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick chưa cài đặt. Cài đặt bằng: brew install imagemagick"
    exit 1
fi

# Backup folder
BACKUP_DIR="public/images_backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 Tạo backup tại: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r public/images/* "$BACKUP_DIR/"

# Compress tất cả JPG/JPEG
echo "🔧 Đang compress ảnh JPG/JPEG..."
find public/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read file; do
    size_before=$(du -h "$file" | cut -f1)
    echo "  Compressing: $(basename "$file") - Trước: $size_before"
    
    # Resize về max 1920px và compress quality 75%
    convert "$file" -resize "1920x1920>" -quality 75 -strip "$file"
    
    size_after=$(du -h "$file" | cut -f1)
    echo "  ✅ Sau: $size_after"
done

# Compress PNG
echo "🔧 Đang compress ảnh PNG..."
find public/images -type f -iname "*.png" | while read file; do
    if [[ $(basename "$file") != "qr"* ]]; then  # Skip QR codes
        size_before=$(du -h "$file" | cut -f1)
        echo "  Compressing: $(basename "$file") - Trước: $size_before"
        
        # Resize và compress
        convert "$file" -resize "1920x1920>" -quality 85 -strip "$file"
        
        size_after=$(du -h "$file" | cut -f1)
        echo "  ✅ Sau: $size_after"
    fi
done

echo "✅ Hoàn thành! Backup tại: $BACKUP_DIR"
echo "📊 Kích thước thư mục images:"
du -sh public/images
