'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import EventCard from './EventCard';

interface EventsSectionProps {
  groomCeremony: {
    title: string;
    venue: string;
    address: string;
    time: string;
    date: string;
    mapsUrl?: string;
    embedUrl?: string;
  };
  brideCeremony: {
    title: string;
    venue: string;
    address: string;
    time: string;
    date: string;
    lunarDate?: string;
    mapsUrl?: string;
    embedUrl?: string;
  };
  wedding: {
    dayOfWeek: string;
    lunarDate: string;
  };
}

export default function EventsSection({ groomCeremony, brideCeremony, wedding }: EventsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="w-full py-6 px-6 flex flex-col justify-center">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-script text-3xl text-[#9b7b5b] mb-2">Thời Gian & Địa Điểm</h2>
          <p className="text-[#9b7b5b]/70 text-sm tracking-wider uppercase">Chúng tôi hân hạnh mời bạn</p>
        </motion.div>

        {/* Events */}
        <div className="space-y-5">
          <EventCard
            title={groomCeremony.title}
            venue={groomCeremony.venue}
            address={groomCeremony.address}
            time={groomCeremony.time}
            date={groomCeremony.date}
            dayOfWeek={wedding.dayOfWeek}
            lunarDate={wedding.lunarDate}
            side="groom"
            mapsUrl={groomCeremony.mapsUrl}
            embedUrl={groomCeremony.embedUrl}
          />
          
          <EventCard
            title={brideCeremony.title}
            venue={brideCeremony.venue}
            address={brideCeremony.address}
            time={brideCeremony.time}
            date={brideCeremony.date}
            dayOfWeek="Thứ Năm"
            lunarDate={brideCeremony.lunarDate || wedding.lunarDate}
            side="bride"
            mapsUrl={brideCeremony.mapsUrl}
            embedUrl={brideCeremony.embedUrl}
          />
        </div>
      </div>
    </section>
  );
}
