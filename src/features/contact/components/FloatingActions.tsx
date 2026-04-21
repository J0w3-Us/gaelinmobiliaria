import React from 'react';

export interface FloatingActionsProps {
  whatsappUrl: string;
  phoneNumber: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  whatsappUrl,
  phoneNumber,
}) => {
  const scrollToContacto = () => {
    const section = document.getElementById('contacto');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 w-full z-50 bg-[#1a1a1a] border-t border-[#C9A84C]/30 
                  pb-[env(safe-area-inset-bottom)] lg:bottom-6 lg:right-6 lg:left-auto lg:w-auto 
                  // lg:bg-transparent lg:border-none lg:pb-0"
    >
      <div className="flex flex-row items-center justify-between gap-2 px-3 py-3 
                      lg:flex-col lg:bg-[#1a1a1a]/95 lg:backdrop-blur-md lg:p-3
                      lg:rounded-2xl lg:border lg:border-[#C9A84C]/30 lg:shadow-2xl">
        
        {/* Botón WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 lg:w-full flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95"
          aria-label="Enviar mensaje por WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.031 21c-1.618 0-3.197-.417-4.582-1.205l-4.996 1.305 1.332-4.86A9.957 9.957 0 0 1 2.454 12C2.454 6.505 6.945 2 12.031 2c5.084 0 9.575 4.505 9.575 9.995 0 5.495-4.491 10.005-9.575 10.005Zm-3.136-3.844c1.196.797 2.607 1.22 4.053 1.22 4.095 0 7.399-3.32 7.399-7.381 0-4.056-3.303-7.38-7.399-7.38-4.095 0-7.398 3.324-7.398 7.38 0 1.545.485 3.035 1.398 4.29l-.794 2.894 2.96-.777Zm5.946-6.495c-.33-.166-1.954-.966-2.257-1.077-.302-.11-.523-.166-.745.166-.221.332-.853 1.077-1.045 1.3-.192.221-.385.249-.716.083-.33-.166-1.395-.515-2.658-1.642-.983-.878-1.647-1.96-1.84-2.292-.192-.332-.02-.511.144-.677.15-.149.33-.332.496-.498.165-.166.22-.277.33-.465.11-.194.055-.36-.027-.526-.083-.166-.745-1.798-1.02-2.46-.269-.65-.54-.564-.745-.572-.193-.008-.414-.008-.635-.008s-.58.083-.883.415c-.303.332-1.157 1.135-1.157 2.766s1.185 3.205 1.35 3.427c.166.221 2.33 3.559 5.642 5.002 2.29.996 3.048 1.078 4.28 1.024 1.037-.046 3.193-1.306 3.633-2.564.44-1.26.44-2.343.308-2.565-.137-.221-.495-.36-.826-.526Z"/>
          </svg>
          <span className="hidden min-[370px]:inline">WhatsApp</span>
        </a>

        {/* Botón Llamar */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 lg:w-full flex items-center justify-center gap-1.5 border border-[#F5E6C8]/60 text-[#F5E6C8] py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors hover:bg-[#F5E6C8]/10 active:bg-[#F5E6C8]/20"
          aria-label="Llamar por teléfono"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="hidden min-[370px]:inline">Llamar</span>
        </a>

        {/* Botón Cotizar */}
        <button
          onClick={scrollToContacto}
          className="flex-1 lg:w-full flex items-center justify-center gap-1.5 bg-[#C9A84C] text-neutral-950 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95"
          aria-label="Ir a sección de cotización"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M9 14h6" />
            <path d="M9 10h6" />
            <path d="M9 18h6" />
          </svg>
          <span className="hidden min-[370px]:inline">Cotizar</span>
        </button>
      </div>
    </div>
  );
};
