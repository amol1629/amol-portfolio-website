"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

const skillsData = [
	{
		category: "Languages",
		skills: [
			"HTML",
			"CSS",
			"JavaScript",
			"TypeScript",
			"Node.js",
			"Express.js",
		],
	},
	{
		category: "Frameworks/Libraries",
		skills: [
			"React.js",
			"Vue.js",
			"Next.js",
			"Redux",
			"ShadCN",
			"Bootstrap",
			"Tailwind CSS",
		],
	},
	{ category: "Tools", skills: ["GitHub Actions", "REST API"] },
	{
		category: "Soft Skills",
		skills: [
			"Communication",
			"Leadership",
			"Time Management",
			"Adaptability",
			"Problem Solving",
			"Teamwork",
			"Creativity",
		],
	},
	{
		category: "Best Practices",
		skills: ["SOLID Principles", "DRY", "KISS", "YAGNI"],
	},
];

const fadeInAnimationVariants = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const skillItemVariants = {
	initial: { opacity: 0, y: 20, scale: 0.95 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
	whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function Skills() {
	const { ref } = useSectionInView("Skills");

	return (
		<section
			id="skills"
			ref={ref}
			className="mb-28 max-w-4xl mx-auto px-6 scroll-mt-28 text-center sm:mb-40 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg p-12"
		>
			<SectionHeading>My Skills</SectionHeading>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mt-6">
				{skillsData.map((group, index) => (
					<motion.div
						key={index}
						variants={fadeInAnimationVariants}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						className="relative p-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg border border-transparent transition-all duration-300 ease-in-out group"
					>
						{/* Hover Effect: Background, Border, and Shadow */}
						<div className="absolute inset-0 rounded-2xl transition-all duration-300 ease-in-out bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800 group-hover:shadow-lg border-l-4 border-transparent group-hover:border-gray-700 dark:group-hover:border-gray-300"></div>

						<h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-6 relative z-10">
							{group.category}
						</h3>
						<div className="flex flex-wrap gap-2 relative z-10">
							{group.skills.map((skill, idx) => (
								<motion.span
									key={idx}
									variants={skillItemVariants}
									initial="initial"
									animate="animate"
									whileHover="whileHover"
									className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm transition-transform"
								>
									{skill}
								</motion.span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
