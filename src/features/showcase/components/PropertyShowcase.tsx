'use client';

import React from 'react';
import { usePropertyShowcase } from '../hooks/usePropertyShowcase';

// ─── GPU Acceleration ─────────────────────────────────────────────────────────
const GPU_STYLE: React.CSSProperties = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  willChange: 'transform, opacity',
} as const;

export interface PropertyShowcaseProps {
  sectionTitle?: string;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  sectionTitle = 'Galería del Desarrollo',
}) => {
  const {
    activeIndex,
    isPaused,
    setIsPaused,
    items,
    handleSelect,
    activeItem
  } = usePropertyShowcase();

  return (
    <section
      id="galeria"
      className="bg-[#0f0f0f] py-20 md:py-32 px-6 md:px-16 border-t border-[#C9A84C]/10"
      aria-label={sectionTitle}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* ── Left Column: Text & Controls ── */}
        <div className="flex-1 w-full lg:max-w-md shrink-0">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[#C9A84C]" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-sans">
              VISTAS · CIUDAD MADERAS
            </span>
          </div>

          <h2 className="mb-10 leading-tight font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-light text-[#F5E6C8]">
            {sectionTitle}
          </h2>

          {/* Changing Content */}
          <div 
            className="min-h-[160px] relative"
            key={activeIndex} // Changing the key re-triggers the CSS animation
          >
            <div className="showcase-fade-up">
              <span className="block mb-2 uppercase text-[10px] tracking-[0.15em] text-[#C9A84C] font-sans">
                {activeItem.categoria}
              </span>
              <h3 className="mb-3 leading-tight font-serif text-[clamp(1.5rem,2.5vw,2rem)] text-[#F5E6C8] font-light">
                {activeItem.titulo}
              </h3>
              <p className="leading-relaxed text-[13px] md:text-sm font-sans text-[#F5E6C8]/60">
                {activeItem.descripcion}
              </p>
            </div>
          </div>

          {/* Indicators / Controls */}
          <div className="flex items-center gap-3 mt-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="group p-2 -m-2 focus:outline-none"
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={activeIndex === i}
              >
                <div 
                  className={`h-[2px] transition-all duration-300 ease-out ${activeIndex === i ? 'bg-[#C9A84C]' : 'bg-[#F5E6C8]/20'}`}
                  style={{ width: activeIndex === i ? 36 : 16 }} 
                />
              </button>
            ))}
          </div>
          
          <div className="mt-6 text-[11px] tracking-wider font-serif text-[#F5E6C8]/30">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
        </div>

        {/* ── Right Column: Image Card ── */}
        <div 
          className="flex-1 w-full relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image Container — Aspect Ratio 4:3 or similar */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-2xl aspect-4/3 border border-[#C9A84C]/15 bg-[#111]">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
                  zIndex: activeIndex === i ? 2 : 1,
                }}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url("${item.img}")`,
                    backgroundPosition: item.pos,
                    // Subtle Ken Burns zoom effect when active
                    transform: activeIndex === i ? 'scale(1)' : 'scale(1.05)',
                    transition: 'transform 8s ease-out',
                    ...GPU_STYLE
                  }}
                />
                
                {/* Overlay for better integration */}
                <div 
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent from-0% to-40%"
                />
              </div>
            ))}
          </div>
          
          {/* Legal / Note */}
          <div className="mt-4 text-left lg:text-right text-[10px] tracking-wide font-sans text-[#F5E6C8]/25">
            * Fotografías reales del desarrollo. Imágenes representativas.
          </div>
        </div>

      </div>

      <style>{`
        .aspect-4\\/3 {
          aspect-ratio: 4 / 3;
        }
        @keyframes showcaseFadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .showcase-fade-up {
          animation: showcaseFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};
