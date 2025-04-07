"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = (typeof projectsData)[number];

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
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

	return (
		<motion.div
			ref={ref}
			style={{
				scale: scaleProgress,
				opacity: opacityProgress,
			}}
			className="group mb-10 last:mb-0 w-full"
		>
			<section
				className="relative overflow-hidden rounded-2xl p-6 sm:pr-8 sm:h-[24rem]
	
	border border-white/10  shadow-xl
	bg-white/10 dark:bg-[#0e101a]/60
	 hover:scale-[1.015]
	group-even:sm:pl-8 hover:border-blue-400/60 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"
			>
				{/* ✨ Subtle Glow Background on Hover (No blur) */}
				<div className="absolute inset-0 -z-10 pointer-events-none">
					<div
						className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
			bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]"
					/>
				</div>

				{/* ✅ Main Content */}
				<div className="relative z-10 pt-4 pb-7 px-2 sm:pl-10 sm:pr-2 sm:pt-10 w-full sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
					<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
						{title}
					</h3>
					<p className="my-4 leading-relaxed text-gray-700 dark:text-gray-300">
						{description}
					</p>
					<ul className="flex flex-wrap gap-2 mt-4 sm:mt-auto">
						{tags.map((tag, index) => (
							// <li
							// 	key={index}
							// 	className="px-3 py-1 text-[0.75rem] uppercase tracking-wide text-white bg-black/70 dark:bg-white/10 rounded-full shadow-sm"
							// >
							// 	{tag}
							// </li>

							<motion.span
								key={index}
								variants={skillItemVariants}
								initial="initial"
								animate="animate"
								whileHover="whileHover"
								className="px-4 py-2 text-sm font-semibold rounded-full 
								backdrop-blur-md bg-white/30 dark:bg-white/10 
								text-gray-900 dark:text-white 
								border border-gray-300 dark:border-white/20 
								shadow-[0_0_10px_rgba(59,130,246,0.15)] hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] 
								transition-all duration-300 ease-in-out cursor-default whitespace-nowrap tracking-wide"
							>
								{tag}
							</motion.span>
						))}
					</ul>
				</div>

				{/* 🖼️ Project Image */}
				<Image
					src={imageUrl}
					alt={title}
					quality={95}
					className="absolute hidden sm:block top-8 -right-40 w-[25.25rem] rounded-t-lg shadow-2xl 
		transition-all duration-300 ease-in-out 
		group-hover:scale-[1.08] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-3
		group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-3
		group-even:right-[initial] group-even:-left-40 z-10"
				/>
			</section>
		</motion.div>
	);
}
