'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasPlayedRef.current) return;

    // Phát nhạc ngay lập tức (vì user đã click "Mở thiệp")
    const playMusic = async () => {
      try {
        audio.volume = 0.5;
        await audio.play();
        hasPlayedRef.current = true;
      } catch (error) {
        console.log('Autoplay blocked, waiting for interaction');
        // Nếu vẫn bị chặn, đợi interaction
        const handleInteraction = async () => {
          try {
            await audio.play();
            hasPlayedRef.current = true;
          } catch (e) {
            console.log('Still blocked');
          }
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        };
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
      }
    };

    // Delay nhỏ để đảm bảo user gesture vẫn còn hiệu lực
    setTimeout(playMusic, 100);
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/nhac.mp3"
      loop
      preload="auto"
      playsInline
      style={{ display: 'none' }}
    />
  );
}
