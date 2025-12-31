'use client';

import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  groomName: string;
  brideName: string;
}

export default function GallerySection({ groomName, brideName }: GallerySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sắp xếp ảnh logic: ảnh đẹp nhất đầu, xen kẽ portrait/landscape
  const galleryImages = [
    // Ảnh nổi bật - ảnh cặp đôi chính
    { id: 1, src: '/images/20x30 gỗ cán mờ (2).webp', alt: 'Ảnh cưới chính', span: 'col-span-2', aspect: 'aspect-[16/10]' },
    // Hàng 2: 2 ảnh vuông
    { id: 2, src: '/images/IMG_7438.webp', alt: 'Khoảnh khắc lãng mạn', span: '', aspect: 'aspect-square' },
    { id: 3, src: '/images/IMG_7447.webp', alt: 'Nụ cười hạnh phúc', span: '', aspect: 'aspect-square' },
    // Ảnh dọc nổi bật
    { id: 4, src: '/images/P8964.webp', alt: 'Ánh mắt yêu thương', span: 'row-span-2', aspect: 'aspect-[3/4]' },
    { id: 5, src: '/images/IMG_7500.webp', alt: 'Bên nhau trọn đời', span: '', aspect: 'aspect-square' },
    { id: 6, src: '/images/IMG_7507.webp', alt: 'Kỷ niệm ngọt ngào', span: '', aspect: 'aspect-square' },
    // Ảnh rộng
    { id: 7, src: '/images/BBB02366.webp', alt: 'Tình yêu vĩnh cửu', span: 'col-span-2', aspect: 'aspect-[16/10]' },
    // Hàng cuối
    { id: 8, src: '/images/IMG_7839.webp', alt: 'Ngày trọng đại', span: '', aspect: 'aspect-square' },
    { id: 9, src: '/images/BBB0537.webp', alt: 'Hạnh phúc viên mãn', span: '', aspect: 'aspect-square' },
    { id: 10, src: '/images/P8226.webp', alt: 'Cùng nhau đi qua', span: '', aspect: 'aspect-square' },
    { id: 11, src: '/images/P8753.webp', alt: 'Giây phút thiêng liêng', span: '', aspect: 'aspect-square' },
  ];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const goNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  const goPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <>
      <section ref={ref} className="w-full py-8 px-6 bg-white/30 flex flex-col justify-center">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <Camera className="w-8 h-8 mx-auto text-[#c9a962] mb-4" />
            <h2 className="font-script text-3xl text-[#9b7b5b] mb-2">Khoảnh Khắc</h2>
            <p className="text-[#9b7b5b]/70 text-sm">Những kỷ niệm đẹp của chúng tôi</p>
          </motion.div>

          {/* Couple profiles */}
          <div className="flex justify-center items-center gap-8 mb-10">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 rounded-full border-2 border-[#c9a962] bg-[#f8f5f0] mb-3 mx-auto overflow-hidden">
                <Image
                  src="/images/chure.png"
                  alt={`Ảnh đại diện ${groomName}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="font-script text-xl text-[#9b7b5b]">{groomName}</h3>
              <p className="text-xs text-[#9b7b5b]/60 uppercase tracking-wider">Chú rể</p>
            </motion.div>

            {/* Heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Heart className="w-8 h-8 text-[#e8c4c4] fill-[#e8c4c4] animate-heartbeat" />
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 rounded-full border-2 border-[#c9a962] bg-[#f8f5f0] mb-3 mx-auto overflow-hidden">
                <Image
                  src="/images/codau.png"
                  alt={`Ảnh đại diện ${brideName}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="font-script text-xl text-[#9b7b5b]">{brideName}</h3>
              <p className="text-xs text-[#9b7b5b]/60 uppercase tracking-wider">Cô dâu</p>
            </motion.div>
          </div>

          {/* Gallery grid - Masonry style */}
          <div className="grid grid-cols-2 gap-2">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className={`relative rounded-xl overflow-hidden border border-[#c9a962]/20 cursor-pointer group ${img.span} ${img.aspect}`}
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={img.span.includes('col-span-2') ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  quality={75}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q=="
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white/90 text-xs font-elegant tracking-wide opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Xem ảnh
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 md:left-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 md:right-4 z-50 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                sizes="90vw"
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white/90 font-elegant text-sm">
                {galleryImages[selectedImage].alt}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
