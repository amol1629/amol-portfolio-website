"use client";

import type { ReactNode } from "react";

type ColorScheme = "cyan" | "purple" | "emerald" | "amber" | "mixed" | "neutral";

interface SectionBackgroundProps {
  children: ReactNode;
  colorScheme?: ColorScheme;
  className?: string;
  id?: string;
}

const colorSchemes: Record<ColorScheme, { border: string; glow: string }> = {
  cyan: {
    border: "rgba(0, 212, 255, 0.15)",
    glow: "rgba(0, 212, 255, 0.1)",
  },
  purple: {
    border: "rgba(124, 58, 237, 0.15)",
    glow: "rgba(124, 58, 237, 0.1)",
  },
  emerald: {
    border: "rgba(16, 185, 129, 0.15)",
    glow: "rgba(16, 185, 129, 0.1)",
  },
  amber: {
    border: "rgba(245, 158, 11, 0.15)",
    glow: "rgba(245, 158, 11, 0.1)",
  },
  mixed: {
    border: "rgba(100, 150, 200, 0.15)",
    glow: "rgba(100, 150, 200, 0.1)",
  },
  neutral: {
    border: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(255, 255, 255, 0.05)",
  },
};

export function SectionBackground({
  children,
  colorScheme = "neutral",
  className = "",
  id,
}: SectionBackgroundProps): ReactNode {
  const colors = colorSchemes[colorScheme];

  return (
    <section id={id} className={`relative ${className}`}>
      {/* Glass container */}
      <div className="container-custom py-4">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.05) 100%)`,
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.1),
              inset 0 -1px 1px rgba(0,0,0,0.1),
              inset 0 0 0 1px ${colors.border},
              0 8px 32px rgba(0,0,0,0.2)
            `,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Top glossy shine */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)`,
            }}
          />

          {/* Left edge highlight */}
          <div
            className="absolute top-0 left-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)`,
            }}
          />

          {/* Inner glow at top */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)`,
            }}
          />

          {/* Accent color glow at top */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-2/3 h-40 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${colors.glow}, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
