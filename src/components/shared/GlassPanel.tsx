"use client";

import { cn } from "@/lib/cn";
import type { ReactNode, HTMLAttributes } from "react";

export type GlassAccent = "cyan" | "purple" | "emerald" | "amber" | "none";

export const glassAccentColors = {
  cyan: {
    bg: "rgba(0, 212, 255, 0.08)",
    border: "rgba(0, 212, 255, 0.2)",
    text: "rgb(0, 212, 255)",
    glow: "rgba(0, 212, 255, 0.15)",
    glowStrong: "rgba(0, 212, 255, 0.5)",
  },
  purple: {
    bg: "rgba(192, 132, 252, 0.08)",
    border: "rgba(192, 132, 252, 0.2)",
    text: "rgb(192, 132, 252)",
    glow: "rgba(192, 132, 252, 0.15)",
    glowStrong: "rgba(192, 132, 252, 0.5)",
  },
  emerald: {
    bg: "rgba(16, 185, 129, 0.08)",
    border: "rgba(16, 185, 129, 0.2)",
    text: "rgb(16, 185, 129)",
    glow: "rgba(16, 185, 129, 0.15)",
    glowStrong: "rgba(16, 185, 129, 0.5)",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.2)",
    text: "rgb(245, 158, 11)",
    glow: "rgba(245, 158, 11, 0.15)",
    glowStrong: "rgba(245, 158, 11, 0.5)",
  },
  none: {
    bg: "transparent",
    border: "rgba(255, 255, 255, 0.1)",
    text: "rgb(var(--color-fg-primary))",
    glow: "transparent",
    glowStrong: "rgba(0, 212, 255, 0.4)",
  },
};

interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  accent?: GlassAccent;
  children: ReactNode;
  as?: "div" | "article" | "section" | "aside";
}

export function GlassPanel({
  variant = "default",
  padding = "md",
  accent = "none",
  children,
  className,
  as: Component = "div",
  style,
  ...props
}: GlassPanelProps): ReactNode {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const colors = glassAccentColors[accent];
  const isInteractive = variant === "interactive";

  const baseClasses = cn(
    "relative overflow-hidden transition-all duration-300",
    isInteractive && "cursor-pointer group",
    paddingClasses[padding],
    className
  );

  return (
    <Component
      className={baseClasses}
      style={{
        borderRadius: 24,
        ...style,
      }}
      {...props}
    >
      {/* Glass background layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          borderRadius: "inherit",
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(40px) saturate(150%)",
          WebkitBackdropFilter: "blur(40px) saturate(150%)",
        }}
      />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          borderRadius: "inherit",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
        }}
      />

      {/* Inner light refraction simulation */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          borderRadius: "inherit",
          background: "radial-gradient(ellipse at 30% 20%, rgba(100,200,255,0.08), transparent 50%)",
        }}
      />

      {/* Border with highlight */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          borderRadius: "inherit",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.25),
            0 2px 8px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(255,255,255,0.05)
          `,
        }}
      />

      {/* Top edge highlight - Apple style */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] -z-10 pointer-events-none"
        style={{
          borderRadius: "24px 24px 0 0",
          background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)",
        }}
      />

      {/* Hover glow for interactive */}
      {isInteractive && (
        <div
          className="absolute -inset-[1px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            borderRadius: 24,
            boxShadow: `0 0 25px ${colors.glowStrong}, 0 0 50px ${colors.glow}`,
          }}
        />
      )}

      {/* Content - no wrapper needed, direct children */}
      {children}
    </Component>
  );
}
