'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FooterProps {
  groomName: string;
  brideName: string;
  closingMessage: string;
}

export default function Footer({ groomName, brideName, closingMessage }: FooterProps) {
  return (
    <footer className="py-16 px-6 bg-gradient-to-b from-[#a01830] to-[#8b0000] text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M0,100 Q100,0 200,100 T400,100" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M0,150 Q100,50 200,150 T400,150" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      {/* Double Happiness */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/10 text-6xl">囍</div>

      <div className="max-w-lg mx-auto text-center relative z-10">
        {/* Closing message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-white/90 text-lg mb-8 font-body leading-relaxed"
        >
          {closingMessage}
        </motion.p>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="font-script text-3xl text-[#ffd700]">{groomName}</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block mx-4"
          >
            <Heart className="w-6 h-6 text-pink-300 fill-pink-300" />
          </motion.span>
          <span className="font-script text-3xl text-[#ffd700]">{brideName}</span>
        </motion.div>

        {/* Thank you */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="font-script text-4xl mb-4 text-[#ffd700]">Cảm ơn!</h3>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-4" />
          <p className="text-white/60 text-sm">
            © 2026 {groomName} & {brideName}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
