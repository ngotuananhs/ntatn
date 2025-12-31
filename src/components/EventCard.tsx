'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Clock, Calendar, Navigation, X } from 'lucide-react';

interface EventCardProps {
  title: string;
  venue: string;
  address: string;
  time: string;
  date: string;
  dayOfWeek: string;
  lunarDate: string;
  side: 'groom' | 'bride';
  mapsUrl?: string;
  embedUrl?: string;
}

export default function EventCard({ title, venue, address, time, date, dayOfWeek, lunarDate, side, mapsUrl, embedUrl }: EventCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showMap, setShowMap] = useState(false);

  // Convert Google Maps share link to embed URL
  const getEmbedUrl = (shareUrl: string) => {
    // If embedUrl is provided, use it directly
    if (embedUrl) {
      return embedUrl;
    }
    // Extract place ID or coordinates from share link
    const match = shareUrl.match(/maps\/place\/([^\/]+)/);
    if (match) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(match[1])}`;
    }
    // Fallback: use search mode
    return `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      <div className="glass rounded-2xl p-5 border border-[#c9a962]/20 shadow-lg">
        {/* Card header with decorative corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#c9a962]/40" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[#c9a962]/40" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#c9a962]/40" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#c9a962]/40" />

        {/* Side label */}
        <div className="text-center mb-3">
          <span className="inline-block px-4 py-1 bg-[#c9a962]/10 rounded-full text-xs font-elegant text-[#9b7b5b] tracking-wider uppercase">
            {side === 'groom' ? 'Nhà Trai' : 'Địa điểm tổ chức'}
          </span>
        </div>

        {/* Title */}
  <h3 className="font-script text-[26px] text-[#9b7b5b] text-center mb-3">{title}</h3>

        {/* Venue */}
        <div className="flex items-start gap-3 mb-3">
          <MapPin className="w-5 h-5 text-[#c9a962] shrink-0 mt-0.5" />
          <div>
            <p className="font-elegant font-semibold text-[#3d3d3d]">{venue}</p>
            <p className="text-sm text-[#9b7b5b]">{address}</p>
          </div>
        </div>

        {/* Time and Date */}
  <div className="grid grid-cols-2 gap-3 mt-5">
          {time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c9a962]" />
              <div>
                <p className="text-xs text-[#9b7b5b] uppercase tracking-wider">Vào lúc</p>
                <p className="font-elegant font-semibold text-[#3d3d3d]">{time}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#c9a962]" />
            <div>
              <p className="text-xs text-[#9b7b5b] uppercase tracking-wider">{dayOfWeek}</p>
              <p className="font-elegant font-semibold text-[#3d3d3d]">{date}</p>
            </div>
          </div>
        </div>

        {/* Lunar date */}
        <div className="mt-3 pt-3 border-t border-[#c9a962]/20 text-center">
          <p className="text-sm text-[#9b7b5b] italic">Tức ngày {lunarDate}</p>
        </div>

        {/* Google Maps button */}
        {mapsUrl && (
          <motion.button
            onClick={() => setShowMap(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-[#c41e3a] hover:bg-[#a01830] text-white rounded-xl transition-colors shadow-md"
          >
            <Navigation className="w-4 h-4" />
            <span className="font-elegant text-sm">Xem bản đồ</span>
          </motion.button>
        )}
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && mapsUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setShowMap(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowMap(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#3d3d3d]" />
              </button>

              {/* Map title */}
              <div className="bg-[#c41e3a] text-white p-4">
                <h3 className="font-elegant text-lg">{venue}</h3>
                <p className="text-sm opacity-90">{address}</p>
              </div>

              {/* Google Maps iframe */}
              <iframe
                src={getEmbedUrl(mapsUrl)}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />

              {/* Open in Google Maps link */}
              <div className="p-4 bg-[#f8f5f0]">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-[#c41e3a] hover:bg-[#a01830] text-white text-center rounded-xl font-elegant transition-colors"
                >
                  Mở trong Google Maps
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
