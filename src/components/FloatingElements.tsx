'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

type ElementType = 'petal' | 'heart' | 'sakura';

interface FloatingElement {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  type: ElementType;
  color: string;
}

// Màu sắc nhẹ nhàng
const colors = {
  petal: ['#ffb7c5', '#ffc8dd'],
  heart: ['#e63946', '#ff6b6b'],
  sakura: ['#ffb7c5', '#ffc8dd'],
};

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  const generateElements = useCallback(() => {
    const types: ElementType[] = ['petal', 'heart', 'sakura'];
    const newElements: FloatingElement[] = [];
    
    // Chỉ tạo 15 phần tử
    for (let i = 0; i < 15; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const typeColors = colors[type];
      
      newElements.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 8,
        size: 16 + Math.random() * 12,
        rotation: Math.random() * 360,
        type,
        color: typeColors[Math.floor(Math.random() * typeColors.length)],
      });
    }
    return newElements;
  }, []);

  useEffect(() => {
    setIsClient(true);
    setElements(generateElements());
  }, [generateElements]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute top-0"
          style={{ left: `${el.x}%` }}
          initial={{
            y: -50,
            rotate: el.rotation,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '105vh'],
            rotate: [el.rotation, el.rotation + 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <ElementIcon type={el.type} size={el.size} color={el.color} />
        </motion.div>
      ))}
    </div>
  );
}

function ElementIcon({ type, size, color }: { type: ElementType; size: number; color: string }) {
  if (type === 'petal') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          fill={color}
          d="M12 2C12 2 6 8 6 13C6 16.5 8.5 19 12 19C15.5 19 18 16.5 18 13C18 8 12 2 12 2Z"
          opacity="0.6"
        />
      </svg>
    );
  }
  
  if (type === 'heart') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path
          fill={color}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          opacity="0.5"
        />
      </svg>
    );
  }
  
  // sakura
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="25"
          cy="15"
          rx="5"
          ry="10"
          fill={color}
          opacity="0.5"
          transform={`rotate(${angle} 25 25)`}
        />
      ))}
    </svg>
  );
}
