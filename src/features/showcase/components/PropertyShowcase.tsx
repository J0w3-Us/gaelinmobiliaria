'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '@/shared/config/site-settings';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const items = SITE_CONFIG.galeria;

  // ─── Auto-play logic ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    
    // Auto-advance every 5 seconds
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, items.length]);

  const activeItem = items[activeIndex];

  return (
    <section
      id="galeria"
      className="bg-[#0f0f0f] py-20 md:py-32 px-6 md:px-16"
      style={{ borderTop: '1px solid rgba(201,168,76,0.10)' }}
      aria-label={sectionTitle}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* ── Left Column: Text & Controls ── */}
        <div className="flex-1 w-full lg:max-w-md shrink-0">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[#C9A84C]" aria-hidden="true" />
            <span 
              className="text-[10px] uppercase tracking-[0.2em]" 
              style={{ color: '#C9A84C', fontFamily: '"DM Sans", sans-serif' }}
            >
              VISTAS · CIUDAD MADERAS
            </span>
          </div>

          <h2 
            className="mb-10 leading-tight"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: '#F5E6C8',
            }}
          >
            {sectionTitle}
          </h2>

          {/* Changing Content */}
          <div 
            className="min-h-[160px] relative"
            key={activeIndex} // Changing the key re-triggers the CSS animation
          >
            <div className="showcase-fade-up">
              <span 
                className="block mb-2 uppercase text-[10px] tracking-[0.15em]"
                style={{ color: '#C9A84C', fontFamily: '"DM Sans", sans-serif' }}
              >
                {activeItem.categoria}
              </span>
              <h3 
                className="mb-3 leading-tight"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#F5E6C8', fontWeight: 300 }}
              >
                {activeItem.titulo}
              </h3>
              <p 
                className="leading-relaxed text-[13px] md:text-sm"
                style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.6)' }}
              >
                {activeItem.descripcion}
              </p>
            </div>
          </div>

          {/* Indicators / Controls */}
          <div className="flex items-center gap-3 mt-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  // Pause auto-play for 10s after manual interaction
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 10000);
                }}
                className="group p-2 -m-2 focus:outline-none"
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={activeIndex === i}
              >
                <div 
                  className="h-[2px] transition-all duration-300 ease-out"
                  style={{
                    width: activeIndex === i ? 36 : 16,
                    backgroundColor: activeIndex === i ? '#C9A84C' : 'rgba(245,230,200,0.2)',
                  }} 
                />
              </button>
            ))}
          </div>
          
          <div 
            className="mt-6 text-[11px] tracking-wider"
            style={{ fontFamily: '"Cormorant Garamond", serif', color: 'rgba(245,230,200,0.3)' }}
          >
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
          <div 
            className="relative w-full overflow-hidden rounded-xl shadow-2xl"
            style={{ 
              aspectRatio: '4 / 3',
              border: '1px solid rgba(201,168,76,0.15)',
              background: '#111'
            }}
          >
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
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)' }}
                />
                
                {/* Giant Decorative Number */}
                <div 
                  className="absolute bottom-[-15%] right-[-5%] leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(12rem, 20vw, 18rem)',
                    color: 'rgba(245,230,200,0.06)',
                    fontWeight: 300,
                  }}
                  aria-hidden="true"
                >
                  {item.id}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legal / Note */}
          <div 
            className="mt-4 text-left lg:text-right text-[10px] tracking-wide"
            style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.25)' }}
          >
            * Fotografías reales del desarrollo. Imágenes representativas.
          </div>
        </div>

      </div>

      <style>{`
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
