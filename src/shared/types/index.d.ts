// ─── Global type definitions for Ciudad Maderas ────────────────────────────

export interface VideoItem {
  id: string;
  title: string;
  subtitle?: string;
  /** WebM source — primary (VP9, smaller) */
  videoWebm: string;
  /** MP4 source — fallback for Safari / iOS */
  videoMp4: string;
  /** AVIF poster — shown before playback starts */
  poster: string;
  /** Human-readable duration, e.g. "1:24" */
  duration?: string;
}

export interface PropertyLot {
  id: string;
  name: string;
  /** Area in m² */
  area: number;
  price: number;
  status: 'disponible' | 'reservado' | 'vendido';
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface HeroProps {
  videoWebm: string;
  videoMp4: string;
  poster: string;
  title: string;
  subtitle: string;
  /** WebM for the modal video */
  modalVideoWebm: string;
  /** MP4 fallback for the modal video */
  modalVideoMp4: string;
  modalPoster?: string;
}
