"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { fadeUp, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import type { ReactNode } from "react";

/**
 * SectionHeading
 *
 * Consistent heading component for section titles.
 * Includes optional label (eyebrow), main title, and description.
 *
 * Props:
 * - label: Small eyebrow text above title (e.g., "About", "Services")
 * - title: Main heading text
 * - description: Supporting text below title
 * - align: Text alignment (left, center, right)
 * - animate: Enable entrance animation
 */
interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  animate?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  animate = true,
  className,
}: SectionHeadingProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const content = (
    <div className={cn("max-w-2xl mb-12", alignClasses[align], className)}>
      {label && (
        <p className="text-sm font-mono text-[rgb(var(--color-accent-cyan))] mb-3 uppercase tracking-wider">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-[rgb(var(--color-fg-secondary))] text-pretty">
          {description}
        </p>
      )}
    </div>
  );

  if (!shouldAnimate) {
    return content;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      transition={defaultTransition}
    >
      {content}
    </motion.div>
  );
}
