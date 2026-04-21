import React, { useState } from 'react';
import { VideoModal } from '../../hero/components/VideoModal';

export interface VideoCardData {
  id: string;
  title: string;
  subtitle?: string;
  poster: string;
  videoWebm: string;
  videoMp4: string;
  duration?: string;
}

interface VideoCardProps extends VideoCardData {
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
    onKeyDown={(e) => e.key === 'Enter' && onPlay()}
    aria-label={`Reproducir recorrido: ${title}`}
  >
    {/* Thumbnail — poster as background image */}
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

      {/* Play icon — centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full border border-[#F5E6C8]/60 bg-black/30 backdrop-blur-sm opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <svg
            className="w-6 h-6 text-[#F5E6C8] translate-x-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
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

export interface VideoGridProps {
  videos: VideoCardData[];
  sectionTitle?: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  sectionTitle = 'Recorridos Virtuales',
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoCardData | null>(null);

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
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
            onPlay={() => setActiveVideo(video)}
          />
        ))}
      </div>

      {/* Shared modal — only mounts when a card is clicked */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          videoWebm={activeVideo.videoWebm}
          videoMp4={activeVideo.videoMp4}
          posterSrc={activeVideo.poster}
        />
      )}
    </section>
  );
};
