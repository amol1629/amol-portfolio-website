import { SectionWrapper, SectionHeading, Button } from "@/components/shared";
import { ServicesClient } from "./ServicesClient";
import { SERVICES_DATA, SERVICES_HEADING } from "./services.data";
import type { ReactNode } from "react";

export function Services(): ReactNode {
  return (
    <SectionWrapper id="services" className="py-20 md:py-32">
      <SectionHeading
        label={SERVICES_HEADING.label}
        title={SERVICES_HEADING.title}
        description={SERVICES_HEADING.description}
      />

      <ServicesClient services={SERVICES_DATA} />

      <div className="text-center">
        <Button href="/work-with-me" variant="outline">
          Learn more about working together
        </Button>
      </div>
    </SectionWrapper>
  );
}
