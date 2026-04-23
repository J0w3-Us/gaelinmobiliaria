import React from 'react';

export interface HeroContentProps {
  title: string;
  subtitle: string;
  onPlayVideo: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  title,
  subtitle,
  onPlayVideo,
}) => {
  const handleScrollToLotes = () => {
    const section = document.getElementById('lotes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full px-6 pb-24 md:px-12 md:pb-28 lg:px-24 flex flex-col items-start gap-4 max-w-5xl">

      {/* Eyebrow — pill with subtle background for legibility */}
      <span
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                   bg-black/30 backdrop-blur-sm border border-[#C9A84C]/40
                   text-[#C9A84C] text-[0.65rem] md:text-xs uppercase tracking-[0.28em] font-semibold"
      >
        <span className="w-1 h-1 rounded-full bg-[#C9A84C] shrink-0" />
        Ciudad Maderas · Inversión Residencial
      </span>

      {/* H1 — strong text shadow so it reads over any video frame */}
      <h1 className="text-[#F5E6C8] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-[#F5E6C8]/80 text-base md:text-lg max-w-xl font-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
        {subtitle}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
        {/* Primary — dorado sólido */}
        <button
          onClick={onPlayVideo}
          className="group inline-flex justify-center items-center gap-2
                     bg-[#C9A84C] text-neutral-950 hover:bg-[#dbb95a]
                     h-13 px-7 text-sm font-semibold tracking-wide
                     rounded-sm w-full sm:w-auto transition-all duration-200
                     shadow-[0_4px_24px_rgba(201,168,76,0.35)]
                     hover:shadow-[0_4px_32px_rgba(201,168,76,0.55)]
                     active:scale-[0.98]"
        >
          {/* Play icon */}
          <svg className="w-4 h-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Ver recorrido
        </button>
      </div>
    </div>
  );
};
