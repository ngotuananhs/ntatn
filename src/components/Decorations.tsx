'use client';

import { motion } from 'framer-motion';

// Hoa văn trang trí góc
export function CornerOrnament({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270
  };

  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  return (
    <motion.svg
      className={`absolute ${positions[position]} w-20 h-20 md:w-28 md:h-28 text-[#c41e3a] opacity-40`}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      viewBox="0 0 100 100"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <path
        fill="currentColor"
        d="M0 0 Q50 10 50 50 Q10 50 0 0 M5 5 Q40 15 40 40 Q15 40 5 5"
        opacity="0.6"
      />
      <circle cx="25" cy="25" r="3" fill="#ffd700" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d="M0 30 Q15 30 30 15 M0 50 Q25 50 50 25"
        opacity="0.4"
      />
    </motion.svg>
  );
}

// Đường kẻ trang trí với hoa văn
export function DecorativeDivider({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 py-6 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="h-px w-16 md:w-24 bg-linear-to-r from-transparent via-[#c41e3a] to-[#ffd700]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.svg
        className="w-8 h-8 text-[#c41e3a]"
        viewBox="0 0 24 24"
        initial={{ rotate: -180, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </motion.svg>
      <motion.div
        className="h-px w-16 md:w-24 bg-linear-to-r from-[#ffd700] via-[#c41e3a] to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
}

// Khung trang trí cho nội dung
export function DecorativeFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative p-6 md:p-8 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* 4 góc trang trí */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />
      
      {/* Border gradient */}
      <motion.div
        className="absolute inset-4 md:inset-6 border border-[#c41e3a]/20 rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Chữ Song Hỷ animated
export function AnimatedDoubleHappiness({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        type: "spring",
        stiffness: 100 
      }}
    >
      <motion.span
        className="text-5xl md:text-7xl font-bold text-[#c41e3a] drop-shadow-lg"
        animate={{
          textShadow: [
            '0 0 10px rgba(196,30,58,0.3)',
            '0 0 20px rgba(196,30,58,0.5)',
            '0 0 10px rgba(196,30,58,0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        囍
      </motion.span>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-xl bg-[#c41e3a]/20 -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Hoa lá trang trí
export function FloralDecoration({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  
  return (
    <motion.svg
      className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-12 md:w-20 h-48 md:h-64 opacity-30`}
      viewBox="0 0 50 200"
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 0.3, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
    >
      {/* Thân cây */}
      <motion.path
        d="M25 200 Q20 150 25 100 Q30 50 25 0"
        fill="none"
        stroke="#2d5a27"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
      
      {/* Lá */}
      {[30, 70, 110, 150].map((y, i) => (
        <motion.ellipse
          key={i}
          cx={i % 2 === 0 ? 35 : 15}
          cy={y}
          rx="12"
          ry="6"
          fill="#3d8b37"
          opacity="0.6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
          transform={`rotate(${i % 2 === 0 ? -30 : 30} ${i % 2 === 0 ? 35 : 15} ${y})`}
        />
      ))}
      
      {/* Hoa */}
      {[50, 130].map((y, i) => (
        <motion.g key={`flower-${i}`}>
          <motion.circle
            cx="25"
            cy={y}
            r="8"
            fill="#c41e3a"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 + i * 0.3 }}
          />
          <motion.circle
            cx="25"
            cy={y}
            r="3"
            fill="#ffd700"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.3 }}
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

// Section với hiệu ứng parallax
export function ParallaxSection({ 
  children, 
  className = '',
  bgPattern = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  bgPattern?: boolean;
}) {
  return (
    <motion.section
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Background pattern */}
      {bgPattern && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c41e3a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      )}
      
      {/* Decorations */}
      <FloralDecoration side="left" />
      <FloralDecoration side="right" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}

// Animated text với hiệu ứng xuất hiện từng chữ
export function AnimatedText({ 
  text, 
  className = '',
  delay = 0
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  
  return (
    <motion.p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// Ribbon banner trang trí - phiên bản đẹp hơn
export function RibbonBanner({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`relative w-full flex justify-center px-4 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer glow */}
      <motion.div 
        className="absolute inset-x-8 inset-y-2 bg-[#c41e3a]/15 blur-2xl rounded-full"
        animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      
      <div className="relative w-full max-w-md">
        {/* Top decorative curve */}
        <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6" viewBox="0 0 96 24" aria-hidden>
          <motion.path
            d="M0 24 Q48 0 96 24"
            fill="none"
            stroke="#d9b976"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.circle
            cx="48" cy="3" r="3"
            fill="#c41e3a"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          />
        </svg>

        {/* Ribbon body */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#8b0000] via-[#c41e3a] to-[#8b0000] text-white px-8 py-3 shadow-[0_12px_26px_-12px_rgba(196,30,58,0.55)] border border-[#d9b976]/70"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -skew-x-12"
            animate={{ x: ['-120%', '200%'] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Subtle inner glow */}
          <div className="absolute inset-0 ring-1 ring-[#f1d9a6]/50 rounded-2xl" />

          {/* Text */}
          <div className="relative flex items-center justify-center gap-2 text-center">
            <span className="text-[#f6d365] text-sm">✦</span>
            <span className="font-script text-[17px] md:text-xl leading-relaxed tracking-wide drop-shadow-md">
              {text}
            </span>
            <span className="text-[#f6d365] text-sm">✦</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
