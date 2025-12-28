'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'star' | 'circle' | 'diamond';
  color: string;
}

const sparkleColors = [
  '#ffd700', // gold
  '#fff3cd', // light gold
  '#ffec3d', // bright yellow
  '#ffc107', // amber
  '#fff', // white
  '#ffe4e1', // misty rose
];

export default function SparkleOverlay() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const types: ('star' | 'circle' | 'diamond')[] = ['star', 'circle', 'diamond'];
    
    const newSparkles: Sparkle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      type: types[Math.floor(Math.random() * types.length)],
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
    }));
    
    setSparkles(newSparkles);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scale: [0.3, 1.2, 1, 0.3],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <SparkleShape 
            type={sparkle.type} 
            size={sparkle.size} 
            color={sparkle.color} 
          />
        </motion.div>
      ))}
      
      {/* Hiệu ứng light rays từ góc */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255,215,0,0.3) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(196,30,58,0.2) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.1, 0.25, 0.1],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  );
}

function SparkleShape({ type, size, color }: { type: 'star' | 'circle' | 'diamond'; size: number; color: string }) {
  if (type === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          fill={color}
          d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z"
          filter="drop-shadow(0 0 4px rgba(255,215,0,0.6))"
        />
      </svg>
    );
  }
  
  if (type === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          fill={color}
          d="M12 2L22 12L12 22L2 12L12 2Z"
          filter="drop-shadow(0 0 3px rgba(255,215,0,0.5))"
        />
      </svg>
    );
  }
  
  // circle
  return (
    <div 
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}`
      }}
    />
  );
}
