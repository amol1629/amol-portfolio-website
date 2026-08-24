import type { Metric } from "web-vitals";

type ReportHandler = (metric: Metric) => void;

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(onPerfEntry?: ReportHandler): void {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}

/**
 * Log Web Vitals to console (development)
 */
export function logWebVitals(): void {
  if (process.env.NODE_ENV === "development") {
    reportWebVitals((metric) => {
      console.log(metric);
    });
  }
}
