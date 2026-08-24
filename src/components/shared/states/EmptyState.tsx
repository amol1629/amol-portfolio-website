import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * EmptyState
 *
 * Display when content is unavailable or list is empty.
 */
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps): ReactNode {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-[rgb(var(--color-fg-tertiary))]">{icon}</div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-[rgb(var(--color-fg-secondary))] max-w-sm mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
