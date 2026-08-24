import { SectionWrapper, SectionHeading } from "@/components/shared";
import { CertificationsPreviewClient } from "./CertificationsPreviewClient";
import { CERTIFICATIONS_HEADING, PROVIDER_INFO } from "./certifications.data";
import { certifications } from "@/data";
import type { ProviderWithCount } from "./certifications.data";
import type { ReactNode } from "react";

function computeProviders(): ProviderWithCount[] {
  const providerCounts = certifications.reduce(
    (acc, cert) => {
      acc[cert.provider] = (acc[cert.provider] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(providerCounts)
    .map(([provider, count]) => ({
      provider,
      count,
      info: PROVIDER_INFO[provider],
    }))
    .filter((p): p is ProviderWithCount => !!p.info)
    .sort((a, b) => b.count - a.count);
}

const providers = computeProviders();

export function CertificationsPreview(): ReactNode {
  return (
    <SectionWrapper id="certifications" className="py-20 md:py-32">
      <SectionHeading
        label={CERTIFICATIONS_HEADING.label}
        title={CERTIFICATIONS_HEADING.title}
        description={CERTIFICATIONS_HEADING.description}
      />
      <CertificationsPreviewClient providers={providers} />
    </SectionWrapper>
  );
}
