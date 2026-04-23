import React, { useState, useEffect } from 'react';

export interface CotizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  whatsappMessage: (nombre: string, telefono: string, email: string) => string;
}

export const CotizarModal: React.FC<CotizarModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber,
  whatsappMessage,
}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form on close
      setNombre('');
      setTelefono('');
      setEmail('');
      setError(null);
      setIsLoading(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (nombre.trim().length < 2) {
      setError('Por favor ingresa tu nombre (mínimo 2 caracteres).');
      return;
    }
    if (!/^\d{10}$/.test(telefono.replace(/\D/g, ''))) {
      setError('El teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    setIsLoading(true);

    // Simulate short processing time for UX "premium feel"
    setTimeout(() => {
      const msg = whatsappMessage(nombre.trim(), telefono.replace(/\D/g, ''), email.trim());
      const url = `https://wa.me/${whatsappNumber}?text=${msg}`;
      window.open(url, '_blank');
      
      setIsLoading(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* DialogOverlay */}
      <div 
        className="absolute inset-0 transition-opacity"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        aria-hidden="true"
        onClick={onClose}
      />
      
      {/* DialogContent */}
      <div 
        className="relative z-10 w-[90vw] max-w-md p-8 rounded-2xl flex flex-col"
        style={{
          background: '#1a1a1a',
          border: '1px solid rgba(201,168,76,0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cotizar-title"
      >
        {/* Botón cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#F5E6C8]/40 hover:text-[#F5E6C8] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] rounded-sm"
          aria-label="Cerrar modal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header del modal */}
        <div style={{ width: 40, height: 1, backgroundColor: '#C9A84C', marginBottom: 20 }} aria-hidden="true" />
        <span 
          className="uppercase mb-1 block leading-none"
          style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, letterSpacing: '0.2em', color: '#C9A84C' }}
        >
          CIUDAD MADERAS
        </span>
        <h2 
          id="cotizar-title"
          className="leading-none mt-1"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.875rem', fontWeight: 300, color: '#F5E6C8' }}
        >
          Solicita tu cotización
        </h2>
        <p className="mt-2 text-sm" style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.5)' }}>
          Te contactamos en menos de 2 horas.
        </p>

        {/* Separador */}
        <div style={{ width: '100%', height: 1, backgroundColor: 'rgba(245,230,200,0.08)', marginTop: 24, marginBottom: 24 }} aria-hidden="true" />

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 text-xs text-center" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Campo 1 — Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="uppercase tracking-wider text-xs" style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.6)' }}>
              Nombre completo *
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              placeholder="Tu nombre"
              className="w-full rounded-lg outline-none transition-colors duration-200 placeholder:text-[#F5E6C8]/25"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(245,230,200,0.12)',
                padding: '12px 16px',
                color: '#F5E6C8',
                fontSize: 15,
                fontFamily: '"DM Sans", sans-serif',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(245,230,200,0.12)'}
            />
          </div>

          {/* Campo 2 — Teléfono */}
          <div className="flex flex-col gap-2">
            <label htmlFor="telefono" className="uppercase tracking-wider text-xs" style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.6)' }}>
              Teléfono / WhatsApp *
            </label>
            <input
              id="telefono"
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              required
              maxLength={10}
              pattern="[0-9]{10}"
              placeholder="10 dígitos"
              className="w-full rounded-lg outline-none transition-colors duration-200 placeholder:text-[#F5E6C8]/25"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(245,230,200,0.12)',
                padding: '12px 16px',
                color: '#F5E6C8',
                fontSize: 15,
                fontFamily: '"DM Sans", sans-serif',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(245,230,200,0.12)'}
            />
            <span className="text-[11px]" style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.3)', marginTop: 4 }}>
              Te enviaremos la info por este número
            </span>
          </div>

          {/* Campo 3 — Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="uppercase tracking-wider text-xs" style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.6)' }}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full rounded-lg outline-none transition-colors duration-200 placeholder:text-[#F5E6C8]/25"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(245,230,200,0.12)',
                padding: '12px 16px',
                color: '#F5E6C8',
                fontSize: 15,
                fontFamily: '"DM Sans", sans-serif',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(245,230,200,0.12)'}
            />
            <span className="text-[11px]" style={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(245,230,200,0.3)', marginTop: 4 }}>
              Opcional — para enviarte información adicional
            </span>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:brightness-110 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] focus-visible:ring-[#C9A84C]"
            style={{
              backgroundColor: '#C9A84C',
              color: '#0f0f0f',
              fontWeight: 600,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              padding: '14px',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0f0f0f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              'Solicitar cotización'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
