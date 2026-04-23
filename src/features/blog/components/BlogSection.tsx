import React, { useRef, useState, useEffect } from 'react';
import { useBlogVideo, type VideoCard } from '../hooks/useBlogVideo';

// ─── GPU acceleration ─────────────────────────────────────────────────────────
const GPU: React.CSSProperties = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  willChange: 'transform',
} as const;

const CARDS: VideoCard[] = [
  {
    number: '01',
    title: 'Modelo Aura',
    tag: 'Recorrido Exterior',
    thumbnail: '/assets/images/modelo_aura.jpg',
    videoSrc: '/assets/videos/recorrido1.mp4',
  },
  {
    number: '02',
    title: 'Recorrido Aura',
    tag: 'Recorrido Interior',
    thumbnail: '/assets/images/casa1.jpg',
    videoSrc: '/assets/videos/recorrido2.mp4',
  },
  {
    number: '03',
    title: 'Vlog Madera City',
    tag: 'Un día en la ciudad',
    thumbnail: '/assets/images/casa1.jpg',
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

const INITIAL_CARD: VideoCard = {
  number: '00',
  title: 'Panorámica · Ciudad Maderas',
  tag: 'RECORRIDO PRINCIPAL',
  thumbnail: '/assets/images/paronamica_ciudad_madera.jpg',
  videoSrc: '/assets/videos/paronamica.mp4',
};

// ─── BlogSection ─────────────────────────────────────────────────────────────
export const BlogSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const {
    videoRef,
    posterRef,
    isPlaying,
    activeCard,
    handlePlay,
    handleSelectCard
  } = useBlogVideo(INITIAL_CARD);

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
        className="bg-[#0f0f0f] py-14 px-6 md:px-14 border-t border-[#C9A84C]/10"
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div ref={headerRef} className="blog-header mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="w-10 h-px bg-[#C9A84C] mb-3" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A84C] font-sans">
                RECORRIDOS · CIUDAD MADERAS
              </p>
              <h2 className="mt-2 leading-tight font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-light text-[#F5E6C8]">
                Conoce cada rincón antes de decidir
              </h2>
            </div>
          </div>

          {/* ── Main layout: video left + cards right ────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">

            {/* LEFT — main video player */}
            <div className="flex-1 min-w-0">
              <div
                className="relative overflow-hidden rounded-xl w-full group bg-[#111] border border-[#C9A84C]/15 aspect-video"
              >
                {/* Thumbnail image — shown before/during load, fades out on play */}
                <img
                  ref={posterRef}
                  src={activeCard.thumbnail}
                  alt={activeCard.title}
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500"
                  style={GPU}
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
                  className="absolute inset-0 w-full h-full object-cover z-20"
                  style={GPU}
                >
                  <source src={activeCard.videoSrc} type="video/mp4" />
                </video>

                {/* Overlay — fades out when playing */}
                <div
                  className={`absolute inset-0 transition-opacity duration-400 z-30 bg-gradient-to-t from-black/80 via-black/10 to-transparent ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  {/* Meta — bottom left */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block text-[9px] px-2 py-0.5 mb-2 uppercase border border-[#C9A84C]/40 text-[#C9A84C] font-sans tracking-widest">
                      {activeCard.tag}
                    </span>
                    <p className="font-serif text-[clamp(1.1rem,2vw,1.45rem)] font-light text-[#F5E6C8] leading-snug">
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
                      transition-all duration-300 hover:scale-110 hover:border-[#C9A84C]/85
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]
                      w-[58px] h-[58px] border-[1.5px] border-[#F5E6C8]/55 bg-black/45 backdrop-blur-md
                    "
                    aria-label={`Reproducir ${activeCard.title}`}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#F5E6C8" aria-hidden="true" className="ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Caption below video */}
              <p className="mt-2 text-[11px] tracking-wider text-[#F5E6C8]/30 font-sans">
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
      className={`sidecard flex gap-3 items-stretch rounded-lg overflow-hidden cursor-pointer transition-all duration-350 ${isActive ? 'bg-[#C9A84C]/5 border-[#C9A84C]/35' : 'bg-[#1a1a1a] border-[#F5E6C8]/[0.06] hover:border-[#C9A84C]/35'}`}
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
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
      <div className="relative overflow-hidden shrink-0 w-[90px] min-h-[68px]">
        <img
          src={card.thumbnail}
          alt={card.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 ${isActive ? 'bg-black/10' : 'bg-black/45'}`} />

        {/* Mini play / indicator */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-[26px] h-[26px] transition-all duration-300 border ${isActive ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#F5E6C8]/45 bg-black/55'}`}
          aria-hidden="true"
        >
          {isActive ? (
            <div className="flex gap-0.5">
              <div className="w-[2px] h-[8px] bg-[#0f0f0f] animate-pulse" />
              <div className="w-[2px] h-[8px] bg-[#0f0f0f] animate-pulse" style={{ animationDelay: '150ms' }} />
            </div>
          ) : (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#F5E6C8" className="ml-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>

        {/* Number badge */}
        <span
          className={`absolute top-1 left-1.5 font-serif text-[10px] tracking-wider transition-colors duration-300 ${isActive ? 'text-[#F5E6C8]' : 'text-[#C9A84C]/75'}`}
          aria-hidden="true"
        >
          {card.number}
        </span>
      </div>

      {/* Metadata */}
      <div className="flex flex-col justify-center py-2 pr-3 min-w-0">
        <p className={`uppercase truncate font-sans text-[9px] tracking-[0.16em] transition-colors duration-300 ${isActive ? 'text-[#C9A84C]' : 'text-[#C9A84C]/70'}`}>
          {card.tag}
        </p>
        <p className="mt-0.5 leading-tight truncate font-serif text-[13px] text-[#F5E6C8] font-normal">
          {card.title}
        </p>
        <p className={`mt-1.5 text-[10px] font-sans transition-colors duration-200 ${isActive ? 'text-[#C9A84C]' : (hovered ? 'text-[#F5E6C8]/60' : 'text-[#F5E6C8]/30')}`}>
          {isActive ? 'Reproduciendo...' : 'Reproducir →'}
        </p>
      </div>
    </div>
  );
};
