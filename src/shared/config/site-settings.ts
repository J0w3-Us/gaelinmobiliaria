// ─── Assets estáticos — todos viven en /public/ ─────────────────────────────
//
// REGLA: Si una ruta debe usarse en un atributo src/poster/href de HTML,
//        el archivo DEBE estar en public/.  Astro copia public/ a dist/ tal cual,
//        por lo que la URL en producción es exactamente el mismo string que en dev.
//
// Ruta física                              URL resultante
// public/assets/videos/hero.webm    →  /assets/videos/hero.webm  (dev + prod)
// public/assets/images/hero-poster.avif →  /assets/images/hero-poster.avif
//
// NUNCA uses /src/assets/ como ruta de string — ese directorio no existe en dist/.

export const SITE_CONFIG = {
  // ── Brand ──────────────────────────────────────────────────────────────────
  siteName: "Gael Inmobiliaria",
  tagline: "by Ciudad Maderas",
  eyebrow: "Ciudad Maderas · Inversión Residencial",

  // ── Hero copy ──────────────────────────────────────────────────────────────
  heroTitle: "Tu lote en el mejor desarrollo de la región",
  heroSubtitle: "Vive o invierte en espacios diseñados para crecer contigo.",

  // ── Hero video — fondo en bucle (sin audio) ────────────────────────────────
  heroVideoWebm: "/assets/videos/hero.webm",
  heroVideoMp4:  "/assets/videos/hero.mp4",
  heroPoster:    "/assets/images/hero-poster.avif",

  // ── Modal video — recorrido-1 (con audio) ─────────────────────────────────
  modalVideoWebm: "/assets/videos/recorrido-1.webm",
  modalVideoMp4:  "/assets/videos/recorrido-1.mp4",
  modalPoster:    "/assets/images/recorrido-1-poster.avif",

  // ── Showcase — recorrido-2 ─────────────────────────────────────────────────
  showcaseVideoWebm: "/assets/videos/recorrido-2.webm",
  showcaseVideoMp4:  "/assets/videos/recorrido-2.mp4",
  showcasePoster:    "/assets/images/recorrido-2-poster.avif",

  // ── Contact ────────────────────────────────────────────────────────────────
  whatsappNumber:  "521XXXXXXXXXX",
  whatsappMessage: encodeURIComponent("Hola, me interesa conocer más sobre Ciudad Maderas"),
  phoneNumber:     "tel:+521XXXXXXXXXX",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
