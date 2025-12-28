"use client";

import { motion } from "framer-motion";

interface ScrollHintProps {
  className?: string;
}

export function ScrollHint({ className = "" }: ScrollHintProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col items-center text-[#9b7b5b]/60 ${className}`}
    >
      <motion.span
        className="text-[11px] tracking-[0.25em] uppercase mb-1"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Vuốt xuống
      </motion.span>
      <motion.svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.1 }}
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </motion.svg>
    </motion.div>
  );
}
