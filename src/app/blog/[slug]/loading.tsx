export default function Loading(): React.ReactNode {
  return (
    <div className="min-h-dvh pt-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-2 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-12 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-2 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-40 h-4 bg-white/5 rounded animate-pulse" />
          </div>

          {/* Badge skeleton */}
          <div className="flex gap-3 mb-4">
            <div className="w-20 h-6 bg-white/5 rounded-full animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="w-3/4 h-12 bg-white/5 rounded-lg animate-pulse mb-4" />
          <div className="w-1/2 h-12 bg-white/5 rounded-lg animate-pulse mb-6" />

          {/* Meta skeleton */}
          <div className="flex gap-4 mb-8">
            <div className="w-28 h-5 bg-white/5 rounded animate-pulse" />
            <div className="w-20 h-5 bg-white/5 rounded animate-pulse" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-full h-4 bg-white/5 rounded animate-pulse" />
            <div className="w-2/3 h-4 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
