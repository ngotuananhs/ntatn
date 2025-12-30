'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import OpeningScreen from '@/components/OpeningScreen';
import HeroSection from '@/components/HeroSection';
import InvitationSection from '@/components/InvitationSection';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import AddToCalendar from '@/components/AddToCalendar';
import RSVPSection from '@/components/RSVPSection';
import BankQRSection from '@/components/BankQRSection';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import { DecorativeFrame, AnimatedDoubleHappiness, RibbonBanner } from '@/components/Decorations';
import { ScrollHint } from '@/components/ScrollHint';
import { weddingData } from '@/data/wedding';

// Scroll animation wrapper với nhiều effect
const ScrollSection = ({ 
  children, 
  className = '',
  variant = 'fadeUp'
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
}) => {
  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 80 },
      animate: { opacity: 1, y: 0 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    slideLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 }
    },
    slideRight: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    rotate: {
      initial: { opacity: 0, rotate: -5, scale: 0.9 },
      animate: { opacity: 1, rotate: 0, scale: 1 }
    }
  };

  return (
    <motion.div
      initial={variants[variant].initial}
      whileInView={variants[variant].animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration: 0.9, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Progress bar khi scroll
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c41e3a] via-[#ffd700] to-[#c41e3a] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Play music immediately on user interaction
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => {
        console.log('Audio play failed (nhạc cần file MP3 thật, hiện tại file placeholder):', err);
      });
    }
  };

  // Target date for countdown
  const weddingDate = new Date(
    weddingData.wedding.year,
    weddingData.wedding.month - 1,
    weddingData.wedding.day
  );

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} src="/nhac.mp3" loop preload="auto" style={{ display: 'none' }} />
      
      {/* Scroll Progress Bar */}
      {isOpened && <ScrollProgress />}
      
      {/* Opening Screen */}
      {!isOpened && (
        <OpeningScreen
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          date={weddingData.wedding.date}
          lunarDate={weddingData.wedding.lunarDate}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Main Content */}
      <main className={`${isOpened ? 'block' : 'hidden'}`}>
        {/* Floating petals and hearts */}
        <FloatingElements />

        {/* Page 1: Hero Section */}
        <section className="snap-section">
          <HeroSection
            groomName={weddingData.groom.name}
            brideName={weddingData.bride.name}
            date={weddingData.wedding.date}
            lunarDate={weddingData.wedding.lunarDate}
            monogram={weddingData.monogram.letters}
            weddingDate={weddingDate}
          />
          <div className="flex justify-center -mt-6">
            <ScrollHint />
          </div>
        </section>

        {/* Page 2: Invitation */}
        <section className="snap-section">
          <ScrollSection variant="fadeUp">
            <DecorativeFrame>
              <InvitationSection
                message={weddingData.message.groomSide}
                groomParents={{
                  father: weddingData.groom.father,
                  mother: weddingData.groom.mother,
                  address: weddingData.groom.address
                }}
                brideParents={{
                  father: weddingData.bride.father,
                  mother: weddingData.bride.mother,
                  address: weddingData.bride.address
                }}
              />
            </DecorativeFrame>
          </ScrollSection>
          <div className="flex justify-center mt-4">
            <ScrollHint />
          </div>
        </section>

        {/* Page 3: Events + Song Hỷ + Calendar */}
        <section className="snap-section justify-start! pt-4">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex justify-center mb-2">
              <AnimatedDoubleHappiness />
            </div>
            <ScrollSection variant="scale">
              <EventsSection
                groomCeremony={weddingData.groomCeremony}
                brideCeremony={weddingData.brideCeremony}
                wedding={weddingData.wedding}
              />
            </ScrollSection>
            {/* Mini Calendar buttons */}
            <ScrollSection variant="fadeUp">
              <AddToCalendar
                eventTitle={`Lễ cưới ${weddingData.groom.name} & ${weddingData.bride.name}`}
                eventDate={weddingDate}
                eventLocation={weddingData.groomCeremony.address}
                eventDescription={`Trân trọng kính mời bạn đến dự lễ thành hôn của ${weddingData.groom.name} và ${weddingData.bride.name}`}
              />
            </ScrollSection>
            <div className="flex justify-center mt-2 mb-1">
              <ScrollHint />
            </div>
          </div>
        </section>

        {/* Page 4: RSVP (countdown removed per request) */}
        <section className="snap-section justify-start! pt-6">
          <div className="w-full max-w-lg mx-auto">
            <div className="text-center mb-3">
              <RibbonBanner text="Xin Hãy Đến Chung Vui Cùng Chúng Tôi" />
            </div>
            <ScrollSection variant="fadeUp" className="w-full">
              <RSVPSection
                groomName={weddingData.groom.name}
                brideName={weddingData.bride.name}
              />
            </ScrollSection>
            <div className="flex justify-center mt-4">
              <ScrollHint />
            </div>
          </div>
        </section>

        {/* Page 5: Bank QR - Mừng cưới */}
        <section className="snap-section">
          <ScrollSection variant="fadeUp" className="w-full">
            <BankQRSection />
          </ScrollSection>
          <div className="flex justify-center mt-4">
            <ScrollHint />
          </div>
        </section>

        {/* Page 7: Gallery */}
        <section className="snap-section">
          <ScrollSection variant="fadeIn" className="w-full">
            <GallerySection
              groomName={weddingData.groom.name}
              brideName={weddingData.bride.name}
            />
          </ScrollSection>
        </section>

        {/* Page 8: Footer */}
        <section className="snap-section justify-end!">
          <Footer
            groomName={weddingData.groom.name}
            brideName={weddingData.bride.name}
            closingMessage={weddingData.message.closing}
          />
        </section>
      </main>
    </>
  );
}

