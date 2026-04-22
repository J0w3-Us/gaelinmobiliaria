import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { VideoItem } from '../../../shared/types/index.d';

/**
 * GPU acceleration style — shared constant applied to all <video> elements
 * in this component. Identical pattern to VideoModal.tsx.
 *
 *   transform: translateZ(0)        → GPU compositing layer
 *   backfaceVisibility: hidden       → no WebKit flicker on layer init
 *   WebkitBackfaceVisibility: hidden → Safari-prefixed variant
 *   willChange: transform            → proactive GPU allocation
 */
const GPU_STYLE: React.CSSProperties = {
  transform:                 'translateZ(0)',
  backfaceVisibility:        'hidden',
  WebkitBackfaceVisibility:  'hidden',
  willChange:                'transform',
} as const;

// ─── Internal Modal ─────────────────────────────────────────────────────────
/**
 * InternalVideoModal — same preload / pause / reset pattern as VideoModal.tsx.
 * Kept internal to VideoGrid so the grid manages its own modal state and the
 * Showcase.astro orchestrator needs no changes.
 */
interface InternalModalProps {
  isOpen:    boolean;
  onClose:   () => void;
  videoWebm: string;
  videoMp4:  string;
  poster?:   string;
  title?:    string;
}

const InternalVideoModal: React.FC<InternalModalProps> = ({
  isOpen,
  onClose,
  videoWebm,
  videoMp4,
  poster,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Preload: metadata → auto on open */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isOpen) {
      video.preload = 'auto';
      video.load();
    }
  }, [isOpen]);

  /* Keyboard + scroll lock */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.preload = 'metadata';
    }
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Video: ${title}` : 'Video recorrido virtual'}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-50 w-[90vw] max-w-4xl animate-modal-in">

        {/* Close button — color #F5E6C8 */}
        <button
          type="button"
          onClick={handleClose}
          className="
            absolute right-0 top-[-2.5rem]
            sm:right-[-2.5rem] sm:top-[-0.25rem]
            p-1 rounded
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]
            transition-colors duration-200
          "
          style={{ color: '#F5E6C8' }}
          aria-label="Cerrar video"
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
          onMouseLeave={e => (e.currentTarget.style.color = '#F5E6C8')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round"
               aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 16:9 container — padding-top trick for full Safari iOS compat */}
        <div
          className="relative w-full overflow-hidden bg-black rounded-lg shadow-2xl ring-1 ring-[#C9A84C]/20"
          style={{ paddingTop: '56.25%' }}
        >
          <video
            ref={videoRef}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-contain outline-none"
            style={GPU_STYLE}
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4}  type="video/mp4"  />
          </video>
        </div>
      </div>
    </div>
  );
};

// ─── VideoCard ───────────────────────────────────────────────────────────────

interface VideoCardProps extends VideoItem {
  onPlay: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  subtitle,
  poster,
  duration,
  onPlay,
}) => (
  <article
    className="group relative overflow-hidden rounded-lg cursor-pointer bg-[#1a1a1a] ring-1 ring-[#C9A84C]/10 hover:ring-[#C9A84C]/40 transition-all duration-300"
    onClick={onPlay}
    role="button"
    tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onPlay()}
    aria-label={`Reproducir recorrido: ${title}`}
  >
    {/* Thumbnail */}
    <div className="relative aspect-video overflow-hidden">
      <img
        src={poster}
        alt={title}
        width={848}
        height={480}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full border border-[#F5E6C8]/60 bg-black/30 backdrop-blur-sm opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <svg className="w-6 h-6 text-[#F5E6C8] translate-x-0.5"
               fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Duration badge */}
      {duration && (
        <span className="absolute bottom-2 right-2 bg-black/70 text-[#F5E6C8] text-xs px-2 py-0.5 rounded font-medium tracking-wide">
          {duration}
        </span>
      )}
    </div>

    {/* Card info */}
    <div className="p-4">
      <h3 className="text-[#F5E6C8] font-semibold text-sm md:text-base leading-snug group-hover:text-[#C9A84C] transition-colors duration-200">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[#F5E6C8]/50 text-xs mt-1">{subtitle}</p>
      )}
    </div>
  </article>
);

// ─── VideoGrid ───────────────────────────────────────────────────────────────

export interface VideoGridProps {
  videos:         VideoItem[];
  sectionTitle?:  string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  sectionTitle = 'Recorridos Virtuales',
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section
      id="recorridos"
      className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#0f0f0f]"
      aria-label={sectionTitle}
    >
      {/* Section header */}
      <div className="mb-10 md:mb-14">
        <span className="text-[#C9A84C] text-xs uppercase tracking-[0.25em] font-medium">
          Ciudad Maderas
        </span>
        <h2 className="text-[#F5E6C8] text-3xl md:text-4xl lg:text-5xl font-bold mt-2 leading-tight">
          {sectionTitle}
        </h2>
        <p className="text-[#F5E6C8]/60 mt-3 max-w-xl text-sm md:text-base">
          Explora el desarrollo desde cualquier lugar — recorridos en video de las áreas
          y amenidades de Ciudad Maderas.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {videos.map(video => (
          <VideoCard
            key={video.id}
            {...video}
            onPlay={() => setActiveVideo(video)}
          />
        ))}
      </div>

      {/*
        InternalVideoModal — only mounts when a card is clicked.
        Same preload metadata→auto pattern: no bytes downloaded until user acts.
      */}
      {activeVideo && (
        <InternalVideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          videoWebm={activeVideo.videoWebm}
          videoMp4={activeVideo.videoMp4}
          poster={activeVideo.poster}
          title={activeVideo.title}
        />
      )}
    </section>
  );
};
