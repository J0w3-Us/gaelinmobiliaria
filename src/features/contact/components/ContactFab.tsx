import React, { useState, useEffect, useRef } from 'react';
import { CotizarModal } from './CotizarModal';
import { SITE_CONFIG } from '@/shared/config/site-settings';
export interface ContactFabProps {
  whatsappUrl: string;
  phoneNumber: string;
}

interface Action {
  id: string;
  label: string;
  sublabel: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  hoverColor: string;
}

export const ContactFab: React.FC<ContactFabProps> = ({ whatsappUrl, phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCotizarOpen, setIsCotizarOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const openCotizarModal = () => {
    setIsOpen(false);
    setIsCotizarOpen(true);
  };

  const actions: Action[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      sublabel: 'Escríbenos ahora',
      href: whatsappUrl,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12.031 21c-1.618 0-3.197-.417-4.582-1.205l-4.996 1.305 1.332-4.86A9.957 9.957 0 0 1 2.454 12C2.454 6.505 6.945 2 12.031 2c5.084 0 9.575 4.505 9.575 9.995 0 5.495-4.491 10.005-9.575 10.005Zm-3.136-3.844c1.196.797 2.607 1.22 4.053 1.22 4.095 0 7.399-3.32 7.399-7.381 0-4.056-3.303-7.38-7.399-7.38-4.095 0-7.398 3.324-7.398 7.38 0 1.545.485 3.035 1.398 4.29l-.794 2.894 2.96-.777Zm5.946-6.495c-.33-.166-1.954-.966-2.257-1.077-.302-.11-.523-.166-.745.166-.221.332-.853 1.077-1.045 1.3-.192.221-.385.249-.716.083-.33-.166-1.395-.515-2.658-1.642-.983-.878-1.647-1.96-1.84-2.292-.192-.332-.02-.511.144-.677.15-.149.33-.332.496-.498.165-.166.22-.277.33-.465.11-.194.055-.36-.027-.526-.083-.166-.745-1.798-1.02-2.46-.269-.65-.54-.564-.745-.572-.193-.008-.414-.008-.635-.008s-.58.083-.883.415c-.303.332-1.157 1.135-1.157 2.766s1.185 3.205 1.35 3.427c.166.221 2.33 3.559 5.642 5.002 2.29.996 3.048 1.078 4.28 1.024 1.037-.046 3.193-1.306 3.633-2.564.44-1.26.44-2.343.308-2.565-.137-.221-.495-.36-.826-.526Z" />
        </svg>
      ),
      color: '#25D366',
      textColor: '#ffffff',
      hoverColor: '#1db954',
    },
    {
      id: 'llamar',
      label: 'Llamar',
      sublabel: 'Atención directa',
      href: phoneNumber,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      color: 'transparent',
      textColor: '#F5E6C8',
      hoverColor: 'rgba(245,230,200,0.08)',
    },
    {
      id: 'cotizar',
      label: 'Cotizar',
      sublabel: 'Solicita tu presupuesto',
      onClick: openCotizarModal,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      color: '#C9A84C',
      textColor: '#0f0f0f',
      hoverColor: '#dbb95a',
    },
  ];

  return (
    <>
      {/* ── Backdrop blur overlay when open ── */}
      <div
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
          backdropFilter: isOpen ? 'blur(2px)' : 'none',
          backgroundColor: isOpen ? 'rgba(0,0,0,0.25)' : 'transparent',
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* ── FAB container — bottom-right ── */}
      <div
        ref={fabRef}
        className="fixed z-50 flex flex-col items-end gap-3"
        style={{
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
          right: '1.25rem',
        }}
        role="navigation"
        aria-label="Contacto rápido"
      >
        {/* ── Action items — staggered from bottom ── */}
        <div className="flex flex-col items-end gap-2.5">
          {actions.map((action, i) => {
            const delay = isOpen ? i * 60 : (actions.length - 1 - i) * 40;
            const translateY = isOpen ? 0 : 20;
            const opacity = isOpen ? 1 : 0;
            const scale = isOpen ? 1 : 0.85;

            const actionStyle: React.CSSProperties = {
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              transition: `all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
              pointerEvents: isOpen ? 'auto' : 'none',
            };

            const ButtonTag = action.href ? 'a' : 'button';
            const linkProps = action.href
              ? action.id === 'whatsapp'
                ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: action.href }  // tel: no abre nueva pestaña
              : { onClick: action.onClick, type: 'button' as const };

            return (
              <div key={action.id} style={actionStyle} className="flex items-center gap-3">
                {/* Label card */}
                <div
                  className="flex flex-col items-end rounded-xl px-3.5 py-2
                             bg-[#1a1a1a]/95 backdrop-blur-md
                             border border-white/10 shadow-xl"
                >
                  <span className="text-[#F5E6C8] text-sm font-semibold leading-tight">
                    {action.label}
                  </span>
                  <span className="text-[#F5E6C8]/45 text-[0.65rem] leading-tight">
                    {action.sublabel}
                  </span>
                </div>

                {/* Action button */}
                <ButtonTag
                  {...(linkProps as any)}
                  aria-label={action.label}
                  className="flex items-center justify-center w-12 h-12 rounded-full
                             shadow-lg transition-all duration-200 active:scale-95
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  style={{
                    backgroundColor: action.color,
                    color: action.textColor,
                    border: action.id === 'llamar'
                      ? '1.5px solid rgba(245,230,200,0.35)'
                      : 'none',
                    boxShadow: action.id === 'cotizar'
                      ? '0 4px 20px rgba(201,168,76,0.40)'
                      : action.id === 'whatsapp'
                      ? '0 4px 20px rgba(37,211,102,0.35)'
                      : '0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                  {action.icon}
                </ButtonTag>
              </div>
            );
          })}
        </div>

        {/* ── Main FAB trigger ── */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Cerrar contacto' : 'Abrir opciones de contacto'}
          aria-expanded={isOpen}
          className="relative flex items-center justify-center w-14 h-14 rounded-full
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60
                     active:scale-95"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, #2a2a2a, #1a1a1a)'
              : 'linear-gradient(135deg, #C9A84C, #a8882e)',
            boxShadow: isOpen
              ? '0 4px 24px rgba(0,0,0,0.5)'
              : '0 4px 28px rgba(201,168,76,0.55), 0 0 0 0px rgba(201,168,76,0)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: isOpen ? '1.5px solid rgba(201,168,76,0.30)' : 'none',
          }}
        >
          {/* Pulse ring — only when closed */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: 'rgba(201,168,76,0.3)',
                animationDuration: '2.4s',
              }}
            />
          )}

          {/* Icon — morphs between chat and X */}
          <span
            style={{
              transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: isOpen ? '#C9A84C' : '#0f0f0f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isOpen ? (
              // X icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              // Chat bubble icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </span>
        </button>
      </div>

      <CotizarModal
        isOpen={isCotizarOpen}
        onClose={() => setIsCotizarOpen(false)}
        whatsappNumber={SITE_CONFIG.whatsappNumber}
        whatsappMessage={SITE_CONFIG.whatsappCotizarMsg}
      />
    </>
  );
};
