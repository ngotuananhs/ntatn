'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningScreenProps {
  groomName: string;
  brideName: string;
  date: string;
  lunarDate?: string;
  onOpen: () => void;
}

// Floating hearts for opening screen - giảm số lượng
function FloatingHeartsOpening() {
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 14 + Math.random() * 12,
    isRed: i % 2 === 0
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{ y: '100vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{ 
            y: '-20vh', 
            opacity: [0, 0.7, 0.7, 0] 
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Heart 
            size={heart.size} 
            className={heart.isRed ? "text-red-500 fill-red-400" : "text-pink-400 fill-pink-300"}
            style={{ opacity: 0.6 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function OpeningScreen({ groomName, brideName, date, lunarDate, onOpen }: OpeningScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleOpen = () => {
    setIsVisible(false);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #faf8f5 0%, #f5ebe0 50%, #faf8f5 100%)'
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(201,169,98,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(201,169,98,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(201,169,98,0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Floating hearts */}
          <FloatingHeartsOpening />

          {/* Decorative corners with animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-[#c9a962]/60" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-[#c9a962]/60" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-[#c9a962]/60" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-[#c9a962]/60" 
          />

          <div className="text-center px-8 relative z-10">
            {/* Wedding Invitation Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="text-[#c41e3a] tracking-[0.4em] uppercase text-xs font-elegant">
                ✦ Wedding Invitation ✦
              </span>
            </motion.div>

            {/* Double Happiness Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <motion.span 
                className="text-5xl text-[#c41e3a]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                囍
              </motion.span>
            </motion.div>

            {/* Couple Names with elegant animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <motion.h1 
                className="font-script text-5xl sm:text-6xl text-[#c41e3a] mb-3"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(201,169,98,0)',
                    '0 0 20px rgba(196,30,58,0.3)',
                    '0 0 10px rgba(196,30,58,0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {groomName}
              </motion.h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <motion.div 
                  className="w-16 h-px bg-linear-to-r from-transparent to-[#c41e3a]"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                </motion.div>
                <motion.div 
                  className="w-16 h-px bg-linear-to-l from-transparent to-[#c41e3a]"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
              </div>
              <motion.h1 
                className="font-script text-5xl sm:text-6xl text-[#c41e3a]"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(196,30,58,0)',
                    '0 0 20px rgba(196,30,58,0.3)',
                    '0 0 10px rgba(196,30,58,0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                {brideName}
              </motion.h1>
            </motion.div>

            {/* Date with decorative frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10"
            >
              <div className="inline-block relative">
                <div className="absolute -top-2 -left-4 w-3 h-3 border-l border-t border-[#c41e3a]" />
                <div className="absolute -top-2 -right-4 w-3 h-3 border-r border-t border-[#c41e3a]" />
                <div className="absolute -bottom-2 -left-4 w-3 h-3 border-l border-b border-[#c41e3a]" />
                <div className="absolute -bottom-2 -right-4 w-3 h-3 border-r border-b border-[#c41e3a]" />
                <p className="text-[#c41e3a]/80 font-elegant text-lg px-6 py-2">
                  {date}
                </p>
                {lunarDate && (
                  <p className="text-[#9b7b5b] font-body text-sm">
                    (Âm lịch: {lunarDate})
                  </p>
                )}
              </div>
            </motion.div>

            {/* Open Button with glow effect */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 border-2 border-[#c41e3a] text-[#c41e3a] rounded-full font-elegant tracking-wider overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-[#c41e3a]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Mở Thiệp Cưới
                <Heart className="w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
