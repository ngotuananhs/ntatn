'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { ScrollHint } from './ScrollHint';

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  date: string;
  lunarDate?: string;
  monogram: string;
}

export default function HeroSection({ groomName, brideName, date, lunarDate, monogram }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-pattern">
      {/* Animated background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-[#c9a962]/5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#e8c4c4]/10"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#f5f0e8]/50"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#f5f0e8] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-12">
        {/* Save the date with sparkle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#c9a962]" />
          <span className="text-[#9b7b5b] tracking-[0.3em] uppercase text-sm font-elegant">
            Save The Date
          </span>
          <Sparkles className="w-4 h-4 text-[#c9a962]" />
        </motion.div>

        {/* Monogram/Date Circle with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mb-10"
        >
          <motion.div 
            className="w-36 h-36 mx-auto rounded-full border-2 border-[#c9a962] flex flex-col items-center justify-center relative"
            animate={{
              boxShadow: [
                '0 0 20px rgba(201,169,98,0.2)',
                '0 0 40px rgba(201,169,98,0.4)',
                '0 0 20px rgba(201,169,98,0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-2 rounded-full border border-[#c9a962]/30" />
            <span className="text-xl text-[#9b7b5b] font-script">10</span>
            <motion.span 
              className="text-2xl text-[#c9a962] font-script tracking-wider"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {monogram}
            </motion.span>
            <span className="text-xl text-[#9b7b5b] font-script">01</span>
          </motion.div>
        </motion.div>

        {/* Wedding Title with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-script text-3xl text-[#9b7b5b] mb-2 relative inline-block">
            Lễ Thành Hôn
            <motion.span
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
          </h2>
        </motion.div>

        {/* Couple Names with elegant entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <motion.h1 
            className="font-script text-5xl sm:text-6xl md:text-7xl text-[#9b7b5b] mb-4"
            whileInView={{
              textShadow: [
                '0 0 0px rgba(201,169,98,0)',
                '0 0 30px rgba(201,169,98,0.3)',
                '0 0 0px rgba(201,169,98,0)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {groomName}
          </motion.h1>
          <div className="flex items-center justify-center gap-4 my-4">
            <motion.div 
              className="w-16 h-px bg-linear-to-r from-transparent to-[#c9a962]"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1 }}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-[#e8c4c4] fill-[#e8c4c4]" />
            </motion.div>
            <motion.div 
              className="w-16 h-px bg-linear-to-l from-transparent to-[#c9a962]"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1 }}
            />
          </div>
          <motion.h1 
            className="font-script text-5xl sm:text-6xl md:text-7xl text-[#9b7b5b]"
            whileInView={{
              textShadow: [
                '0 0 0px rgba(201,169,98,0)',
                '0 0 30px rgba(201,169,98,0.3)',
                '0 0 0px rgba(201,169,98,0)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            {brideName}
          </motion.h1>
        </motion.div>

        {/* Date with decorative border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <motion.div 
            className="inline-block border border-[#c9a962]/50 px-8 py-4 relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#c9a962]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#c9a962]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#c9a962]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#c9a962]" />
            <p className="text-[#9b7b5b] font-elegant text-xl tracking-wider">{date}</p>
            {lunarDate && (
              <p className="text-[#c41e3a]/80 font-body text-sm mt-1 tracking-wide">
                (Âm lịch: {lunarDate})
              </p>
            )}
          </motion.div>
        </motion.div>

        <ScrollHint />
      </div>
    </section>
  );
}
