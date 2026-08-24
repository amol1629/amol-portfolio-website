"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-mono text-[rgb(var(--color-error))] mb-4">
          Error
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
          Something went wrong
        </h1>
        <p className="text-[rgb(var(--color-fg-secondary))] mb-8 max-w-md">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[rgb(var(--color-accent-cyan))] text-[rgb(var(--color-fg-inverted))] font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
