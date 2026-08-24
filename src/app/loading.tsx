export default function Loading(): React.ReactNode {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[rgb(var(--color-accent-cyan))] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[rgb(var(--color-fg-secondary))]">
          Loading...
        </p>
      </div>
    </div>
  );
}
