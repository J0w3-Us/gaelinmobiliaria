import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── GPU style shared ─────────────────────────────────────────────────────────
const GPU_STYLE: React.CSSProperties = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  willChange: 'transform',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  src: string;
  alt: string;
}

interface ShowcaseTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  images: GalleryImage[];
}

// ─── Tab data ────────────────────────────────────────────────────────────────

const TABS: ShowcaseTab[] = [
  {
    id: 'privada',
    label: 'Privada',
    description: 'Habitaciones, baños y vestidores — tus espacios personales.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v11a1 1 0 001 1h16a1 1 0 001-1V7" />
        <path d="M3 7l9-4 9 4" />
        <path d="M10 21V12h4v9" />
      </svg>
    ),
    images: [
      { src: '/assets/images/recorrido-1-poster.avif', alt: 'Recámara principal — Ciudad Maderas' },
      { src: '/assets/images/recorrido-2-poster.avif', alt: 'Baño y vestidor — Ciudad Maderas' },
    ],
  },
  {
    id: 'publica',
    label: 'Pública',
    description: 'Sala, cocina y comedor — las áreas sociales dentro de la casa.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    images: [
      { src: '/assets/images/promocion-2.jpeg', alt: 'Casa club — sala y áreas sociales' },
      { src: '/assets/images/promocion-1.jpeg', alt: 'Render interior Ciudad Maderas' },
    ],
  },
  {
    id: 'general',
    label: 'General',
    description: 'Fachadas y vistas exteriores del desarrollo.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    images: [
      { src: '/assets/images/ciudad-madera-1.jpeg', alt: 'Acceso principal Ciudad Maderas' },
      { src: '/assets/images/ciudad-madera-2.jpeg', alt: 'Vista panorámica del acceso' },
    ],
  },
  {
    id: 'amenidades',
    label: 'Amenidades',
    description: 'Casa club, albercas, canchas de tenis y áreas verdes.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    images: [
      { src: '/assets/images/piscina.jpeg', alt: 'Alberca y casa club' },
      { src: '/assets/images/arriba.jpeg', alt: 'Vista aérea — canchas y alberca' },
      { src: '/assets/images/promocion-3.jpeg', alt: 'Canchas de tenis Ciudad Maderas' },
    ],
  },
];

// ─── Video with IntersectionObserver autoplay ─────────────────────────────────

interface AutoplayVideoProps {
  webmSrc: string;
  mp4Src: string;
  poster: string;
  title: string;
}

