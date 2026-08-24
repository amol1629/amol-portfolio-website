"use client";

import { useRef, useEffect, useState, memo, useMemo } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, LayoutGrid, Rows3 } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { LiquidGlassCard, glassAccentColors, Tooltip, ResponsiveShowMore } from "@/components/shared";
import type { Testimonial } from "./testimonials.data";
import type { ReactNode } from "react";

interface TestimonialsClientProps {
  testimonials: Testimonial[];
}

const CARD_WIDTH = 450 + 24;
const MOBILE_VISIBLE_COUNT = 3;

interface TestimonialCardProps {
  testimonial: Testimonial;
  isMasonry?: boolean;
}

const TestimonialCard = memo(function TestimonialCard({ testimonial, isMasonry = false }: TestimonialCardProps): ReactNode {
  const colors = glassAccentColors[testimonial.accent];
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group ${isMasonry ? "w-full" : "w-[400px] md:w-[450px] flex-shrink-0"}`}
    >
      <LiquidGlassCard
        className={`h-full relative overflow-hidden transition-all duration-300 flex flex-col ${isMasonry ? "min-h-[280px]" : ""}`}
        style={{
          boxShadow: `0 0 0 1px ${colors.border}, 0 4px 20px rgba(0,0,0,0.2)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${colors.glow}, transparent 40%)`,
          }}
        />

        <div
          className="absolute -top-4 -left-2 text-[120px] font-serif leading-none pointer-events-none select-none"
          style={{
            background: `linear-gradient(135deg, ${colors.text}20, ${colors.text}05)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          &ldquo;
        </div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          {testimonial.highlight && (
            <span
              className="px-3 py-1 text-xs font-medium rounded-full border"
              style={{
                background: colors.bg,
                color: colors.text,
                borderColor: colors.border,
              }}
            >
              {testimonial.highlight}
            </span>
          )}
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 transition-all duration-300"
                style={{
                  fill: isInView ? "#fbbf24" : "transparent",
                  color: isInView ? "#fbbf24" : "rgba(255,255,255,0.2)",
                  transitionDelay: isInView ? `${i * 100}ms` : "0ms",
                }}
              />
            ))}
          </div>
        </div>

        <p className={`text-[rgb(var(--color-fg-secondary))] leading-relaxed mb-6 relative z-10 ${isMasonry ? "line-clamp-4" : ""}`}>
          {testimonial.content}
        </p>

        <div className="flex items-center gap-4 relative z-10 mt-auto">
          <div
            className="relative w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
            style={{
              background: colors.bg,
              boxShadow: `0 0 0 2px ${colors.border}`,
            }}
          >
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-lg font-bold"
                style={{ color: colors.text }}
              >
                {testimonial.author.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-[rgb(var(--color-fg-primary))]">
              {testimonial.author}
            </div>
            <div className="text-sm text-[rgb(var(--color-fg-tertiary))]">
              {testimonial.role}
            </div>
            <div className="text-xs" style={{ color: colors.text }}>
              {testimonial.company}
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
});

function TestimonialsClientComponent({ testimonials }: TestimonialsClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "masonry">("carousel");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);

  const totalCards = testimonials.length;

  useEffect(() => {
    if (prefersReducedMotion || !scrollRef.current || viewMode !== "carousel") return;

    const scrollElement = scrollRef.current;
    let animationId: number;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        positionRef.current -= speed;
        const halfWidth = scrollElement.scrollWidth / 2;
        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current = 0;
        }
        scrollElement.style.transform = `translateX(${positionRef.current}px)`;

        const newIndex = Math.floor(Math.abs(positionRef.current) / CARD_WIDTH) % totalCards;
        setCurrentIndex(newIndex);
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [prefersReducedMotion, isPaused, viewMode, totalCards]);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    positionRef.current = -index * CARD_WIDTH;
    scrollRef.current.style.transform = `translateX(${positionRef.current}px)`;
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? totalCards - 1 : currentIndex - 1;
    scrollToCard(newIndex);
    setIsPaused(true);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % totalCards;
    scrollToCard(newIndex);
    setIsPaused(true);
  };

  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10 self-start md:self-auto md:ml-auto">
          <Tooltip content="Carousel view" position="bottom">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`min-w-[44px] min-h-[44px] p-2.5 rounded-md transition-all flex items-center justify-center ${
                viewMode === "carousel"
                  ? "bg-white/10 text-white"
                  : "text-[rgb(var(--color-fg-tertiary))] hover:text-white"
              }`}
              aria-label="Carousel view"
            >
              <Rows3 className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip content="Grid view" position="bottom">
            <button
              type="button"
              onClick={() => setViewMode("masonry")}
              className={`min-w-[44px] min-h-[44px] p-2.5 rounded-md transition-all flex items-center justify-center ${
                viewMode === "masonry"
                  ? "bg-white/10 text-white"
                  : "text-[rgb(var(--color-fg-tertiary))] hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden">
        <ResponsiveShowMore initialCount={MOBILE_VISIBLE_COUNT} className="grid grid-cols-1 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <TestimonialCard testimonial={testimonial} isMasonry />
            </motion.div>
          ))}
        </ResponsiveShowMore>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {viewMode === "carousel" ? (
          <div>
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors -ml-5"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors -mr-5"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="overflow-hidden px-4">
                <div
                  ref={scrollRef}
                  className="flex gap-6"
                  style={{ width: "max-content" }}
                >
                  {duplicatedTestimonials.map((testimonial, index) => (
                    <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    scrollToCard(index);
                    setIsPaused(true);
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-6 h-2 bg-gradient-to-r from-cyan-400 to-purple-400"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <TestimonialCard testimonial={testimonial} isMasonry />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}

export const TestimonialsClient = memo(TestimonialsClientComponent);
