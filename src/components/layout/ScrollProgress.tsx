"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const getScrollProgress = (): number => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const getServerSnapshot = (): number => 0;

/**
 * ScrollProgress
 *
 * Progress bar showing scroll position through the page.
 */
interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps): ReactNode {
  const progress = useSyncExternalStore(
    subscribe,
    getScrollProgress,
    getServerSnapshot
  );

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-0.5 z-[var(--z-max)] pointer-events-none",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[rgb(var(--color-accent-cyan))] to-[rgb(var(--color-accent-indigo))]"
        style={{ width: `${progress}%`, transform: "translateZ(0)" }}
      />
    </div>
  );
}
