import { cn } from "@/lib/cn";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

/**
 * ErrorState
 *
 * Display when an error occurs loading content.
 */
interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this content.",
  retry,
  className,
}: ErrorStateProps): ReactNode {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
      role="alert"
    >
      <AlertCircle
        className="w-12 h-12 mb-4 text-[rgb(var(--color-error))]"
        aria-hidden="true"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[rgb(var(--color-fg-secondary))] max-w-sm mb-6">
        {message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[rgb(var(--color-bg-tertiary))] hover:bg-[rgb(var(--color-bg-elevated))] transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
