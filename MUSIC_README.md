# Hướng dẫn thêm nhạc nền

## Vấn đề hiện tại
File `public/nhac.mp3` hiện tại chỉ là placeholder (36 bytes), không phải file nhạc thật.

## Cách fix

### 1. Tìm file nhạc MP3 bạn muốn dùng
- File nhạc cần định dạng `.mp3`
- Kích thước tốt nhất: 2-5MB
- Độ dài: 2-3 phút (sẽ loop lại)

### 2. Thay thế file
```bash
# Xóa file placeholder cũ
rm /Users/khumlong/thiepcuoionline/public/nhac.mp3

# Copy file nhạc thật vào
cp /path/to/your/music.mp3 /Users/khumlong/thiepcuoionline/public/nhac.mp3
```

### 3. Test local
```bash
npm run dev
# Mở http://localhost:3000
# Click "Mở thiệp" → nhạc sẽ tự động phát
```

### 4. Deploy
```bash
git add public/nhac.mp3
git commit -m "Add real background music"
git push
```

## File nhạc đề xuất
- Nhạc không lời, nhẹ nhàng
- Piano hoặc acoustic
- Tránh nhạc quá sôi động
- Ví dụ: "A Thousand Years", "Perfect", "All of Me" (instrumental version)
