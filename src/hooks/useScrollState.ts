"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const getScrollY = (): number => window.scrollY;
const getServerScrollY = (): number => 0;

/**
 * Track if page has been scrolled past threshold.
 */
export function useIsScrolled(threshold = 10): boolean {
  const scrollY = useSyncExternalStore(subscribe, getScrollY, getServerScrollY);
  return scrollY > threshold;
}

/**
 * Get current scroll position.
 */
export function useScrollY(): number {
  return useSyncExternalStore(subscribe, getScrollY, getServerScrollY);
}
