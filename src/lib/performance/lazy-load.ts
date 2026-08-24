import { lazy, type ComponentType } from "react";

/**
 * Lazy load a component with dynamic import
 */
export function lazyLoad<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(importFn);
}

/**
 * Lazy load a component with named export
 */
export function lazyLoadNamed<T extends ComponentType<unknown>>(
  importFn: () => Promise<Record<string, T>>,
  exportName: string
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    const result = await importFn();
    return { default: result[exportName] as T };
  });
}

/**
 * Preload a dynamic import
 */
export function preloadComponent(
  importFn: () => Promise<unknown>
): void {
  void importFn();
}
