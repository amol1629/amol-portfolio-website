"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

type ProjectProps = (typeof projectsData)[number];

const tagVariants = {
	initial: {
		opacity: 0,
		y: 20,
		scale: 0.9,
		rotateX: -15,
		rotateY: 5,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotateX: 0,
		rotateY: 0,
		transition: {
			type: "spring",
			stiffness: 140,
			damping: 12,
			mass: 0.5,
			delay: 0.05,
		},
	},
	whileHover: {
		scale: 1.1,
		rotateX: 3,
		rotateY: -3,
		boxShadow: "0 0 14px rgba(59,130,246,0.5)",
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 10,
			duration: 0.3,
		},
	},
};


export default function Project({
	title,
	description,
	tags,
	imageUrl,
	githubUrl,
	index,
}: ProjectProps & { githubUrl: string; index: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1.33 1"],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

	const isEven = index % 2 === 0;

	return (
		<motion.div
			ref={ref}
			style={{
				scale: scaleProgress,
				opacity: opacityProgress,
			}}
			className="group mb-14 last:mb-0 w-full"
		>
			<section
				className={`relative overflow-hidden rounded-2xl px-4 py-6 sm:px-10 sm:py-8 
				flex flex-col-reverse ${
					isEven ? "sm:flex-row" : "sm:flex-row-reverse"
				} items-center justify-between gap-8
				border border-white/10 shadow-xl
				bg-white/10 dark:bg-[#0e101a]/60
				transition-all duration-300 ease-in-out hover:scale-[1.015] hover:border-blue-400/60 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)]`}
			>
				{/* ✨ Subtle Glow Background on Hover (No blur) */}
				<div className="absolute inset-0 -z-10 pointer-events-none">
					<div
						className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
			bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]"
					/>
				</div>
				{/* 📄 Text Content */}
				<div className="flex-1 flex flex-col justify-between gap-4 text-center sm:text-left">
					<h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
						{title}
					</h3>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
						{description}
					</p>

					{/* 🏷️ Tags */}
					<div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
						{tags.map((tag, index) => (
							<motion.span
								key={index}
								variants={tagVariants}
								initial="initial"
								animate="animate"
								whileHover="whileHover"
								className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full 
								bg-white/30 dark:bg-white/10 
								text-gray-900 dark:text-white 
								border border-gray-300 dark:border-white/20 
								shadow-[0_0_10px_rgba(59,130,246,0.15)] hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] 
								transition-all duration-300 ease-in-out tracking-wide cursor-default"
							>
								{tag}
							</motion.span>
						))}
					</div>

					{/* 🔗 GitHub Button */}
					<Link
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 inline-flex items-center gap-2 w-fit mx-auto
	px-5 py-2 text-sm sm:text-base font-semibold rounded-full
	bg-gradient-to-r from-blue-500 to-cyan-500 text-white
	hover:from-cyan-500 hover:to-blue-500
	shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
					>
						<FaGithub className="text-base sm:text-lg" />
						Open on GitHub
					</Link>
				</div>

				{/* 🖼️ Project Image */}
				<div className="w-full sm:w-[22rem] flex-shrink-0 relative">
					<Image
						src={imageUrl}
						alt={title}
						width={600}
						height={400}
						quality={95}
						className="rounded-xl shadow-2xl
						transition-all duration-500 ease-in-out
						group-hover:scale-[1.06] group-hover:-rotate-2 group-hover:translate-y-2"
					/>
				</div>
			</section>
		</motion.div>
	);
}
