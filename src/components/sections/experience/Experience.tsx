import { SectionWrapper, SectionHeading } from "@/components/shared";
import { ExperienceClient } from "./ExperienceClient";
import { EXPERIENCE_HEADING } from "./experience.data";
import { experiences } from "@/data";
import type { ReactNode } from "react";

export function Experience(): ReactNode {
  return (
    <SectionWrapper id="experience" className="py-20 md:py-32">
      <SectionHeading
        label={EXPERIENCE_HEADING.label}
        title={EXPERIENCE_HEADING.title}
        description={EXPERIENCE_HEADING.description}
      />
      <ExperienceClient experiences={experiences} />
    </SectionWrapper>
  );
}
