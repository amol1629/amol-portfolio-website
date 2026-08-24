"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string | undefined;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
}

export function ImageCarousel({ images, className }: ImageCarouselProps): ReactNode {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[rgb(var(--color-bg-tertiary))]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {currentImage.caption && (
        <p className="mt-2 text-sm text-[rgb(var(--color-fg-tertiary))] text-center">
          {currentImage.caption}
        </p>
      )}

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Go to image ${index + 1}`}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex
                    ? "bg-[rgb(var(--color-accent-cyan))]"
                    : "bg-white/20 hover:bg-white/40"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
