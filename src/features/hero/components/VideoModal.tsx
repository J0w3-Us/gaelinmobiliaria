import React, { useRef, useEffect, useCallback } from 'react';

/**
 * VideoModalProps — uses the same prop names as the rest of the codebase
 * (videoWebm / videoMp4 / posterSrc) so HeroSection.tsx needs no changes.
 *
 * Preload strategy:
 *   Closed  → component is unmounted, zero bytes downloaded
 *   Opening → preload switches "metadata" → "auto", .load() triggers buffer
 *   Closing → .pause(), currentTime = 0, preload reset to "metadata"
 *
 * GPU acceleration applied via style prop on <video>:
 *   transform: translateZ(0)        → dedicated GPU compositing layer
 *   backfaceVisibility: hidden       → suppress WebKit flicker on layer init
 *   WebkitBackfaceVisibility: hidden → same, Safari-prefixed
 *   willChange: transform            → proactive GPU layer allocation
 *
 * NOTE: shadcn/ui Dialog / Radix UI are not installed in this project.
 * The modal is implemented with native browser APIs (fixed + inset-0 +
 * role="dialog") which achieves identical UX with zero extra dependencies.
 */

export interface VideoModalProps {
  isOpen:     boolean;
  onClose:    () => void;
  videoWebm:  string;   /* Primary source — VP9, smaller file */
  videoMp4:   string;   /* Fallback — H.264 for Safari / iOS  */
  posterSrc?: string;   /* AVIF poster shown before metadata loads */
}

const GPU_STYLE: React.CSSProperties = {
  transform:                 'translateZ(0)',
  backfaceVisibility:        'hidden',
  WebkitBackfaceVisibility:  'hidden',
  willChange:                'transform',
} as const;

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoWebm,
  videoMp4,
  posterSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ── Preload: activate aggressive buffering when modal opens ────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      /*
       * Switch from "metadata" (initial attribute) to "auto" so the browser
       * starts downloading the full video for immediate playback on user press.
       * Must set .preload BEFORE .load() for the change to take effect.
       */
      video.preload = 'auto';
      video.load();
    }
  }, [isOpen]);

  /* ── Keyboard + scroll lock while modal is open ─────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Close: pause, rewind, reset preload ───────────────────────────────── */
  const handleClose = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      /* Reset so re-opening doesn't pre-buffer before the user clicks */
      video.preload = 'metadata';
    }
    onClose();
  }, [onClose]);

  /*
   * The component is unmounted when closed — no DOM node, no bytes downloaded.
   * This is intentional: the video only enters the render tree on user action.
   */
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Video recorrido virtual"
    >
      {/* ── Backdrop — bg-black/90 per spec ─────────────────────────────── */}
      <div
        className="fixed inset-0 bg-black/90"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Modal panel — w-[90vw] max-w-4xl per spec ───────────────────── */}
      <div className="relative z-50 w-[90vw] max-w-4xl animate-modal-in">

        {/* Close button — color #F5E6C8 (arena) per spec */}
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
          <svg
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/*
          16:9 aspect ratio container.
          padding-top:56.25% = 9÷16×100 — works on iOS Safari 14 which
          does not support the `aspect-ratio` CSS property on all elements.
          ring-1 ring-gold/20 adds the luxury brand accent border.
        */}
        <div
          className="relative w-full overflow-hidden bg-black rounded-lg shadow-2xl ring-1 ring-[#C9A84C]/20"
          style={{ paddingTop: '56.25%' }}
        >
          <video
            ref={videoRef}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-contain outline-none"
            style={GPU_STYLE}
          >
            {/* WebM first — VP9, best quality-to-size ratio */}
            <source src={videoWebm} type="video/webm" />
            {/* MP4 second — H.264 fallback for Safari / iOS */}
            <source src={videoMp4}  type="video/mp4"  />
          </video>
        </div>
      </div>
    </div>
  );
};
