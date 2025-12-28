'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface InvitationSectionProps {
  message: string;
  groomParents: {
    father: string;
    mother: string;
    address: string;
  };
  brideParents: {
    father: string;
    mother: string;
    address: string;
  };
}

export default function InvitationSection({ message, groomParents, brideParents }: InvitationSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-8 px-6 bg-white/50 flex flex-col justify-center">
      <div className="max-w-lg mx-auto text-center">
        {/* Decorative header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 relative"
        >
          {/* Animated sparkles */}
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2"
            animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-[#c9a962]" />
          </motion.div>
          
          {/* Decorative line with heart */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div 
              className="h-px w-16 bg-linear-to-r from-transparent via-[#c9a962] to-[#c41e3a]"
              initial={{ scaleX: 0, originX: 1 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-[#c41e3a] fill-[#c41e3a]/30" />
            </motion.div>
            <motion.div 
              className="h-px w-16 bg-linear-to-r from-[#c41e3a] via-[#c9a962] to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Main invitation title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-6"
        >
          <motion.h2
            className="font-script text-4xl text-[#c41e3a] mb-2 relative inline-block"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(196,30,58,0.2)',
                '0 0 20px rgba(196,30,58,0.4)',
                '0 0 10px rgba(196,30,58,0.2)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Trân Trọng Kính Mời
          </motion.h2>
          <p className="text-[#9b7b5b]/70 text-xs tracking-[0.3em] uppercase">We Cordially Invite You</p>
        </motion.div>

        {/* Message with decorative quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-10 px-4"
        >
          <span className="absolute -left-2 -top-4 text-4xl text-[#c9a962]/30 font-serif">"</span>
          <p className="text-[#3d3d3d] text-lg leading-relaxed font-body italic">
            {message}
          </p>
          <span className="absolute -right-2 -bottom-4 text-4xl text-[#c9a962]/30 font-serif">"</span>
        </motion.div>

        {/* Parents info with elegant cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Groom's parents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-4 rounded-xl bg-linear-to-br from-[#faf8f5] to-white border border-[#c9a962]/20 shadow-sm"
          >
            <motion.div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c41e3a] text-white px-3 py-0.5 rounded-full text-xs font-elegant tracking-wider"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: 'spring', delay: 0.5 }}
            >
              NHÀ TRAI
            </motion.div>
            <div className="mt-2 space-y-1 text-sm text-[#3d3d3d]">
              <p className="font-semibold">{groomParents.father}</p>
              <p className="text-[#c9a962]">&</p>
              <p className="font-semibold">{groomParents.mother}</p>
            </div>
            <p className="text-xs text-[#9b7b5b]/70 mt-3 leading-relaxed">{groomParents.address}</p>
          </motion.div>

          {/* Bride's parents */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative p-4 rounded-xl bg-linear-to-br from-[#fff5f5] to-white border border-[#c41e3a]/20 shadow-sm"
          >
            <motion.div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c9a962] text-white px-3 py-0.5 rounded-full text-xs font-elegant tracking-wider"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: 'spring', delay: 0.6 }}
            >
              NHÀ GÁI
            </motion.div>
            <div className="mt-2 space-y-1 text-sm text-[#3d3d3d]">
              <p className="font-semibold">{brideParents.father}</p>
              <p className="text-[#c9a962]">&</p>
              <p className="font-semibold">{brideParents.mother}</p>
            </div>
            <p className="text-xs text-[#9b7b5b]/70 mt-3 leading-relaxed">{brideParents.address}</p>
          </motion.div>
        </div>

        {/* Decorative bottom */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-[#c9a962]" />
          <Sparkles className="w-4 h-4 text-[#c9a962]" />
          <div className="h-px w-12 bg-linear-to-r from-[#c9a962] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
