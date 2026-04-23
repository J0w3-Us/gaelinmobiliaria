import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '@/shared/config/site-settings';

export const usePropertyShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const items = SITE_CONFIG.galeria;

  // ─── Auto-play logic ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    
    // Auto-advance every 5 seconds
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, items.length]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    // Pause auto-play for 10s after manual interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return {
    activeIndex,
    isPaused,
    setIsPaused,
    items,
    handleSelect,
    activeItem: items[activeIndex],
  };
};
