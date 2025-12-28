'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Autoplay khi user tương tác với trang
    const playMusic = () => {
      audio.play().catch(() => {
        // Nếu autoplay bị chặn, thử lại khi user click
      });
    };

    // Thử phát ngay
    playMusic();

    // Nếu bị chặn, phát khi user tương tác
    const handleInteraction = () => {
      playMusic();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/nhac.mp3"
      loop
      autoPlay
      playsInline
      style={{ display: 'none' }}
    />
  );
}
