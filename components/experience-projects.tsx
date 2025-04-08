"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTools, FaProjectDiagram, FaRocket } from "react-icons/fa";
import { ReactNode, useState, useEffect } from "react";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./section-heading";

// Define types for our project data structure
interface ProjectPoint {
	point: string;
}

interface Project {
	title: string;
	icon: ReactNode;
	points: string[];
}

// Enhanced animations
const fadeIn = {
	initial: { opacity: 0, y: 40 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
	},
};

const projectContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const projectItem = {
	hidden: { opacity: 0, y: 20, scale: 0.9 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 12,
			duration: 0.6,
		},
	},
	hover: {
		scale: 1.04,
		y: -5,
		boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

// Interactive project card with enhanced UI
const ProjectCard = ({
	project,
	index,
}: {
	project: Project;
	index: number;
}) => {
	const [expanded, setExpanded] = useState(false);
	const { theme } = useTheme();
	const [cardRef, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	// Show only first 3 points by default for better mobile experience
	const visiblePoints = expanded
		? project.points
		: project.points.slice(0, 3);
	const hasMorePoints = project.points.length > 3;

	// Random delay for staggered animations
	const delay = index * 0.2;

	return (
		<motion.div
			ref={cardRef}
			variants={projectItem}
			initial="hidden"
			animate={inView ? "show" : "hidden"}
			whileHover="hover"
			custom={index}
			transition={{ delay }}
			className="w-full sm:w-[85%] md:w-[45%] lg:w-[30%] h-full relative group overflow-hidden rounded-3xl shadow-xl backdrop-blur-sm 
        bg-gradient-to-br from-white/90 to-white/50 
        dark:from-gray-900/80 dark:to-gray-800/50 
        border border-white/20 dark:border-gray-700/30 
        transition-all duration-500 ease-out"
		>
			{/* Enhanced glow effect on hover */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]" />
			</div>

			{/* Animated accent line */}
			<motion.div
				initial={{ width: "0%", opacity: 0 }}
				animate={{
					width: inView ? "100%" : "0%",
					opacity: inView ? 1 : 0,
				}}
				transition={{
					delay: delay + 0.3,
					duration: 0.8,
					ease: "easeOut",
				}}
				className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400"
			/>

			{/* Card Header with floating icon */}
			<div className="relative p-6 pb-4 border-b border-gray-100/30 dark:border-gray-700/30">
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: inView ? 0 : 20, opacity: inView ? 1 : 0 }}
					transition={{ delay: delay + 0.2, duration: 0.5 }}
					className="flex items-center gap-3"
				>
					<motion.div
						whileHover={{ rotate: 5, scale: 1.1 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 10,
						}}
						className="p-3 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 
              dark:from-indigo-900/40 dark:to-purple-900/40
              shadow-lg shadow-indigo-500/10 dark:shadow-indigo-700/10"
					>
						{project.icon}
					</motion.div>
					<h3
						className="text-xl md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-gray-800 to-gray-600 
            dark:from-gray-100 dark:to-gray-300"
					>
						{project.title}
					</h3>
				</motion.div>
			</div>

			{/* Card Content with animated list items */}
			<div className="p-6 text-left h-full flex flex-col">
				<ul className="list-none space-y-3 text-sm md:text-base flex-grow">
					{visiblePoints.map((point, j) => (
						<motion.li
							key={j}
							initial={{ opacity: 0, x: -15 }}
							animate={{
								opacity: inView ? 1 : 0,
								x: inView ? 0 : -15,
							}}
							transition={{
								delay: delay + 0.3 + j * 0.1,
								duration: 0.5,
							}}
							className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
						>
							<span className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0">
								•
							</span>
							<span>{point}</span>
						</motion.li>
					))}
				</ul>

				{/* Animated show more/less button */}
				{hasMorePoints && (
					<motion.button
						onClick={() => setExpanded(!expanded)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: delay + 0.6, duration: 0.5 }}
						className="mt-4 self-start py-1.5 px-3 rounded-full
              bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30
              text-indigo-600 dark:text-indigo-300 text-sm font-medium
              border border-indigo-100 dark:border-indigo-800/50
              shadow-sm hover:shadow-md transition-all duration-300
              flex items-center gap-1.5"
					>
						{expanded
							? "Show less"
							: `+${project.points.length - 3} more`}
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-3.5 w-3.5 transition-transform duration-300`}
							animate={{ rotate: expanded ? 180 : 0 }}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</motion.svg>
					</motion.button>
				)}
			</div>

			{/* Enhanced decorative elements */}
			<div
				className="absolute -bottom-12 -right-12 w-36 h-36 
        bg-gradient-to-tl from-indigo-500/10 to-transparent 
        dark:from-indigo-400/5 dark:to-transparent 
        rounded-full blur-xl"
			></div>

			<div
				className="absolute top-1/4 -left-6 w-12 h-12 
        bg-purple-500/5 dark:bg-purple-400/5 
        rounded-full blur-md opacity-70"
			></div>
		</motion.div>
	);
};

const ExperienceProjects = () => {
	const { ref } = useSectionInView("Experience-Projects", 0.1);
	const { theme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	// Only run animations after component is mounted (for SSR compatibility)
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const projects = [
		{
			title: "Quilliionz – AI-based Content Generator",
			icon: (
				<FaRocket className="text-indigo-500 dark:text-indigo-400 text-xl" />
			),
			points: [
				"Migrated the frontend from legacy ASP.NET and C# to modern React + Node.js architecture.",
				"Single-handedly handled all React development and UI logic throughout the application.",
				"Analyzed the existing site structure and recreated pixel-perfect, responsive React components.",
				"Enhanced UI/UX with a clean, modern layout and smooth user interactions using Tailwind CSS and Framer Motion.",
				"Integrated multiple REST APIs with robust error handling and performance optimizations.",
				"Ensured responsiveness across all devices including mobiles and tablets.",
				"Implemented new features like dynamic form generators and dashboard visualizations.",
				"Followed best practices like DRY, KISS, and SOLID principles to maintain scalable code structure.",
			],
		},
		{
			title: "ALM-IP – Reusable Component Library",
			icon: (
				<FaTools className="text-indigo-500 dark:text-indigo-400 text-xl" />
			),
			points: [
				"Developed a suite of reusable components using Next.js, Tailwind CSS, and ShadCN UI framework.",
				"Closely aligned with ALM API specs to ensure seamless data integration and state management.",
				"Designed components to be plug-and-play ready for future ALM projects with minimal configuration.",
				"Built modular, theme-ready layouts with a futuristic UI and consistent styling across views.",
				"Created a developer-friendly structure with clean documentation and prop flexibility.",
				"Focused on accessibility, responsiveness, and animation-friendly design for smoother UX.",
				"All components were successfully reused with minimal tweaks in follow-up projects.",
			],
		},
		{
			title: "ECPlayer – LMS Course Player",
			icon: (
				<FaProjectDiagram className="text-indigo-500 dark:text-indigo-400 text-xl" />
			),
			points: [
				"Upgraded the entire UI of ECPlayer from older tech stack to React with Tailwind and ShadCN.",
				"Designed a clean and immersive course playback interface compatible with SCORM 1.2 and xAPI standards.",
				"Integrated quiz handling with real-time score tracking based on user answers.",
				"Enhanced player layout with intuitive navigation, progress indicators, and visual feedback.",
				"Implemented animations and smooth transitions using Framer Motion to improve UX.",
				"Ensured seamless course import/export flows with API integrations and validations.",
				"Tested and optimized player responsiveness across all major devices and screen sizes.",
			],
		},
	];

	return (
		<section
			id="experience-projects"
			ref={ref}
			className="relative mb-28 sm:mb-40 max-w-6xl mx-auto px-4 sm:px-8 scroll-mt-28 text-center overflow-hidden py-24 rounded-3xl"
		>
			{/* Enhanced futuristic animated background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				{/* Main gradient background */}
				<div
					className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] 
          animate-gradient-x 
          bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
          from-indigo-50 via-blue-50 to-white 
          dark:from-gray-900 dark:via-gray-950 dark:to-black 
          blur-[100px] opacity-30"
				/>

				{/* Animated blobs */}
				<motion.div
					animate={{
						x: [0, 30, -20, 10, 0],
						y: [0, -30, 20, -10, 0],
						scale: [1, 1.1, 0.9, 1.05, 1],
					}}
					transition={{
						duration: 20,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "reverse",
					}}
					className="absolute -top-20 -left-20 w-96 h-96 
            bg-indigo-300/20 dark:bg-indigo-900/20 
            rounded-full mix-blend-multiply filter blur-3xl opacity-30"
				/>

				<motion.div
					animate={{
						x: [0, -30, 20, -10, 0],
						y: [0, 20, -30, 10, 0],
						scale: [1, 0.9, 1.1, 0.95, 1],
					}}
					transition={{
						duration: 25,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "reverse",
					}}
					className="absolute top-1/3 right-0 w-80 h-80 
            bg-sky-300/20 dark:bg-sky-800/20 
            rounded-full mix-blend-multiply filter blur-3xl opacity-30"
				/>

				<motion.div
					animate={{
						x: [0, 20, -10, 30, 0],
						y: [0, 10, -20, 30, 0],
						scale: [1, 1.05, 0.95, 1.1, 1],
					}}
					transition={{
						duration: 18,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "reverse",
					}}
					className="absolute bottom-0 left-1/3 w-72 h-72 
            bg-purple-300/20 dark:bg-purple-800/20 
            rounded-full mix-blend-multiply filter blur-3xl opacity-30"
				/>
			</div>

			{/* Enhanced heading section with animations */}
			<motion.div
				variants={fadeIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				className="mb-16 relative z-10"
			>
				{/* Decorative geometric shapes */}
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 0.6, scale: 1 }}
					transition={{ delay: 0.2, duration: 1.5 }}
					className="absolute -top-10 right-10 sm:right-20 w-8 h-8 border-2 border-indigo-300/30 dark:border-indigo-700/50 rotate-12"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 0.6, scale: 1 }}
					transition={{ delay: 0.3, duration: 1.5 }}
					className="absolute top-20 left-10 sm:left-40 w-6 h-6 rounded-full border-2 border-purple-300/30 dark:border-purple-700/50"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 0.6, scale: 1 }}
					transition={{ delay: 0.4, duration: 1.5 }}
					className="absolute top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-md border-2 border-blue-300/30 dark:border-blue-700/50 -rotate-12"
				/>

				{/* Enhanced heading with gradient text */}
				{/* <motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.7 }}
					className="text-3xl md:text-4xl lg:text-5xl font-bold 
            bg-clip-text text-transparent bg-gradient-to-r 
            from-indigo-600 via-purple-600 to-blue-600
            dark:from-indigo-400 dark:via-purple-300 dark:to-blue-400"
				>
					Professional Projects
				</motion.h2> */}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.7 }}
					whileInView="animate"
					viewport={{ once: true }}
				>
					<SectionHeading>Professional Projects</SectionHeading>
				</motion.div>

				{/* Animated underline */}
				{/* <motion.div
					initial={{ width: 0, opacity: 0 }}
					animate={{ width: "5rem", opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.8 }}
					className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 mx-auto mt-5 rounded-full"
				/> */}

				{/* Enhanced introduction text */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 0.7 }}
					className="text-gray-700 dark:text-gray-300 mt-8 max-w-3xl mx-auto text-lg"
				>
					I have worked on several client and other major projects
					throughout my professional career, delivering robust
					solutions and innovative features tailored to specific
					business needs. The following showcases represent some of my
					most impactful work:
				</motion.p>
			</motion.div>

			{/* Responsive project card grid with staggered animations */}
			<motion.div
				variants={projectContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className="flex flex-wrap justify-center gap-8 mt-16"
			>
				{projects.map((project, i) => (
					<ProjectCard key={i} project={project} index={i} />
				))}
			</motion.div>

			{/* Enhanced decorative floating elements with animations */}
			<motion.div
				animate={{
					y: [0, 15, 0],
					opacity: [0.5, 0.8, 0.5],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute top-20 right-20 w-8 h-8 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10"
			/>

			<motion.div
				animate={{
					y: [0, -15, 0],
					opacity: [0.5, 0.8, 0.5],
				}}
				transition={{
					duration: 5,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 1,
				}}
				className="absolute bottom-20 left-20 w-6 h-6 rounded-full bg-purple-500/10 dark:bg-purple-400/10"
			/>

			<motion.div
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.4, 0.7, 0.4],
				}}
				transition={{
					duration: 6,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 2,
				}}
				className="absolute top-1/3 left-1/4 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-400/10"
			/>
		</section>
	);
};

export default ExperienceProjects;
