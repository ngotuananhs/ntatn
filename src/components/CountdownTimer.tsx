'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, Heart } from 'lucide-react';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section ref={ref} className="w-full py-4 px-6 bg-pattern relative overflow-hidden">
      {/* Background decorative hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 text-pink-200/20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-pink-200/20"
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity }}
        >
          <Heart size={50} fill="currentColor" />
        </motion.div>
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-2"
          >
            <Clock className="w-7 h-7 text-[#c9a962] mx-auto" />
          </motion.div>
          <h2 className="font-script text-2xl text-[#9b7b5b] mb-1">Đếm Ngược</h2>
          <p className="text-[#9b7b5b]/70 text-xs tracking-wider uppercase">Đến ngày trọng đại</p>
        </motion.div>

        {/* Countdown boxes */}
        <div className="grid grid-cols-4 gap-3">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div 
                className="glass rounded-2xl p-4 border border-[#c9a962]/30 shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, borderColor: 'rgba(201,169,98,0.6)' }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: index * 0.5 }}
                />
                <motion.span 
                  className="relative block font-elegant text-3xl sm:text-4xl text-[#9b7b5b] font-semibold"
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
              </motion.div>
              <span className="block mt-2 text-xs text-[#9b7b5b] uppercase tracking-wider font-elegant">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center mt-10 gap-4"
        >
          <motion.div
            className="w-16 h-px bg-linear-to-r from-transparent to-[#c9a962]"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 0.8 }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-5 h-5 text-[#e8c4c4] fill-[#e8c4c4]" />
          </motion.div>
          <motion.div
            className="w-16 h-px bg-linear-to-l from-transparent to-[#c9a962]"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ delay: 0.8 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
