import { useState, useEffect, useRef, useCallback } from 'react';

export interface VideoCard {
  number: string;
  title: string;
  tag: string;
  thumbnail: string;
  videoSrc: string;
}

export const useBlogVideo = (initialCard: VideoCard) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCard, setActiveCard] = useState<VideoCard>(initialCard);

  // Sync play state with native events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  // Autoplay muted when video enters viewport
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.muted = true;
          v.play()
            .then(() => {
              // fade out the thumbnail overlay once playing
              if (posterRef.current) posterRef.current.style.opacity = '0';
            })
            .catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  // Play with audio on explicit click
  const handlePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => {
        if (posterRef.current) posterRef.current.style.opacity = '0';
      })
      .catch(() => {});
  }, []);

  // Handle Side Card Selection
  const handleSelectCard = useCallback((card: VideoCard) => {
    setActiveCard(card);
    setIsPlaying(false);
    if (posterRef.current) posterRef.current.style.opacity = '1';
    
    // Load and play the newly selected video
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.src = card.videoSrc;
      v.load();
      v.muted = false; // When they select a specific video, we assume they want audio
      v.play()
        .then(() => {
          if (posterRef.current) posterRef.current.style.opacity = '0';
        })
        .catch(() => {});
    }
  }, []);

  return {
    videoRef,
    posterRef,
    isPlaying,
    activeCard,
    handlePlay,
    handleSelectCard
  };
};
