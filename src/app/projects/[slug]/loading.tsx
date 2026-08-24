export default function Loading(): React.ReactNode {
  return (
    <div className="min-h-dvh pt-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-2 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-2 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-32 h-4 bg-white/5 rounded animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="w-3/4 h-10 bg-white/5 rounded-lg animate-pulse mb-4" />
          <div className="w-1/2 h-10 bg-white/5 rounded-lg animate-pulse mb-8" />

          {/* Meta skeleton */}
          <div className="flex gap-4 mb-8">
            <div className="w-24 h-6 bg-white/5 rounded-full animate-pulse" />
            <div className="w-32 h-6 bg-white/5 rounded-full animate-pulse" />
          </div>

          {/* Hero image skeleton */}
          <div className="aspect-video w-full bg-white/5 rounded-2xl animate-pulse mb-12" />

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
