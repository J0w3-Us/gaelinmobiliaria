import React, { useRef, useState, useEffect, useCallback } from 'react';

// ─── GPU acceleration ─────────────────────────────────────────────────────────
const GPU: React.CSSProperties = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  willChange: 'transform',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────
interface VideoCard {
  number: string;
  title: string;
  tag: string;
  thumbnail: string;
  videoSrc: string;
}

const CARDS: VideoCard[] = [
  {
    number: '01',
    title: 'Modelo Aura',
    tag: 'Recorrido Interior',
    thumbnail: '/assets/images/modelo_aura.jpg',
    videoSrc: '/assets/videos/recorrido1.mp4',
  },
  {
    number: '02',
    title: 'Modelos Disponibles',
    tag: 'Recorrido Interior',
    thumbnail: '/assets/images/casa1.jpg',
    videoSrc: '/assets/videos/recorrido2.mp4',
  },
  {
    number: '03',
    title: 'Espacios Interiores',
    tag: 'Lifestyle',
    thumbnail: '/assets/images/sala1.jpg',
    videoSrc: '/assets/videos/blog1.mp4',
  },
  {
    number: '04',
    title: 'El Desarrollo',
    tag: 'Exteriores',
    thumbnail: '/assets/images/Exterior.jpg',
    videoSrc: '/assets/videos/ciudad_madera.mp4',
  },
];

