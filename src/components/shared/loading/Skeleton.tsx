import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Skeleton
 *
 * Loading placeholder with pulse animation.
 */
interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
}: SkeletonProps): ReactNode {
  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[rgb(var(--color-bg-tertiary))]",
        variantClasses[variant],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonText
 *
 * Multiple skeleton lines for text content.
 */
interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({
  lines = 3,
  className,
}: SkeletonTextProps): ReactNode {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  );
}

/**
 * SectionSkeleton
 *
 * Full section loading placeholder for lazy-loaded page sections.
 */
export function SectionSkeleton(): ReactNode {
  return (
    <div className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-20 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
