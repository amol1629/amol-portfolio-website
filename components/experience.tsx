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

export default function Experience() {
	const { ref } = useSectionInView("Experience");
	const { theme } = useTheme();

	return (
		<section
			id="experience"
			ref={ref}
			className="scroll-mt-28 mb-28 sm:mb-40 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg p-6"
		>
			<SectionHeading>My Experience</SectionHeading>
			<VerticalTimeline lineColor="">
				{experiencesData.map((item, index) => (
					<VerticalTimelineElement
						key={index}
						contentStyle={{
							background:
								theme === "light"
									? "#f3f4f6"
									: "rgba(255, 255, 255, 0.05)",
							boxShadow: "none",
							border: "1px solid rgba(0, 0, 0, 0.05)",
							textAlign: "left",
							padding: "1.3rem 2rem",
							borderRadius: "1rem",
							transition: "all 0.3s ease-in-out",
						}}
						className="group relative transition-all duration-300 ease-in-out"
						contentArrowStyle={{
							borderRight:
								theme === "light"
									? "0.4rem solid #9ca3af"
									: "0.4rem solid rgba(255, 255, 255, 0.5)",
						}}
						date={item?.date}
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
									: "rgba(255, 255, 255, 0.15)",
							fontSize: "1.9rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* Hover Effect */}
						<div className="absolute inset-0 rounded-xl transition-all duration-300 ease-in-out bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800 group-hover:shadow-lg border-l-4 border-transparent group-hover:border-gray-700 dark:group-hover:border-gray-300"></div>

						<h3 className="font-bold text-lg capitalize mb-2 relative z-10">
							{item.title}
						</h3>
						<p className="font-normal text-gray-600 dark:text-slate-300 relative z-10">
							{item.location}
						</p>
						<p className="mt-1 font-normal text-gray-700 dark:text-white/75 relative z-10">
							{item.description}
						</p>
					</VerticalTimelineElement>
				))}
			</VerticalTimeline>
		</section>
	);
}