// ─── BlogSection ─────────────────────────────────────────────────────────────
export const BlogSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // State for the active video displayed on the left
  const [activeCard, setActiveCard] = useState<VideoCard>({
    number: '00',
    title: 'Panorámica · Ciudad Maderas',
    tag: 'RECORRIDO PRINCIPAL',
    thumbnail: '/assets/images/paronamica_ciudad_madera.jpg',
    videoSrc: '/assets/videos/paronamica.mp4',
  });

  // ── Sync play state with native events ────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    v.addEventListener('play',  onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('play',  onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  // ── Autoplay muted when video enters viewport ─────────────────────────────
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

  // ── Play with audio on explicit click ─────────────────────────────────────
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

  // ── Handle Side Card Selection ────────────────────────────────────────────
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

  // ── Header entrance animation ─────────────────────────────────────────────
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('blog-in'); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section
        id="blog"
        className="bg-[#0f0f0f] py-14 px-6 md:px-14"
        style={{ borderTop: '1px solid rgba(201,168,76,0.10)' }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div ref={headerRef} className="blog-header mb-8 flex items-end justify-between gap-4">
            <div>
              <div style={{ width: 40, height: 1, backgroundColor: '#C9A84C', marginBottom: 12 }} aria-hidden="true" />
              <p
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{ color: '#C9A84C', fontFamily: '"DM Sans", sans-serif' }}
              >
                RECORRIDOS · CIUDAD MADERAS
              </p>
              <h2
                className="mt-2 leading-tight"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
                  fontWeight: 300,
                  color: '#F5E6C8',
                }}
              >
                Conoce cada rincón antes de decidir
              </h2>
            </div>
            <div className="hidden md:block shrink-0" aria-hidden="true">
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 80,
                fontWeight: 300,
                color: 'rgba(201,168,76,0.07)',
                lineHeight: 1,
                userSelect: 'none',
              }}>04</span>
            </div>
          </div>

          {/* ── Main layout: video left + cards right ────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">

            {/* LEFT — main video player */}
            <div className="flex-1 min-w-0">
              <div
                className="relative overflow-hidden rounded-xl w-full group"
                style={{
                  aspectRatio: '16 / 9',
                  background: '#111',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                {/* Thumbnail image — shown before/during load, fades out on play */}
                <img
                  ref={posterRef}
                  src={activeCard.thumbnail}
                  alt={activeCard.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    ...GPU,
                    zIndex: 1,
                    transition: 'opacity 0.5s ease',
                  }}
                  aria-hidden="true"
                />

                {/* Video element */}
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  loop
                  preload="auto"
                  controls={isPlaying} // Show native controls once playing
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ ...GPU, zIndex: 2 }}
                >
                  <source src={activeCard.videoSrc} type="video/mp4" />
                </video>

                {/* Overlay — fades out when playing */}
                <div
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    zIndex: 3,
                    opacity: isPlaying ? 0 : 1,
                    pointerEvents: isPlaying ? 'none' : 'auto',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)',
                  }}
                >
                  {/* Meta — bottom left */}
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="inline-block text-[9px] px-2 py-0.5 mb-2 uppercase"
                      style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.1em' }}
                    >
                      {activeCard.tag}
                    </span>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', fontWeight: 300, color: '#F5E6C8', lineHeight: 1.2 }}>
                      {activeCard.title}
                    </p>
                  </div>

                  {/* Play button — center */}
                  <button
                    type="button"
                    onClick={handlePlay}
                    className="
                      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      flex items-center justify-center rounded-full
                      transition-all duration-300 hover:scale-110
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]
                    "
                    style={{
                      width: 58,
                      height: 58,
                      border: '1.5px solid rgba(245,230,200,0.55)',
                      background: 'rgba(0,0,0,0.45)',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.85)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,230,200,0.55)'; }}
                    aria-label={`Reproducir ${activeCard.title}`}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#F5E6C8" aria-hidden="true" style={{ marginLeft: 3 }}>
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Caption below video */}
              <p className="mt-2 text-[11px] tracking-wider" style={{ color: 'rgba(245,230,200,0.3)', fontFamily: '"DM Sans", sans-serif' }}>
                Videos reales del desarrollo · Sin renders · Sin promesas
              </p>
            </div>

            {/* RIGHT — 4 stacked cards */}
            <div className="w-full lg:w-[260px] xl:w-[290px] shrink-0 flex flex-col gap-3">
              {CARDS.map((card, i) => (
                <SideCard 
                  key={card.number} 
                  card={card} 
                  index={i} 
                  onSelect={handleSelectCard}
                  isActive={activeCard.videoSrc === card.videoSrc}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .blog-header {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .blog-header.blog-in {
          opacity: 1;
          transform: translateY(0);
        }
        .sidecard {
          opacity: 0;
          transform: translateX(16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .sidecard.sidecard-in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </>
  );
};

// ─── SideCard — compact horizontal card for the right column ─────────────────
interface SideCardProps {
  card: VideoCard;
  index: number;
  onSelect: (card: VideoCard) => void;
  isActive: boolean;
}

const SideCard: React.FC<SideCardProps> = ({ card, index, onSelect, isActive }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Stagger entrance
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('sidecard-in'), index * 80);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="sidecard flex gap-3 items-stretch rounded-lg overflow-hidden cursor-pointer"
      style={{
        background: isActive ? 'rgba(201,168,76,0.05)' : '#1a1a1a',
        border: (hovered || isActive) ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(245,230,200,0.06)',
        transition: 'all 350ms ease',
      }}
      onClick={() => onSelect(card)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Seleccionar video: ${card.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(card); }}
    >
      {/* Thumbnail — square-ish */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ width: 90, minHeight: 68 }}
      >
        <img
          src={card.thumbnail}
          alt={card.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 500ms ease-out',
          }}
        />
        <div className="absolute inset-0" style={{ background: isActive ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.45)' }} />

        {/* Mini play / indicator */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
          style={{ width: 26, height: 26, border: isActive ? '1px solid #C9A84C' : '1px solid rgba(245,230,200,0.45)', background: isActive ? '#C9A84C' : 'rgba(0,0,0,0.55)', transition: 'all 300ms ease' }}
          aria-hidden="true"
        >
          {isActive ? (
            <div className="flex gap-0.5">
              <div className="w-[2px] h-[8px] bg-[#0f0f0f] animate-pulse" />
              <div className="w-[2px] h-[8px] bg-[#0f0f0f] animate-pulse" style={{ animationDelay: '150ms' }} />
            </div>
          ) : (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#F5E6C8" style={{ marginLeft: 2 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>

        {/* Number badge */}
        <span
          className="absolute top-1 left-1.5"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 10, color: isActive ? '#F5E6C8' : 'rgba(201,168,76,0.75)', letterSpacing: '0.08em', transition: 'color 300ms ease' }}
          aria-hidden="true"
        >
          {card.number}
        </span>
      </div>

      {/* Metadata */}
      <div className="flex flex-col justify-center py-2 pr-3 min-w-0">
        <p
          className="uppercase truncate"
          style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 9, letterSpacing: '0.16em', color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.7)', transition: 'color 300ms ease' }}
        >
          {card.tag}
        </p>
        <p
          className="mt-0.5 leading-tight truncate"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, color: '#F5E6C8', fontWeight: 400 }}
        >
          {card.title}
        </p>
        <p
          className="mt-1.5 text-[10px]"
          style={{
            fontFamily: '"DM Sans", sans-serif',
            color: isActive ? '#C9A84C' : (hovered ? 'rgba(245,230,200,0.6)' : 'rgba(245,230,200,0.3)'),
            transition: 'color 280ms ease',
          }}
        >
          {isActive ? 'Reproduciendo...' : 'Reproducir →'}
        </p>
      </div>
    </div>
  );
};
