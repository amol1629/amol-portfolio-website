"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTools, FaProjectDiagram, FaRocket } from "react-icons/fa";
import { SiAdobe } from "react-icons/si";
import { FaGraduationCap } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { HiOutlineLightBulb } from "react-icons/hi";

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

// Enhanced modern animations
const fadeIn = {
	initial: { opacity: 0, y: 40 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
	},
};

const projectContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const projectItem = {
	hidden: { opacity: 0, y: 30, scale: 0.9 },
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
		y: -8,
		transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
	},
};

// Modern list item animations for initial load
import { Variants } from "framer-motion";

const listItemInitial: Variants = {
	hidden: { opacity: 0, y: 15 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.05,
			duration: 0.4,
			ease: [0.25, 0.1, 0.25, 1],
		},
	}),
};

// Futuristic animated expansion for additional points
const listItemExpand = {
	hidden: { opacity: 0, height: 0, marginTop: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		height: "auto",
		marginTop: 12,
		scale: 1,
		transition: {
			height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
			opacity: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
			scale: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		marginTop: 0,
		scale: 0.95,
		transition: {
			height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
			opacity: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
			scale: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
		},
	},
};

// Staggered reveal for expanded items
const staggerContainer = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.07,
			delayChildren: 0.05,
		},
	},
};

const pointHighlight = {
	hidden: { opacity: 0, width: "0%" },
	show: {
		opacity: 1,
		width: "100%",
		transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
	},
};

