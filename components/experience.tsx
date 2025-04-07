"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

export default function Experience() {
	// const { ref } = useSectionInView("Experience");
	const { ref } = useSectionInView("Experience", 0.3); // or Experience
	const { theme } = useTheme();

	return (
		<section
			id="experience"
			ref={ref}
			className="relative mb-28 sm:mb-40 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28 overflow-hidden py-20 rounded-2xl"
		>
			{/* 🔮 Elegant Animated Background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] animate-gradient-x bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100 via-blue-200 to-white dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#111827] blur-[120px] opacity-20"></div>
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
				<SectionHeading>My Experience</SectionHeading>
			</motion.div>

			<VerticalTimeline lineColor="">
				{experiencesData.map((item, index) => (
					<VerticalTimelineElement
						key={index}
						date={item.date}
						contentStyle={{
							background: "transparent",
							border: "none",
							padding: "0",
							boxShadow: "none", // ✅ Add this
						}}
						contentArrowStyle={{
							borderRight:
								theme === "light"
									? "0.4rem solid rgba(156,163,175,0.5)"
									: "0.4rem solid rgba(255,255,255,0.3)",
						}}
						icon={
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.5 }}
							>
								{item.icon}
							</motion.div>
						}
						iconStyle={{
							background:
								theme === "light"
									? "white"
									: "rgba(255,255,255,0.15)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* Responsive Date (only on small screens) */}
						<div className="block sm:hidden text-sm text-gray-500 dark:text-gray-400 mb-2">
							{item.date}
						</div>

						{/* Hover wrapper */}
						<div className="group transition-all duration-300">
							<div
								className="relative group rounded-2xl shadow-xl p-6 transition-all duration-300 ease-in-out
    bg-white/10 dark:bg-[#0e101a]/60 hover:border-blue-400/60 border border-white/10 
    group-hover:scale-[1.015]
    group-hover:border-blue-400/60
    group-hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)]
   "
							>
								{/* ✨ Hover Glow Background Layer (does NOT blur text) */}
								<div
									className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500
      bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]
      z-0"
								/>

								{/* ✅ Text Container - stays crisp */}
								<div className="relative z-10">
									<h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">
										{item.title}
									</h3>
									<p className="font-medium text-gray-600 dark:text-slate-300">
										{item.location}
									</p>
									<p className="mt-2 text-gray-700 dark:text-white/75">
										{item.description}
									</p>
								</div>
							</div>
						</div>
					</VerticalTimelineElement>
				))}
			</VerticalTimeline>
		</section>
	);
}
