import React, { useRef, useEffect } from 'react';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoWebm: string;
  videoMp4: string;
  posterSrc?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoWebm,
  videoMp4,
  posterSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Fresh load every time modal opens — clean state
      videoRef.current.load();
    }
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  // Don't mount video DOM at all when closed — no preloading of modal video
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Video recorrido"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-50 w-[90vw] max-w-4xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-0 top-[-2.5rem] sm:right-[-2.5rem] sm:top-[-0.5rem]
                     text-[#F5E6C8] hover:text-[#C9A84C] focus:outline-none transition-colors
                     focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          aria-label="Cerrar video"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Video container — 16:9 ratio */}
        <div
          className="relative w-full overflow-hidden bg-black rounded-lg shadow-2xl ring-1 ring-[#C9A84C]/20"
          style={{ paddingTop: '56.25%' }}
        >
          <video
            ref={videoRef}
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-contain outline-none"
            controls
            playsInline
            preload="metadata"
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};
