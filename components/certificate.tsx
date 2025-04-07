"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";
import Image from "next/image";

const certificatesData = [
	{
		name: "JavaScript (Intermediate) Certificate",
		link: "https://www.hackerrank.com/certificates/bb858e7f1890",
		image: "/images/javascript.png",
	},
	{
		name: "TypeScript for Professionals - by Basarat",
		link: "https://www.udemy.com/certificate/UC-8f352c7f-2206-4a47-b690-eff0a09a1ff2/",
		image: "/images/typescript-professionals.jpg",
	},
	{
		name: "Hello React - React Training for JavaScript Beginners",
		link: "https://www.udemy.com/certificate/UC-f723eddd-ebea-4938-862d-8f591463c217/",
		image: "/images/react-training.jpg",
	},
	{
		name: "The Next.js 13 Bootcamp - The Complete Developer Guide",
		link: "https://www.udemy.com/certificate/UC-3852aed2-4bd1-4992-b4f3-a8832b681815/",
		image: "/images/nextjs-bootcamp.jpg",
	},
	{
		name: "Rest API (Intermediate) Certificate",
		link: "https://www.hackerrank.com/certificates/fb47322d7431",
		image: "/images/rest-api.png",
	},
	{
		name: "Tailwind CSS - A New Way To Think",
		link: "https://www.udemy.com/certificate/UC-510ec8e9-2810-4c10-a93a-f1c16664696a/",
		image: "/images/tailwind-css.jpg",
	},
	{
		name: "SOLID Principles: Introducing Software Architecture & Design",
		link: "https://www.udemy.com/certificate/UC-984796d8-e3f5-4210-b9de-85e6b3a641ed/",
		image: "/images/solid-principles.jpg",
	},
];

const fadeInAnimation = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

export default function Certificates() {
	const { ref } = useSectionInView("Certificates", 0.3); // or Experience

	return (
		<section
			id="certificates"
			ref={ref}
			className="relative mb-28 max-w-6xl mx-auto px-6 scroll-mt-28 text-center sm:mb-40 py-20 rounded-2xl overflow-hidden "
		>
			{/* 🌀 Animated Background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-gradient-x bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-blue-100 to-white dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#111827] blur-[120px] opacity-20"></div>
				<div className="absolute w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
				<div
					className="absolute w-72 h-72 bg-gray-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
					style={{ top: "30%", left: "60%" }}
				></div>
			</div>

			<motion.div
				variants={fadeInAnimation}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<SectionHeading>My Certificates</SectionHeading>
			</motion.div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
				{certificatesData.map((certificate, index) => (
					<motion.div
						key={index}
						variants={fadeInAnimation}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						whileHover={{ scale: 1.015 }}
						className="group relative h-full rounded-2xl border border-white/10 dark:border-white/5 shadow-xl bg-white/10 dark:bg-[#0e101a]/60 overflow-hidden hover:scale-[1.015] hover:border-blue-400/60 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"
					>
						{/* ✨ Subtle Glow Background on Hover */}
						<div className="absolute inset-0 -z-10 pointer-events-none">
							<div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]" />
						</div>

						{/* 🧠 Card Content */}
						<div className="relative z-10 h-full flex flex-col border border-white/10 dark:border-white/5 p-6 rounded-2xl bg-white/10 dark:bg-[#0e101a]/60 shadow-xl transition-all duration-300 ease-in-out group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)]">
							{/* 👁 Image */}
							<div className="flex-shrink-0">
								<Image
									src={certificate.image}
									alt={certificate.name}
									width={400}
									height={250}
									className="w-full h-40 object-cover rounded-lg shadow-sm mb-4"
								/>
							</div>

							{/* 📝 Text Content */}
							<div className="flex-grow">
								<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
									{certificate.name}
								</h3>
							</div>

							{/* 🖱️ Button */}
							<div className="flex-shrink-0 mt-auto">
								<Link
									href={certificate.link}
									target="_blank"
									rel="noopener noreferrer"
									className="relative inline-flex justify-center items-center  px-6 py-3 text-sm font-medium group overflow-hidden transition-all duration-300 ease-in-out"
								>
									{/* Button background with gradient animation */}
									<span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-500 opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out"></span>

									{/* Hover effect background with moving gradient */}
									<span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-400 dark:from-blue-700 dark:via-purple-600 dark:to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[length:200%_100%] group-hover:bg-[position:100%_0] bg-[position:0_0]"></span>

									{/* Button text with glow effect */}
									<span className="relative z-10 text-white tracking-wide flex items-center gap-2">
										View Certificate
										{/* Animated arrow icon */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
										>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
											></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</span>

									{/* Subtle glow effect */}
									<span className="absolute -inset-1 rounded-full bg-blue-400/20 dark:bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
								</Link>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
