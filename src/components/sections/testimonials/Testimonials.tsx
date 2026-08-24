import { SectionWrapper, SectionHeading } from "@/components/shared";
import { TestimonialsClient } from "./TestimonialsClient";
import { TESTIMONIALS_HEADING, testimonials } from "./testimonials.data";
import type { ReactNode } from "react";

export function Testimonials(): ReactNode {
  return (
    <SectionWrapper id="testimonials" className="py-20 md:py-32 overflow-hidden">
      <SectionHeading
        label={TESTIMONIALS_HEADING.label}
        title={TESTIMONIALS_HEADING.title}
        description={TESTIMONIALS_HEADING.description}
        align="left"
      />
      <TestimonialsClient testimonials={testimonials} />
    </SectionWrapper>
  );
}
