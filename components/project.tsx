"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
	title,
	description,
	tags,
	imageUrl,
}: ProjectProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1.33 1"],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

	return (
		<motion.div
			ref={ref}
			style={{
				scale: scaleProgress,
				opacity: opacityProgress,
			}}
			className="group mb-6 sm:mb-10 last:mb-0 "
		>
			<section
				className="relative bg-gray-100  bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg group dark:bg-gray-800 max-w-[44rem] dark:border-gray-700 rounded-2xl overflow-hidden 
        sm:pr-8 sm:h-[24rem] transition-all duration-300 ease-in-out 
        hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg group-hover:scale-105
        border-l-4 border-transparent group-hover:border-gray-700 dark:group-hover:border-gray-300"
			>
				{/* Animated Background Layer (Same as Skills Component) */}
				<div className="absolute inset-0 transition-all duration-300 ease-in-out bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800"></div>

				<div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
					<h3 className="text-2xl font-semibold text-gray-900 dark:text-white relative z-10">
						{title}
					</h3>
					<p className="my-4 leading-relaxed text-gray-700 dark:text-gray-300 relative z-10">
						{description}
					</p>
					<ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto relative z-10">
						{tags.map((tag, index) => (
							<li
								key={index}
								className="px-3 py-1 text-[0.75rem] uppercase tracking-wide text-white bg-gray-900 dark:bg-gray-600 rounded-full shadow-sm transition-transform duration-200 ease-in-out transform group-hover:scale-105"
							>
								{tag}
							</li>
						))}
					</ul>
				</div>

				{/* Image Section with Hover Animation */}
				<Image
					src={imageUrl}
					alt={title}
					quality={95}
					className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl 
          transition-all duration-300 ease-in-out 
          group-hover:scale-[1.08] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-3
          group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-3
          group-even:right-[initial] group-even:-left-40"
				/>
			</section>
		</motion.div>
	);
}
