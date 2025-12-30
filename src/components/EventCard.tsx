'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Calendar, Navigation } from 'lucide-react';

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
}

export default function EventCard({ title, venue, address, time, date, dayOfWeek, lunarDate, side, mapsUrl }: EventCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleOpenMaps = () => {
    if (mapsUrl) {
      window.open(mapsUrl, '_blank');
    }
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
            onClick={handleOpenMaps}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-[#c41e3a] hover:bg-[#a01830] text-white rounded-xl transition-colors shadow-md"
          >
            <Navigation className="w-4 h-4" />
            <span className="font-elegant text-sm">Xem bản đồ</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
