"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface CarouselImage {
  src: string;
  alt: string;
}

interface PropertyCarouselProps {
  title?: string;
  description?: string;
  images?: CarouselImage[];
}

// ─── Default images (usar mientras llegan fotos del cliente) ──────────────────

const DEFAULT_IMAGES: CarouselImage[] = [
  {
    src: "/assets/images/acceso-panoramico.avif",
    alt: "Acceso principal Ciudad Maderas",
  },
  {
    src: "/assets/images/alberca.avif",
    alt: "Club house y alberca",
  },
  {
    src: "/assets/images/acceso-frontal.avif",
    alt: "Entrada al desarrollo",
  },
  {
    src: "/assets/images/aerea.avif",
    alt: "Vista aérea del desarrollo",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function PropertyCarousel({
  title = "Galería del Desarrollo",
  description = "Conoce los espacios y amenidades que Ciudad Maderas tiene para ti.",
  images = DEFAULT_IMAGES,
}: PropertyCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Card
      className="border-none overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* ── Carrusel ── */}
      <div className="relative rounded-t-xl overflow-hidden">
        {/* Badge Ciudad Maderas */}
        <Badge
          className="absolute top-4 left-4 z-10 text-xs font-semibold"
          style={{
            backgroundColor: "#C9A84C",
            color: "#0f0f0f",
          }}
        >
          Ciudad Maderas
        </Badge>

        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      transform: "translateZ(0)",
                      willChange: "transform",
                    }}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Flechas de navegación */}
          <CarouselPrevious
            className="left-4 border-none"
            style={{
              color: "#F5E6C8",
              backgroundColor: "rgba(15,15,15,0.55)",
            }}
          />
          <CarouselNext
            className="right-4 border-none"
            style={{
              color: "#F5E6C8",
              backgroundColor: "rgba(15,15,15,0.55)",
            }}
          />
        </Carousel>

        {/* Indicadores de posición */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index === current
                    ? "#C9A84C"
                    : "rgba(245, 230, 200, 0.3)",
                transform: index === current ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Card Content ── */}
      <CardContent
        className="p-6"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <h3
          className="text-xl font-bold"
          style={{ color: "#F5E6C8" }}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "rgba(245, 230, 200, 0.6)" }}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
