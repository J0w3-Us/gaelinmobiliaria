// ─── Assets estáticos — todos viven en /public/ ─────────────────────────────
//
// REGLA: Si una ruta debe usarse en un atributo src/poster/href de HTML,
//        el archivo DEBE estar en public/.  Astro copia public/ a dist/ tal cual,
//        por lo que la URL en producción es exactamente el mismo string que en dev.
//
// Ruta física                                   URL resultante
// public/assets/Videos/hero.webm       →  /assets/Videos/hero.webm
// public/assets/images/hero-poster.avif →  /assets/images/hero-poster.avif
//
// CRÍTICO — Linux / Render es case-sensitive:
//   /assets/Videos/  (V mayúscula) ← CORRECTO, coincide con la carpeta real
//   /assets/videos/  (v minúscula) ← 404 en producción
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
  // Lowercase 'videos' — matches the actual folder name on disk: public/assets/videos/
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
  //
  // whatsappNumber → solo dígitos, sin + ni espacios (formato wa.me)
  //   wa.me/5219992164097  ✓    wa.me/+52 1 999 216 4097  ✗
  //
  // phoneNumber    → E.164 sin espacios (formato href tel:)
  //   tel:+5219992164097  ✓    tel:+52 1 999 216 4097  ✗
  //
  whatsappNumber:  "5219992164097",
  whatsappMessage: encodeURIComponent("Hola, me interesa conocer más sobre Ciudad Maderas"),
  phoneNumber:     "tel:+5219992164097",
  phoneDisplay:    "999 216 4097",   // texto legible para mostrar en UI

  // ── Footer ─────────────────────────────────────────────────────────────────
  email:    "contacto@gaelgroupinmobiliaria.com",

  // ── Nav links ──────────────────────────────────────────────────────────────
  // navLinks se definen en Navbar.astro.
  // El enlace "Lotes" está comentado ahí también, usando la misma convención:
  // { label: "Lotes", href: "#lotes" }, // oculto temporalmente
} as const;

export type SiteConfig = typeof SITE_CONFIG;
