"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<unknown>(null);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idleTimeout = setTimeout(() => setIsIdle(true), 100);
    return () => clearTimeout(idleTimeout);
  }, []);

  useEffect(() => {
    if (!isIdle) return;

    let animationId: number;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    import("lenis").then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        animationId = requestAnimationFrame(raf);
      }

      animationId = requestAnimationFrame(raf);
    });

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, [isIdle]);

  return <>{children}</>;
}
