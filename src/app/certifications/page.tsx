import type { Metadata } from "next";
import { Suspense } from "react";
import { generatePageMetadata } from "@/config";
import { PageTransition } from "@/components/shared";
import { CertificationsContent } from "./CertificationsContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Certifications",
  description:
    "Professional certifications across AWS, Azure, Meta, and Google, validating expertise in cloud architecture, frontend development, and UX design.",
  path: "/certifications",
});

function CertificationsSkeleton(): React.ReactNode {
  return (
    <section className="container-custom section-padding">
      {/* Heading skeleton */}
      <div className="max-w-2xl mb-12">
        <div className="h-4 w-32 bg-white/10 rounded mb-3" />
        <div className="h-10 w-80 bg-white/10 rounded mb-4" />
        <div className="h-6 w-full max-w-lg bg-white/10 rounded" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 min-h-[56px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-9 w-24 bg-white/10 rounded-lg" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[280px] bg-white/5 rounded-2xl border border-white/10" />
        ))}
      </div>
    </section>
  );
}

export default function CertificationsPage(): React.ReactNode {
  return (
    <PageTransition>
      <Suspense fallback={<CertificationsSkeleton />}>
        <CertificationsContent />
      </Suspense>
    </PageTransition>
  );
}
