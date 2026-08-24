import { SectionWrapper, SectionHeading } from "@/components/shared";
import { CapabilityMapClient } from "./CapabilityMapClient";
import { CAPABILITIES_DATA, CAPABILITIES_HEADING } from "./capability.data";
import type { ReactNode } from "react";

export function CapabilityMap(): ReactNode {
  return (
    <SectionWrapper id="skills" className="py-20 md:py-32">
      <SectionHeading
        label={CAPABILITIES_HEADING.label}
        title={CAPABILITIES_HEADING.title}
        description={CAPABILITIES_HEADING.description}
      />
      <CapabilityMapClient capabilities={CAPABILITIES_DATA} />
    </SectionWrapper>
  );
}
