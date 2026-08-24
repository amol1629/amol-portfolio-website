import { SectionWrapper, SectionHeading } from "@/components/shared";
import { AboutClient } from "./AboutClient";
import { ABOUT_DATA } from "./about.data";
import type { ReactNode } from "react";

export function About(): ReactNode {
  return (
    <SectionWrapper id="about" className="py-20 md:py-32">
      <SectionHeading label="About" title="Who I Am" />
      <AboutClient data={ABOUT_DATA} />
    </SectionWrapper>
  );
}
