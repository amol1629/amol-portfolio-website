"use client";

import { type ReactNode } from "react";

export interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string | undefined;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  glowColor?: string;
  disableHoverGlow?: boolean;
  style?: React.CSSProperties;
}

export function LiquidGlassCard({
  children,
  className = "",
  padding = "md",
  onClick,
  glowColor = "rgb(var(--color-accent-cyan))",
  disableHoverGlow = false,
  style,
}: LiquidGlassCardProps): ReactNode {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`group/card relative overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25),0_4px_12px_rgba(0,0,0,0.15)] ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      style={style}
    >
      {/* Background layer (replaces ::before) - GPU optimized */}
      <div
        className="absolute inset-0 rounded-[inherit] z-0 bg-[#05040814] backdrop-blur-[10px] backdrop-saturate-150 transition-[background] duration-300 group-hover/card:bg-[rgba(22,12,41,0.164)] will-change-[backdrop-filter] transform-gpu [contain:paint]"
      />

      {/* Border layer (replaces ::after) */}
      <div
        className="absolute inset-0 rounded-[inherit] z-[1] pointer-events-none border border-white/[0.08] transition-all duration-300 ease-out group-hover/card:border-white/20 group-hover/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
      />

      {/* Top border glow - appears on hover */}
      {!disableHoverGlow && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }}
          />
          <div
            className="absolute top-0 left-1/4 right-1/4 h-6 blur-xl z-0 opacity-0 group-hover/card:opacity-40 transition-opacity duration-500"
            style={{ background: glowColor }}
          />
        </>
      )}

      <div className={`relative z-[2] ${paddingClasses[padding]}`}>
        {children}
      </div>
    </div>
  );
}
