export default function CertificationsLoading(): React.ReactNode {
  return (
    <section className="container-custom section-padding pt-24 pb-20">
      {/* Heading skeleton */}
      <div className="max-w-2xl mb-12">
        <div className="h-4 w-32 bg-white/10 rounded mb-3 animate-pulse" />
        <div className="h-10 w-80 bg-white/10 rounded mb-4 animate-pulse" />
        <div className="h-6 w-full max-w-lg bg-white/10 rounded animate-pulse" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 min-h-[56px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-white/10 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Featured section skeleton */}
      <div className="mb-8">
        <div className="h-4 w-20 bg-white/10 rounded mb-4 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-h-[280px] bg-white/5 rounded-2xl border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
