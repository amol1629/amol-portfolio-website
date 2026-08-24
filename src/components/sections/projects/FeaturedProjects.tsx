import { SectionWrapper, SectionHeading } from "@/components/shared";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";
import { PROJECTS_HEADING } from "./projects.data";
import { projects } from "@/data";
import type { ReactNode } from "react";

const enterpriseProjects = projects.filter((p) => p.type === "enterprise").slice(0, 3);
const personalProjects = projects.filter((p) => p.type === "personal").slice(0, 3);

export function FeaturedProjects(): ReactNode {
  return (
    <SectionWrapper id="projects" className="py-20 md:py-32">
      <SectionHeading
        label={PROJECTS_HEADING.label}
        title={PROJECTS_HEADING.title}
        description={PROJECTS_HEADING.description}
      />
      <FeaturedProjectsClient
        enterpriseProjects={enterpriseProjects}
        personalProjects={personalProjects}
      />
    </SectionWrapper>
  );
}
