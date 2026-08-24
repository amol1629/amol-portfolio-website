"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const subscribe = (callback: () => void): (() => void) => {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getSnapshot = (): boolean => {
  return window.matchMedia(query).matches;
};

const getServerSnapshot = (): boolean => false;

/**
 * Returns true if the user prefers reduced motion.
 * Use this to disable or simplify animations.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
