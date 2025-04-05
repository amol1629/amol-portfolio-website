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
			className="scroll-mt-28 mb-28 max-w-4xl mx-auto bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 py-16 px-6 rounded-2xl  
			transition-all duration-300 ease-in-out  "
		>
			<SectionHeading>My projects</SectionHeading>
			<div className="max-w-4xl mx-auto px-6 scroll-mt-28 text-center  rounded-2xl  p-6 ">
				{projectsData.map((project, index) => (
					<React.Fragment key={index}>
						<Project {...project} />
					</React.Fragment>
				))}
			</div>
		</section>
	);
}
