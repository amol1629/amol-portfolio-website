import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Badge
 *
 * Compact label for categories, status, or tags.
 *
 * Props:
 * - variant: Visual style (default, accent, success, muted)
 * - size: Size preset (sm, md)
 * - children: Badge text
 */
interface BadgeProps {
  variant?: "default" | "accent" | "success" | "muted";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
}: BadgeProps): ReactNode {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variantClasses = {
    default:
      "bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-fg-secondary))] border border-[rgb(var(--color-border-default))]",
    accent:
      "bg-[rgb(var(--color-accent-cyan))/0.1] text-[rgb(var(--color-accent-cyan))] border border-[rgb(var(--color-accent-cyan))/0.3]",
    success:
      "bg-[rgb(var(--color-success))/0.1] text-[rgb(var(--color-success))] border border-[rgb(var(--color-success))/0.3]",
    muted:
      "bg-[rgb(var(--color-bg-elevated))] text-[rgb(var(--color-fg-tertiary))] border border-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
