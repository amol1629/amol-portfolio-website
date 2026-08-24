"use client";

import { cn } from "@/lib/cn";
import { useScrollY, useReducedMotion } from "@/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

/**
 * BackToTop
 *
 * Button that appears after scrolling and scrolls to top on click.
 */
interface BackToTopProps {
  className?: string;
  threshold?: number;
}

export function BackToTop({
  className,
  threshold = 500,
}: BackToTopProps): ReactNode {
  const scrollY = useScrollY();
  const prefersReducedMotion = useReducedMotion();
  const isVisible = scrollY > threshold;

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-[var(--z-fixed)] p-3 rounded-full glass glass-strong shadow-lg",
            "hover:shadow-[var(--shadow-glow-cyan)] transition-shadow",
            className
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
