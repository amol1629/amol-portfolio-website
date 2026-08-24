"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Project page error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 pt-24">
      <div className="text-center">
        <p className="text-sm font-mono text-[rgb(var(--color-error))] mb-4">
          Error
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
          Failed to load project
        </h1>
        <p className="text-[rgb(var(--color-fg-secondary))] mb-8 max-w-md">
          We couldn&apos;t load this project. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[rgb(var(--color-accent-cyan))] text-[rgb(var(--color-fg-inverted))] font-medium hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/15 text-white font-medium hover:bg-white/5 transition-colors"
          >
            All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
