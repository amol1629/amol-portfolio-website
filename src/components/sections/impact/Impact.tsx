import { SectionWrapper, SectionHeading } from "@/components/shared";
import { ImpactClient } from "./ImpactClient";
import { IMPACT_HEADING } from "./impact.data";
import { beforeAfterMetrics, industryBreakdown } from "@/data";
import type { ReactNode } from "react";

export function Impact(): ReactNode {
  return (
    <SectionWrapper id="impact" className="py-20 md:py-32">
      <SectionHeading
        label={IMPACT_HEADING.label}
        title={IMPACT_HEADING.title}
        description={IMPACT_HEADING.description}
      />
      <ImpactClient
        beforeAfterMetrics={beforeAfterMetrics}
        industryBreakdown={industryBreakdown}
      />
    </SectionWrapper>
  );
}
