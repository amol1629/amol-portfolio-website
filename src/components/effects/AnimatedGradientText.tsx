"use client";

import { useReducedMotion } from "@/hooks";
import type { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationDuration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function AnimatedGradientText({
  children,
  className = "",
  colors = ["#06b6d4", "#8b5cf6", "#10b981", "#06b6d4"],
  animationDuration = 5,
  as: Component = "span",
}: AnimatedGradientTextProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const gradientString = colors.join(", ");

  return (
    <Component
      className={className}
      style={{
        background: `linear-gradient(90deg, ${gradientString})`,
        backgroundSize: prefersReducedMotion ? "100% 100%" : "300% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: prefersReducedMotion ? "none" : `gradientShift ${animationDuration}s ease infinite`,
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      {children}
    </Component>
  );
}
