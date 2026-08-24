"use client";

import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => {
  return () => {};
};

const getSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

/**
 * Returns true once the component has mounted on the client.
 * Uses useSyncExternalStore for proper hydration handling.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