// Interactive project card with enhanced modern UI animations
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
	const [expandedListRef, expandedInView] = useInView({
		threshold: 0.1,
		triggerOnce: false,
	});

	const initialVisiblePoints = project.points.slice(0, 3);
	const expandedPoints = project.points.slice(3);
	const hasMorePoints = project.points.length > 3;
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
			className="w-full sm:w-[85%] md:w-[45%] lg:w-[30%] h-full relative group overflow-hidden rounded-3xl shadow-xl 
        backdrop-blur-sm border border-white/10 
        bg-white/10 dark:bg-[#0e101a]/60
        transition-all duration-500 ease-out"
		>
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]" />
			</div>

			{/* Modern glow effect on hover */}

			{/* Modern animated accent line */}
			<motion.div
				initial={{ width: "0%", left: "50%", opacity: 0 }}
				animate={{
					width: inView ? "100%" : "0%",
					left: inView ? "0%" : "50%",
					opacity: inView ? 1 : 0,
				}}
				transition={{
					delay: delay + 0.2,
					duration: 0.8,
					ease: [0.25, 0.1, 0.25, 1],
				}}
				className="absolute top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400"
			/>

			{/* Card Header with floating icon */}
			<div className="relative p-6 pb-4 border-b border-white/10">
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: inView ? 0 : 20, opacity: inView ? 1 : 0 }}
					transition={{
						delay: delay + 0.2,
						duration: 0.5,
						ease: [0.25, 0.1, 0.25, 1],
					}}
					className="flex items-center gap-3"
				>
					<motion.div
						whileHover={{
							rotate: [0, 5, -5, 0],
							scale: 1.1,
							transition: {
								rotate: {
									duration: 0.6,
									ease: "easeInOut",
									repeat: 0,
								},
								scale: {
									duration: 0.3,
									ease: [0.25, 0.1, 0.25, 1],
								},
							},
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
					{/* Always visible points with modern reveal */}
					{initialVisiblePoints.map((point, j) => (
						<motion.li
							key={`initial-${j}`}
							custom={j}
							variants={listItemInitial}
							initial="hidden"
							animate={inView ? "visible" : "hidden"}
							className="flex items-start group/item gap-2 text-gray-700 dark:text-gray-300 relative overflow-hidden"
						>
							<span className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0">
								•
							</span>
							<span className="relative">
								{point}
								{/* Modern highlight animation on hover */}
								<motion.span
									initial={{ scaleX: 0 }}
									whileHover={{ scaleX: 1 }}
									transition={{
										duration: 0.3,
										ease: [0.25, 0.1, 0.25, 1],
									}}
									className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-300/0 via-indigo-400/70 to-indigo-300/0 dark:from-indigo-500/0 dark:via-indigo-400/70 dark:to-indigo-500/0 origin-left"
								/>
							</span>
						</motion.li>
					))}

					{/* Expandable points with futuristic enter/exit animations */}
					<AnimatePresence>
						{expanded && (
							<motion.div
								ref={expandedListRef}
								variants={staggerContainer}
								initial="hidden"
								animate="show"
								className="flex flex-col space-y-3"
							>
								{expandedPoints.map((point, j) => (
									<motion.li
										key={`expanded-${j}`}
										variants={listItemExpand}
										initial="hidden"
										animate="visible"
										exit="exit"
										className="flex items-start group/item gap-2 text-gray-700 dark:text-gray-300 relative"
									>
										<motion.span
											className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0"
											initial={{ opacity: 0, scale: 0 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												duration: 0.3,
												delay: j * 0.07,
											}}
										>
											•
										</motion.span>
										<span className="relative">
											{point}
											{/* Modern highlight animation on hover */}
											<motion.span
												initial={{ scaleX: 0 }}
												whileHover={{ scaleX: 1 }}
												transition={{
													duration: 0.3,
													ease: [0.25, 0.1, 0.25, 1],
												}}
												className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-300/0 via-indigo-400/70 to-indigo-300/0 dark:from-indigo-500/0 dark:via-indigo-400/70 dark:to-indigo-500/0 origin-left"
											/>
										</span>
										{/* Subtle entrance highlight */}
										<motion.div
											variants={pointHighlight}
											className="absolute bottom-0 left-0 w-full h-full bg-indigo-200/10 dark:bg-indigo-700/10 rounded-lg -z-10"
										/>
									</motion.li>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</ul>

				{/* Modern futuristic show more/less button */}
				{hasMorePoints && (
					<motion.button
						onClick={() => setExpanded(!expanded)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: inView ? 1 : 0 }}
						transition={{ delay: delay + 0.2, duration: 0.5 }}
						className="mt-4 self-start py-1.5 px-3 rounded-full
              bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30
              text-indigo-600 dark:text-indigo-300 text-sm font-medium
              border border-indigo-100 dark:border-indigo-800/50
              shadow-sm hover:shadow-md transition-all duration-300
              flex items-center gap-1.5"
					>
						{expanded ? "Show less" : `Show more`}
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

			{/* Enhanced modern decorative elements */}
			<motion.div
				animate={{
					opacity: [0.3, 0.5, 0.3],
					scale: [1, 1.05, 1],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute -bottom-12 -right-12 w-36 h-36 
				bg-gradient-to-tl from-indigo-500/10 to-transparent 
				dark:from-indigo-400/5 dark:to-transparent 
				rounded-full blur-xl"
			/>

			<motion.div
				animate={{
					opacity: [0.3, 0.6, 0.3],
					scale: [1, 1.1, 1],
				}}
				transition={{
					duration: 5,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 1,
				}}
				className="absolute top-1/4 -left-6 w-12 h-12 
				bg-purple-500/5 dark:bg-purple-400/5 
				rounded-full blur-md"
			/>
		</motion.div>
	);
};

const ExperienceProjects = () => {
	const { ref } = useSectionInView("Professional Projects", 0.1);
	const { theme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	// Only run animations after component is mounted (for SSR compatibility)
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const projects = [
		{
			title: "Quillionz – AI-based Question Generator",
			icon: (
				<HiOutlineLightBulb className="text-indigo-500 dark:text-indigo-400 text-xl" />
			),
			points: [
				"Migrated the frontend from legacy ASP.NET and C# to modern React + Node.js, boosting frontend performance by 40%.",
				"Single-handedly handled 100% of React development and UI logic across the entire application.",
				"Recreated pixel-perfect, responsive components based on the original site, improving user satisfaction by 35%.",
				"Enhanced UI/UX with a modern layout and smooth interactions using Tailwind CSS and Framer Motion, reducing bounce rate by 25%.",
				"Integrated 10+ REST APIs with robust error handling and optimized load times by 30%.",
				"Ensured full responsiveness across all device types, covering 99% of user screen resolutions.",
				"Implemented 5+ new features including dynamic form generators and visual dashboards, increasing feature usage by 50%.",
				"Applied DRY, KISS, and SOLID principles, reducing code redundancy by 60% and improving maintainability.",
			],
		},
		{
			title: "ALM-IP – Reusable Component Library",
			icon: (
				<SiAdobe className="text-indigo-500 dark:text-indigo-400 text-xl" />
			),
			points: [
				"Developed 25+ reusable components using Next.js, Tailwind CSS, and ShadCN, reducing dev time in other projects by 45%.",
				"Aligned components with ALM API specs for 100% seamless data flow and real-time interactivity.",
				"Enabled plug-and-play usage of components, saving 60% effort on future project integrations.",
				"Built futuristic, modular layouts with consistent theming across 100% of views.",
				"Authored clear documentation and flexible props for each component, improving onboarding speed by 50%.",
				"Prioritized accessibility, responsiveness, and animation-rich UI, leading to 40% better usability scores.",
				"All components reused successfully in 3+ follow-up projects with under 5% modification required.",
			],
		},
		{
			title: "ECPlayer – LMS Course Player",
			icon: (
				<FaGraduationCap className="text-indigo-500 dark:text-indigo-400 text-xl" />
			),
			points: [
				"Redesigned entire UI with React, Tailwind, and ShadCN, reducing legacy UI dependencies by 100%.",
				"Created immersive course player supporting SCORM 1.2 and xAPI, enhancing compatibility by 80%.",
				"Implemented real-time quiz scoring logic, improving learner feedback speed by 70%.",
				"Enhanced layout with progress indicators and smooth navigation, improving completion rate by 40%.",
				"Added Framer Motion animations, elevating visual appeal and increasing engagement by 30%.",
				"Integrated seamless course import/export with APIs, reducing user errors by 50%.",
				"Ensured full responsiveness, verified across 20+ device sizes and browsers with 99.9% accuracy.",
			],
		},
	];

	return (
		<section
			id="professional-projects"
			ref={ref}
			className="relative mb-28 sm:mb-40 max-w-6xl mx-auto px-4 sm:px-8 scroll-mt-28 text-center overflow-hidden py-24 rounded-3xl"
		>
			{/* Enhanced futuristic animated background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				{/* Modernized gradient background with enhanced animation */}
				<motion.div
					animate={{
						backgroundPosition: ["0% 0%", "100% 100%"],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "linear",
					}}
					className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100 via-sky-200 to-white dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#111827] blur-[120px] opacity-20"
					style={{
						backgroundSize: "200% 200%",
					}}
				/>

				{/* Modern animated blobs with smoother motion */}
				<motion.div
					animate={{
						x: [0, 30, -20, 10, 0],
						y: [0, -30, 20, -10, 0],
						scale: [1, 1.1, 0.9, 1.05, 1],
						opacity: [0.2, 0.3, 0.2],
					}}
					transition={{
						duration: 20,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror",
					}}
					className="absolute -top-20 -left-20 w-96 h-96 
						bg-indigo-300/20 dark:bg-indigo-900/20 
						rounded-full mix-blend-multiply filter blur-3xl"
				/>

				<motion.div
					animate={{
						x: [0, -30, 20, -10, 0],
						y: [0, 20, -30, 10, 0],
						scale: [1, 0.9, 1.1, 0.95, 1],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: 25,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror",
					}}
					className="absolute top-1/3 right-0 w-80 h-80 
						bg-sky-300/20 dark:bg-sky-800/20 
						rounded-full mix-blend-multiply filter blur-3xl"
				/>

				<motion.div
					animate={{
						x: [0, 20, -10, 30, 0],
						y: [0, 10, -20, 30, 0],
						scale: [1, 1.05, 0.95, 1.1, 1],
						opacity: [0.2, 0.35, 0.2],
					}}
					transition={{
						duration: 18,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror",
					}}
					className="absolute bottom-0 left-1/3 w-72 h-72 
						bg-purple-300/20 dark:bg-purple-800/20 
						rounded-full mix-blend-multiply filter blur-3xl"
				/>

				{/* Modern particle-like elements */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(8)].map((_, i) => (
						<motion.div
							key={i}
							initial={{
								x: Math.random() * 100 - 50 + "%",
								y: Math.random() * 100 - 50 + "%",
								opacity: 0.1 + Math.random() * 0.3,
								scale: 0.2 + Math.random() * 0.8,
							}}
							animate={{
								x: [
									Math.random() * 100 - 50 + "%",
									Math.random() * 100 - 50 + "%",
									Math.random() * 100 - 50 + "%",
								],
								y: [
									Math.random() * 100 - 50 + "%",
									Math.random() * 100 - 50 + "%",
									Math.random() * 100 - 50 + "%",
								],
								opacity: [
									0.1 + Math.random() * 0.3,
									0.2 + Math.random() * 0.3,
									0.1 + Math.random() * 0.3,
								],
							}}
							transition={{
								duration: 15 + Math.random() * 15,
								ease: "easeInOut",
								repeat: Infinity,
								repeatType: "reverse",
							}}
							className="absolute w-6 h-6 rounded-full bg-indigo-400/10 dark:bg-indigo-300/10 blur-md"
						/>
					))}
				</div>
			</div>

			{/* Enhanced heading section with modern animations */}
			<motion.div
				variants={fadeIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
				className="mb-16 relative z-10"
			>
				{/* Modern decorative geometric shapes */}
				<motion.div
					initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
					animate={{ opacity: 0.6, scale: 1, rotate: 12 }}
					transition={{
						delay: 0.2,
						duration: 1.5,
						rotate: {
							duration: 20,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "linear",
						},
					}}
					className="absolute -top-10 right-10 sm:right-20 w-8 h-8 border-2 border-indigo-300/30 dark:border-indigo-700/50"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{
						opacity: 0.6,
						scale: 1,
						y: [0, -10, 0],
					}}
					transition={{
						delay: 0.3,
						duration: 1.5,
						y: {
							duration: 5,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeInOut",
						},
					}}
					className="absolute top-20 left-10 sm:left-40 w-6 h-6 rounded-full border-2 border-purple-300/30 dark:border-purple-700/50"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
					animate={{
						opacity: 0.6,
						scale: 1,
						rotate: -12,
						x: [0, 10, 0, -10, 0],
					}}
					transition={{
						delay: 0.4,
						duration: 1.5,
						x: {
							duration: 8,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeInOut",
						},
					}}
					className="absolute top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-md border-2 border-blue-300/30 dark:border-blue-700/50"
				/>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.7 }}
					whileInView="animate"
					viewport={{ once: true }}
				>
					<SectionHeading>Professional Projects</SectionHeading>
				</motion.div>

				{/* Modern animated introduction text */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.7,
						duration: 0.7,
						ease: [0.25, 0.1, 0.25, 1],
					}}
					className="text-gray-700 dark:text-gray-300 mt-8 max-w-3xl mx-auto text-lg relative"
				>
					I have worked on several client and other major projects
					throughout my professional career, delivering robust
					solutions and innovative features tailored to specific
					business needs. The following showcases represent some of my
					most impactful work:
					{/* Subtle decorative underline */}
					<motion.span
						initial={{ scaleX: 0, opacity: 0 }}
						animate={{ scaleX: 1, opacity: 1 }}
						transition={{
							delay: 1.2,
							duration: 0.8,
							ease: [0.25, 0.1, 0.25, 1],
						}}
						className="absolute -bottom-2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent dark:via-indigo-500/30 origin-left"
					/>
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
