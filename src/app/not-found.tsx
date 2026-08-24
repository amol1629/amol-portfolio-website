import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound(): React.ReactNode {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-mono text-[rgb(var(--color-accent-cyan))] mb-4">
          404
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
          Page not found
        </h1>
        <p className="text-[rgb(var(--color-fg-secondary))] mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[rgb(var(--color-accent-cyan))] text-[rgb(var(--color-fg-inverted))] font-medium hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
