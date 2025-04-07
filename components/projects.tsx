"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
	const { ref } = useSectionInView("Projects", 0.3);

	return (
		<section
			ref={ref}
			id="projects"
			className="relative scroll-mt-28 mb-28 mx-auto w-full max-w-6xl px-4 md:px-6 xl:px-10 py-16 rounded-3xl overflow-hidden
				bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 ease-in-out
			"
		>
			{/* Animated Background Blobs */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute w-[30rem] h-[30rem] top-[-10%] left-[-10%] bg-gradient-to-br from-sky-300 via-indigo-400 to-cyan-400 dark:from-indigo-800 dark:via-purple-800 dark:to-sky-800 rounded-full blur-[120px] opacity-20 animate-blob" />
				<div className="absolute w-[25rem] h-[25rem] bottom-[-20%] right-[-10%] bg-gradient-to-tr from-blue-200 via-teal-300 to-indigo-300 dark:from-blue-900 dark:via-cyan-800 dark:to-teal-900 rounded-full blur-[120px] opacity-20 animate-blob animation-delay-4000" />
			</div>

			<SectionHeading>My Projects</SectionHeading>

			<div className="grid grid-cols-1 gap-10 mt-10 sm:px-2 md:px-6 ">
				{projectsData.map((project, index) => (
					<Project
						key={index}
						{...project}
						// githubUrl="{project.githubUrl}"
						index={index}
					/>
				))}
			</div>
		</section>
	);
}
