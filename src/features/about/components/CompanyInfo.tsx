"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── Component ────────────────────────────────────────────────────────────────

export function CompanyInfo() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contacto");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="quienes-somos"
      style={{ backgroundColor: "#0f0f0f", padding: "6rem 1.5rem" }}
      className="md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Lado Izquierdo: Texto ── */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          <p
            className="text-sm uppercase tracking-widest font-semibold"
            style={{ color: "#C9A84C" }}
          >
            Respaldo y Experiencia
          </p>

          {/* Título */}
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight max-w-lg mt-3"
            style={{ color: "#F5E6C8" }}
          >
            Más de una década construyendo patrimonio en la Península
          </h2>

          {/* Párrafo 1 */}
          <p
            className="text-base leading-relaxed mt-5"
            style={{ color: "rgba(245, 230, 200, 0.7)" }}
          >
            Gael Group Inmobiliaria es el aliado estratégico de Ciudad Maderas,
            el desarrollo residencial premium ubicado en el corazón de Yucatán.
            Con más de 10 años en el mercado inmobiliario de la Península,
            respaldamos cada inversión con transparencia, certeza jurídica
            y acompañamiento personalizado.
          </p>

          {/* Párrafo 2 */}
          <p
            className="text-base leading-relaxed mt-4"
            style={{ color: "rgba(245, 230, 200, 0.7)" }}
          >
            Ofrecemos crédito directo sin aval y sin revisión de buró,
            con pagos desde $1,120 al mes. Tu terreno puede ser tuyo hoy.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {/* Crédito Directo — dorado sólido */}
            <Badge
              style={{
                backgroundColor: "#C9A84C",
                color: "#0f0f0f",
                fontWeight: 600,
              }}
            >
              Crédito Directo
            </Badge>

            {/* Sin Buró — dorado outline */}
            <Badge
              style={{
                backgroundColor: "rgba(201, 168, 76, 0.15)",
                color: "#C9A84C",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                fontWeight: 600,
              }}
            >
              Sin Buró
            </Badge>

            {/* Certeza Jurídica — dorado outline */}
            <Badge
              style={{
                backgroundColor: "rgba(201, 168, 76, 0.15)",
                color: "#C9A84C",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                fontWeight: 600,
              }}
            >
              Certeza Jurídica
            </Badge>
          </div>
        </div>

        {/* ── Lado Derecho: Video ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            border: "1px solid rgba(201, 168, 76, 0.2)",
            boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.15)",
          }}
        >
          <video
            className="w-full h-full object-cover"
            poster="/assets/images/ciudad_madera.jpg"
            src="/assets/videos/que_es.mp4"
            controls
            playsInline
            preload="metadata"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            Tu navegador no soporta la reproducción de video HTML5.
          </video>
        </div>

      </div>
    </section>
  );
}
