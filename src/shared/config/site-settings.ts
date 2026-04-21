// ─── All paths served from /public → use /assets/... prefix ───────────────
// Videos live in src/assets/Videos/ (Windows mounts as case-insensitive)
// Astro serves src/assets/ files via /src/assets/ during dev,
// but for <video src=...> in .astro templates use public/ folder convention.
// Here we use the /assets/videos/ prefix that maps to public for production use.
// Adjust if you move videos to /public/assets/videos/.

export const SITE_CONFIG = {
  // ── Brand ──────────────────────────────────────────────────────────────
  siteName: "Gael Inmobiliaria",
  tagline: "by Ciudad Maderas",
  eyebrow: "Ciudad Maderas · Inversión Residencial",

  // ── Hero copy ──────────────────────────────────────────────────────────
  heroTitle: "Tu lote en el mejor desarrollo de la región",
  heroSubtitle: "Vive o invierte en espacios diseñados para crecer contigo.",

  // ── Hero video — background (sin audio) ───────────────────────────────
  heroVideoWebm: "/src/assets/Videos/hero.webm",
  heroVideoMp4:  "/src/assets/Videos/hero.mp4",
  heroPoster:    "/src/assets/images/hero-poster.avif",

  // ── Modal video — recorrido principal (con audio) ─────────────────────
  modalVideoWebm: "/src/assets/Videos/recorrido-1.webm",
  modalVideoMp4:  "/src/assets/Videos/recorrido-1.mp4",
  modalPoster:    "/src/assets/images/recorrido-1-poster.avif",

  // ── Contact ────────────────────────────────────────────────────────────
  whatsappNumber:  "521XXXXXXXXXX",
  whatsappMessage: encodeURIComponent("Hola, me interesa conocer más sobre Ciudad Maderas"),
  phoneNumber:     "tel:+521XXXXXXXXXX",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
