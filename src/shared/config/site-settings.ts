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
  heroVideoWebm: "/assets/videos/ciudad_madera.mp4",   // no webm disponible — mismo mp4 en ambos
  heroVideoMp4:  "/assets/videos/ciudad_madera.mp4",
  heroPoster:    "/assets/images/paronamica_ciudad_madera.jpg",

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
  phoneNumber:     "tel:+529901288262",
  phoneDisplay:    "990 128 8262",   // texto legible para mostrar en UI

  // ── Footer ─────────────────────────────────────────────────────────────────
  email:    "gaelnohciudadmaderas@gmail.com",

  whatsappCotizarMsg: (nombre: string, telefono: string, email: string) =>
    `Hola, me interesa cotizar en Ciudad Maderas.%0AMi nombre es ${nombre}.%0AMi número es ${telefono}.%0ACorreo: ${email || 'N/A'}`,

  // ── New video assets (BlogSection + CompanyInfo + Hero) ────────────────────
  videoHero:          "/assets/videos/ciudad_madera.mp4",
  videoHeroFallback:  "/assets/videos/paronamica.mp4",
  videoQueEs:         "/assets/videos/que_es.mp4",
  videoQuienesSomos:  "/assets/videos/quienes_somos.mp4",
  videoPanoramica:    "/assets/videos/paronamica.mp4",
  videoRecorrido1:    "/assets/videos/recorrido1.mp4",
  videoRecorrido2:    "/assets/videos/recorrido2.mp4",
  videoBlog1:         "/assets/videos/blog1.mp4",

  // ── New image assets ────────────────────────────────────────────────────────
  imgVistaAire:       "/assets/images/vista_aire.jpg",
  imgCancha:          "/assets/images/cancha.jpg",
  imgGym:             "/assets/images/Gym.jpg",          // ⚠️ G mayúscula — Linux case-sensitive
  imgPanoramica:      "/assets/images/paronamica_ciudad_madera.jpg",
  imgModeloAura:      "/assets/images/modelo_aura.jpg",
  imgCasa1:           "/assets/images/casa1.jpg",
  imgSala1:           "/assets/images/sala1.jpg",
  imgExterior:        "/assets/images/Exterior.jpg",     // ⚠️ E mayúscula — Linux case-sensitive
  imgCiudadMaderaExt: "/assets/images/ciudad_madera_exterior.jpg",
  imgCiudadMadera:    "/assets/images/ciudad_madera.jpg",


  // ── Nav links ──────────────────────────────────────────────────────────────
  // navLinks se definen en Navbar.astro.
  // El enlace "Lotes" está comentado ahí también, usando la misma convención:
  // { label: "Lotes", href: "#lotes" }, // oculto temporalmente

  // ── Galería (scroll cinematográfico) ───────────────────────────────────────
  galeria: [
    { id: "01", categoria: "VISTA AÉREA",    titulo: "Todo el desarrollo desde arriba",   descripcion: "Canchas, alberca, club house y calles privadas.", img: "/assets/images/vista_aire.jpg",              pos: "center center" },
    { id: "02", categoria: "AMENIDADES",     titulo: "Canchas de pádel profesionales",    descripcion: "Dos canchas techadas de uso exclusivo para residentes.", img: "/assets/images/cancha.jpg",                  pos: "center center" },
    { id: "03", categoria: "AMENIDADES",     titulo: "Gimnasio totalmente equipado",      descripcion: "Área de fitness incluida en tu mensualidad.", img: "/assets/images/Gym.jpg",                     pos: "center top"    },
    { id: "04", categoria: "EL DESARROLLO",  titulo: "El corazón de Ciudad Maderas",      descripcion: "Calles arboladas y áreas comunes de uso diario.", img: "/assets/images/ciudad_madera.jpg",            pos: "center center" },
    { id: "05", categoria: "ACCESO",         titulo: "Entrada al desarrollo",             descripcion: "Acceso controlado las 24 horas.", img: "/assets/images/ciudad_madera_exterior.jpg",  pos: "center center" },
    { id: "06", categoria: "MODELO AURA",    titulo: "Tu casa, lista para construir",     descripcion: "Elige el modelo que se adapta a tu familia.", img: "/assets/images/modelo_aura.jpg",             pos: "center center" },
    { id: "07", categoria: "INTERIORES",     titulo: "Espacios que inspiran",             descripcion: "Diseño interior de alto nivel en cada modelo.", img: "/assets/images/sala1.jpg",                   pos: "center center" },
    { id: "08", categoria: "FACHADA",        titulo: "Arquitectura que permanece",        descripcion: "Estilo contemporáneo con materiales premium.", img: "/assets/images/Exterior.jpg",                pos: "center bottom" },
  ],
} as const;

export type SiteConfig = typeof SITE_CONFIG;
