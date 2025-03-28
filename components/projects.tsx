"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
		<section
			ref={ref}
			id="projects"
			className="scroll-mt-28 mb-28 bg-gray-100 dark:bg-gray-800 py-16 px-6 rounded-2xl shadow-lg 
			transition-all duration-300 ease-in-out  "
		>
			<SectionHeading>My projects</SectionHeading>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
				{projectsData.map((project, index) => (
					<React.Fragment key={index}>
						<Project {...project} />
					</React.Fragment>
				))}
			</div>
		</section>
  );
}