const AutoplayVideo: React.FC<AutoplayVideoProps> = ({ webmSrc, mp4Src, poster, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  /* Autoplay only when visible & playable */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && canPlay) {
            video.play().catch(() => {/* autoplay blocked — leave paused */});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [canPlay]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        muted
        loop
        preload="metadata"
        className="w-full h-full object-cover"
        style={GPU_STYLE}
        onCanPlay={() => setCanPlay(true)}
        aria-label={title}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-sm font-medium" style={{ color: '#F5E6C8' }}>{title}</p>
      </div>
    </div>
  );
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" onClick={onClose} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-[-2.5rem] right-4 p-1 rounded transition-colors duration-200"
          style={{ color: '#F5E6C8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
          onMouseLeave={e => (e.currentTarget.style.color = '#F5E6C8')}
          aria-label="Cerrar galería"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full max-h-[80vh] object-contain rounded-lg"
          style={GPU_STYLE}
        />

        {/* Caption */}
        <p className="text-center mt-3 text-sm" style={{ color: 'rgba(245,230,200,0.7)' }}>
          {images[current].alt}
        </p>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}
              className="absolute left-7 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors duration-200"
              style={{ color: '#F5E6C8' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F5E6C8')}
              aria-label="Imagen anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setCurrent(i => (i + 1) % images.length)}
              className="absolute right-7 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors duration-200"
              style={{ color: '#F5E6C8' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#F5E6C8')}
              aria-label="Siguiente imagen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '20px' : '8px',
                height: '8px',
                backgroundColor: i === current ? '#C9A84C' : 'rgba(245,230,200,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ImageGrid ────────────────────────────────────────────────────────────────

interface ImageGridProps {
  images: GalleryImage[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 rounded-xl" style={{ backgroundColor: '#1a1a1a' }}>
        <p className="text-sm" style={{ color: 'rgba(245,230,200,0.4)' }}>
          Próximamente — imágenes del cliente
        </p>
      </div>
    );
  }

  const gridClass =
    images.length === 1
      ? 'grid-cols-1'
      : images.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid ${gridClass} gap-3`}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIdx(i)}
            className="group relative overflow-hidden rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2"
            style={{ aspectRatio: '4/3', focusVisibleRingColor: '#C9A84C' } as React.CSSProperties}
            aria-label={`Ver imagen: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={GPU_STYLE}
              loading="lazy"
              decoding="async"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
              <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.5)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-xs font-medium truncate" style={{ color: 'rgba(245,230,200,0.9)' }}>{img.alt}</p>
            </div>
          </button>
        ))}
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
};

// ─── PropertyShowcase ─────────────────────────────────────────────────────────

export interface PropertyShowcaseProps {
  sectionTitle?: string;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  sectionTitle = 'Galería del Desarrollo',
}) => {
  const [activeTab, setActiveTab] = useState<string>('amenidades');

  const currentTab = TABS.find(t => t.id === activeTab) ?? TABS[0];

  return (
    <section
      id="recorridos"
      className="py-20 md:py-28 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#0f0f0f' }}
      aria-label={sectionTitle}
    >
      {/* ── Header ── */}
      <div className="mb-10 md:mb-14">
        <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: '#C9A84C' }}>
          Ciudad Maderas
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 leading-tight" style={{ color: '#F5E6C8' }}>
          {sectionTitle}
        </h2>
        <p className="mt-3 max-w-xl text-sm md:text-base" style={{ color: 'rgba(245,230,200,0.6)' }}>
          Explora cada espacio del desarrollo — desde amenidades del fraccionamiento hasta los interiores de las casas.
        </p>
      </div>

      {/* ── Card principal ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#111111',
          border: '1px solid rgba(201,168,76,0.15)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Tabs ── */}
        <div
          className="flex overflow-x-auto"
          role="tablist"
          aria-label="Secciones de la galería"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 relative flex-shrink-0"
                style={{
                  color: isActive ? '#C9A84C' : 'rgba(245,230,200,0.45)',
                  backgroundColor: isActive ? 'rgba(201,168,76,0.07)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(245,230,200,0.8)';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(245,230,200,0.45)';
                }}
              >
                {tab.icon}
                {tab.label}
                {/* Active underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: '#C9A84C' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Panel de contenido ── */}
        <div
          id={`panel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentTab.id}`}
          className="p-5 md:p-7"
        >
          {/* Description */}
          <p className="text-sm mb-5" style={{ color: 'rgba(245,230,200,0.55)' }}>
            {currentTab.description}
          </p>

          {/* Image grid */}
          <ImageGrid images={currentTab.images} />

          {/* Nota de fotos próximas */}
          {(currentTab.id === 'privada' || currentTab.id === 'publica') && (
            <p className="mt-4 text-xs" style={{ color: 'rgba(245,230,200,0.3)' }}>
              * Imágenes representativas. Fotos de unidades reales próximamente.
            </p>
          )}
        </div>
      </div>

      {/* ── Videos con autoplay por visibilidad ── */}
      <div className="mt-14">
        <h3 className="text-xl font-bold mb-6" style={{ color: '#F5E6C8' }}>
          Recorridos en Video
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AutoplayVideo
            webmSrc="/assets/Videos/recorrido-1.webm"
            mp4Src="/assets/Videos/recorrido-1.mp4"
            poster="/assets/images/recorrido-1-poster.avif"
            title="Recorrido General — Áreas comunes y acceso"
          />
          <AutoplayVideo
            webmSrc="/assets/Videos/recorrido-2.webm"
            mp4Src="/assets/Videos/recorrido-2.mp4"
            poster="/assets/images/recorrido-2-poster.avif"
            title="Vista de Amenidades — Piscina y jardines"
          />
        </div>
      </div>
    </section>
  );
};
