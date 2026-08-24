"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ children, content, position = "top", className = "" }: TooltipProps): ReactNode {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-px border-t-white/10",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-px border-b-white/10",
    left: "left-full top-1/2 -translate-y-1/2 -ml-px border-l-white/10",
    right: "right-full top-1/2 -translate-y-1/2 -mr-px border-r-white/10",
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`absolute ${positionClasses[position]} px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap z-50 pointer-events-none transition-all duration-200 ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="text-xs font-medium text-white">
          {content}
        </div>
        <div className={`absolute border-4 border-transparent ${arrowClasses[position]}`} />
      </div>
    </div>
  );
}
