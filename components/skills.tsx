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
	initial: { opacity: 0, y: 10, scale: 0.95 },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.4, ease: "easeOut" },
	},
	whileHover: {
		scale: 1.08,
		boxShadow: "0 0 10px rgba(59,130,246,0.4)",
		transition: { duration: 0.3 },
	},
};

export default function Skills() {
	const { ref } = useSectionInView("Skills");

	return (
		<section
			id="skills"
			ref={ref}
			className="relative mb-28 sm:mb-40 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28 text-center overflow-hidden py-20 rounded-2xl"
		>
			{/* 🔮 Elegant Animated Background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] animate-gradient-x bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100 via-blue-200 to-white dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#111827] blur-[120px] opacity-20 "></div>
				<div className="absolute w-72 h-72 bg-purple-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
				<div
					className="absolute w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
					style={{ top: "35%", left: "60%" }}
				></div>
			</div>

			<motion.div
				variants={fadeInAnimationVariants}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<SectionHeading>My Skills</SectionHeading>
			</motion.div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mt-10">
				{skillsData.map((group, index) => (
					<motion.div
						key={index}
						variants={fadeInAnimationVariants}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						className="relative group overflow-hidden rounded-2xl p-6 sm:pr-8 border  border-white/10  shadow-xl bg-white/10 dark:bg-[#0e101a]/60 hover:scale-[1.015] hover:border-blue-400/60 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"
					>
						{/* ✨ Subtle Glow Background on Hover (No blur) */}
						<div className="absolute inset-0 -z-10 pointer-events-none">
							<div
								className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
			bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]"
							/>
						</div>

						<div className="relative z-10">
							<h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-4">
								{group.category}
							</h3>
							<div className="flex flex-wrap gap-3">
								{group.skills.map((skill, idx) => (
									<motion.span
										key={idx}
										variants={skillItemVariants}
										initial="initial"
										animate="animate"
										whileHover="whileHover"
										className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-default border border-gray-200 dark:border-gray-700"
									>
										{skill}
									</motion.span>
								))}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
