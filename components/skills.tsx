"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

// Icons
import {
	FaHtml5,
	FaCss3Alt,
	FaJs,
	FaNodeJs,
	FaReact,
	FaVuejs,
	FaGitAlt,
	FaGithub,
	FaCode,
	FaTools,
	FaLaptopCode,
} from "react-icons/fa";
import {
	SiTypescript,
	SiNextdotjs,
	SiRedux,
	SiTailwindcss,
	SiBootstrap,
	SiExpress,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import {
	MdLeaderboard,
	MdTimelapse,
	MdOutlinePsychology,
	MdGroups,
	MdPalette,
	MdOutlineChat,
	MdOutlineAutoFixHigh,
	MdOutlineHandshake,
	MdSchool,
} from "react-icons/md";
import { GiThink, GiBrain } from "react-icons/gi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const skillsData = [
	{
		category: "Languages",
		icon: <FaCode className="text-purple-500 text-xl" />,
		skills: [
			{
				name: "HTML",
				icon: <FaHtml5 className="text-orange-500" />,
				description:
					"Semantic HTML5 markup with accessibility features",
			},
			{
				name: "CSS",
				icon: <FaCss3Alt className="text-blue-500" />,
				description: "Advanced CSS layouts with flexbox and grid",
			},
			{
				name: "JavaScript",
				icon: <FaJs className="text-yellow-400" />,
				description:
					"ES6+ features, async programming, and DOM manipulation",
			},
			{
				name: "TypeScript",
				icon: <SiTypescript className="text-blue-600" />,
				description:
					"Type-safe development with interfaces and generics",
			},
			{
				name: "Node.js",
				icon: <FaNodeJs className="text-green-600" />,
				description: "Server-side JavaScript runtime environment",
			},
			{
				name: "Express.js",
				icon: <SiExpress className="text-gray-400" />,
				description:
					"Minimalist web framework for Node.js applications",
			},
		],
	},
	{
		category: "Frameworks/Libraries",
		icon: <FaLaptopCode className="text-blue-500 text-xl" />,
		skills: [
			{
				name: "React.js",
				icon: <FaReact className="text-blue-400" />,
				description:
					"Component-based UI library with hooks and context API",
			},
			{
				name: "Vue.js",
				icon: <FaVuejs className="text-green-500" />,
				description:
					"Progressive JavaScript framework for building UIs",
			},
			{
				name: "Next.js",
				icon: <SiNextdotjs className="text-black dark:text-white" />,
				description: "React framework with SSR, SSG, and routing",
			},
			{
				name: "Redux",
				icon: <SiRedux className="text-purple-500" />,
				description:
					"State management library for JavaScript applications",
			},
			{
				name: "ShadCN",
				icon: <IoShieldCheckmarkSharp className="text-blue-400" />,
				description:
					"Beautifully designed components built with Radix UI and Tailwind",
			},
			{
				name: "Bootstrap",
				icon: <SiBootstrap className="text-purple-600" />,
				description:
					"Responsive CSS framework with pre-built components",
			},
			{
				name: "Tailwind CSS",
				icon: <SiTailwindcss className="text-cyan-400" />,
				description:
					"Utility-first CSS framework for rapid UI development",
			},
		],
	},
	{
		category: "Tools",
		icon: <FaTools className="text-gray-500 text-xl" />,
		skills: [
			{
				name: "GitHub Actions",
				icon: <FaGithub className="text-black dark:text-white" />,
				description: "CI/CD automation for repository workflows",
			},
			{
				name: "REST API",
				icon: <TbApi className="text-green-500" />,
				description: "Building and integrating RESTful web services",
			},
		],
	},
	{
		category: "Soft Skills",
		icon: <MdOutlineHandshake className="text-amber-500 text-xl" />,
		skills: [
			{
				name: "Communication",
				icon: <MdOutlineChat className="text-blue-400" />,
				description:
					"Clear verbal and written communication across teams",
			},
			{
				name: "Leadership",
				icon: <MdOutlineAutoFixHigh className="text-yellow-500" />,
				description:
					"Guiding teams and projects to successful outcomes",
			},
			{
				name: "Time Management",
				icon: <MdTimelapse className="text-purple-500" />,
				description: "Efficient prioritization and deadline management",
			},
			{
				name: "Adaptability",
				icon: <MdLeaderboard className="text-green-500" />,
				description:
					"Quick adjustment to new technologies and requirements",
			},
			{
				name: "Problem Solving",
				icon: <GiThink className="text-red-400" />,
				description: "Analytical approach to complex challenges",
			},
			{
				name: "Teamwork",
				icon: <MdGroups className="text-indigo-500" />,
				description: "Collaborative work in diverse team settings",
			},
			{
				name: "Creativity",
				icon: <MdPalette className="text-pink-500" />,
				description: "Innovative solutions and design thinking",
			},
		],
	},
	{
		category: "Best Practices",
		icon: <GiBrain className="text-green-600 text-xl" />,
		skills: [
			{
				name: "SOLID Principles",
				icon: <IoShieldCheckmarkSharp className="text-blue-400" />,
				description:
					"Object-oriented design principles for maintainable code",
			},
			{
				name: "DRY",
				icon: <GiThink className="text-green-500" />,
				description:
					"Don't Repeat Yourself - Code reusability patterns",
			},
			{
				name: "KISS",
				icon: <MdOutlinePsychology className="text-purple-400" />,
				description:
					"Keep It Simple, Stupid - Simplicity in design and implementation",
			},
			{
				name: "YAGNI",
				icon: <GiThink className="text-red-400" />,
				description:
					"You Aren't Gonna Need It - Avoiding unnecessary features",
			},
		],
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
	const { ref } = useSectionInView("Skills", 0.3);
	const { theme } = useTheme();

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
						className="relative group overflow-hidden rounded-2xl p-6 sm:pr-8 border border-white/10 shadow-xl bg-white/10 dark:bg-[#0e101a]/60 hover:scale-[1.015] hover:border-blue-400/60 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"
					>
						{/* ✨ Subtle Glow Background on Hover (No blur) */}
						<div className="absolute inset-0 -z-10 pointer-events-none">
							<div
								className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
                bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]"
							/>
						</div>

						<div className="relative z-10">
							<h3 className="text-xl sm:text-2xl font-bold mb-6 relative text-gray-800 dark:text-gray-100 flex items-center gap-2">
								{group.icon}
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
										className="px-4 py-2 text-sm font-semibold rounded-full 
                    backdrop-blur-md bg-white/30 dark:bg-white/10 
                    text-gray-900 dark:text-white 
                    border border-gray-300 dark:border-white/20 
                    shadow-[0_0_10px_rgba(59,130,246,0.15)] hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] 
                    transition-all duration-300 ease-in-out cursor-default whitespace-nowrap tracking-wide
                    flex items-center gap-2"
									>
										{skill.icon}
										{skill.name}
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
