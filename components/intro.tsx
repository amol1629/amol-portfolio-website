"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

const Typewriter = ({ text, delay = 30 }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, delay);

			return () => clearTimeout(timeout);
		}
	}, [currentIndex, delay, text]);

	return <>{displayedText}</>;
};

const FloatingParticles = () => {
	return (
		<>
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute rounded-full bg-blue-400/20 dark:bg-cyan-400/20"
					initial={{
						x: Math.random() * 100 - 50,
						y: Math.random() * 100 - 50,
						opacity: 0,
						scale: 0.5,
						width: Math.random() * 10 + 5,
						height: Math.random() * 10 + 5,
					}}
					animate={{
						x: Math.random() * 200 - 100,
						y: Math.random() * 200 - 100,
						opacity: [0, 0.4, 0],
						scale: [0.5, 1.2, 0.8],
					}}
					transition={{
						duration: Math.random() * 10 + 10,
						repeat: Infinity,
						ease: "easeInOut",
						delay: i * 0.5,
					}}
				/>
			))}
		</>
	);
};

export default function Intro() {
	const { ref } = useSectionInView("Home", 0.5);
	const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
	const controls = useAnimation();
	const [hoveredButton, setHoveredButton] = useState(null);

	const phrases = [
		"Front-end developer",
		"React specialist",
		"Next.js enthusiast",
		"UI craftsman",
	];
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

	useEffect(() => {
		const cyclePhrases = () => {
			setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
		};
		const interval = setInterval(cyclePhrases, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		controls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.8 },
		});
	}, [controls]);

	return (
		<section
			ref={ref}
			id="home"
			className="relative mb-4 max-w-[60rem] text-center sm:mb-0 scroll-mt-[100rem] px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16 overflow-hidden"
		>
			{/* Animated Background Elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/10 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-float-slow" />
				<div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-float-medium" />
				<FloatingParticles />
			</div>

			{/* Profile Image with Holographic Effect */}
			<motion.div
				className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<div className="relative">
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 150,
							duration: 0.6,
						}}
					>
						<div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48">
							{/* Holographic rings */}
							<motion.div
								className="absolute inset-0 rounded-full border-2 border-blue-400/30 dark:border-cyan-400/30"
								animate={{
									scale: [1, 1.1, 1],
									opacity: [0.5, 0.8, 0.5],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
							<motion.div
								className="absolute inset-0 rounded-full border-2 border-blue-400/20 dark:border-cyan-400/20"
								animate={{
									scale: [1, 1.2, 1],
									opacity: [0.3, 0.6, 0.3],
								}}
								transition={{
									duration: 6,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1,
								}}
							/>

							<Image
								src="/profile_photo.jpeg"
								alt="Amol portrait"
								width="192"
								height="192"
								quality="95"
								priority={true}
								className="h-full w-full rounded-full object-cover border-[3px] border-white/20 dark:border-white/30 shadow-lg dark:shadow-gray-800/50 backdrop-blur-sm"
							/>
						</div>
					</motion.div>

					<motion.span
						className="absolute -bottom-2 -right-2 text-3xl sm:text-4xl"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 150,
							delay: 0.2,
							duration: 0.8,
						}}
					>
						<motion.div
							animate={{
								rotate: [0, 10, -10, 0],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						>
							<div className="relative">
								<div className="absolute inset-0 bg-blue-400 dark:bg-cyan-500 rounded-full blur-sm animate-ping opacity-30" />
								<span className="relative z-10">👋</span>
							</div>
						</motion.div>
					</motion.span>
				</div>
			</motion.div>

			{/* Animated Typography with Typewriter Effect */}
			<motion.div
				className="mb-10 mt-6 px-2 text-xl sm:text-2xl md:text-3xl font-medium leading-tight sm:leading-[1.5] tracking-wide min-h-[12rem] sm:min-h-[10rem]"
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
				}}
			>
				<div className="mb-4">
					<span className="font-bold text-gray-900 dark:text-white">
						<Typewriter text="Hello, I'm Amol Rathod." delay={50} />
					</span>
				</div>

				<div className="mb-4">
					<span className="text-gray-800 dark:text-gray-200">
						I'm a{" "}
					</span>
					<AnimatePresence mode="wait">
						<motion.span
							key={currentPhraseIndex}
							className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							{phrases[currentPhraseIndex]}
						</motion.span>
					</AnimatePresence>
				</div>

				<div className="text-gray-700 dark:text-gray-300">
					<Typewriter
						text="I build immersive digital experiences with React, Next.js, and modern UI principles."
						delay={20}
					/>
				</div>
			</motion.div>

			{/* Futuristic Action Buttons with Hover Effects */}
			<motion.div
				className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg font-medium"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				{/* Contact Button with Digital Pulse Effect */}
				<motion.div
					whileHover="hover"
					whileTap="tap"
					variants={{
						hover: { y: -5 },
						tap: { scale: 0.95 },
					}}
					onHoverStart={() => setHoveredButton("contact")}
					onHoverEnd={() => setHoveredButton(null)}
					className="relative"
				>
					<Link
						href="#contact"
						className="group relative overflow-hidden bg-gray-900 dark:bg-gradient-to-br dark:from-blue-600 dark:to-teal-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 flex items-center gap-2 rounded-full outline-none transition-all duration-300 shadow-lg hover:shadow-xl dark:hover:shadow-blue-500/30 border border-gray-300/10"
						onClick={() => {
							setActiveSection("Contact");
							setTimeOfLastClick(Date.now());
						}}
					>
						<span className="relative z-10">
							<Typewriter text="Contact me" delay={30} />
						</span>
						<motion.span
							className="relative z-10"
							animate={{
								x: hoveredButton === "contact" ? [0, 5, 0] : 0,
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								repeatType: "loop",
							}}
						>
							<BsArrowRight />
						</motion.span>
						{hoveredButton === "contact" && (
							<motion.div
								className="absolute inset-0 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full"
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1.2, opacity: 0.4 }}
								exit={{ scale: 1.5, opacity: 0 }}
								transition={{ duration: 0.8 }}
							/>
						)}
					</Link>
				</motion.div>

				{/* Download CV Button with Digital Download Effect */}
				<motion.div
					whileHover="hover"
					whileTap="tap"
					variants={{
						hover: { y: -5 },
						tap: { scale: 0.95 },
					}}
					onHoverStart={() => setHoveredButton("download")}
					onHoverEnd={() => setHoveredButton(null)}
					className="relative"
				>
					<a
						className="group relative overflow-hidden bg-white text-gray-700 dark:bg-white/10 dark:text-white/90 px-5 py-2.5 sm:px-6 sm:py-3 flex items-center gap-2 rounded-full outline-none transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-300 dark:border-white/20"
						href="/RESUME--RATHOD_AMOL_ANIRUDHA.pdf"
						download
					>
						<span className="relative z-10">
							<Typewriter text="Download CV" delay={30} />
						</span>
						<motion.div
							className="relative z-10"
							animate={{
								y: hoveredButton === "download" ? [0, 2, 0] : 0,
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						>
							<HiDownload />
						</motion.div>
						{hoveredButton === "download" && (
							<motion.div
								className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500/30 dark:bg-cyan-500/30"
								initial={{ width: 0 }}
								animate={{ width: "100%" }}
								transition={{ duration: 1.5, ease: "linear" }}
							/>
						)}
					</a>
				</motion.div>

				{/* Social Icons with Particle Burst */}
				<div className="flex gap-2 sm:gap-3">
					<motion.div
						whileHover="hover"
						whileTap="tap"
						variants={{
							hover: { y: -5 },
							tap: { scale: 0.9 },
						}}
					>
						<motion.a
							className="relative p-2.5 sm:p-3 text-gray-700 dark:text-white rounded-full bg-white dark:bg-white/10 shadow-md hover:shadow-lg border border-gray-300 dark:border-white/20 transition-all duration-300 flex items-center justify-center"
							href="https://www.linkedin.com/in/amol-rathod-44b4aa230/"
							target="_blank"
							whileHover={{
								scale: 1.1,
								backgroundColor: "rgba(10, 102, 194, 0.1)",
							}}
						>
							<BsLinkedin className="text-lg sm:text-xl" />
						</motion.a>
					</motion.div>

					<motion.div
						whileHover="hover"
						whileTap="tap"
						variants={{
							hover: { y: -5 },
							tap: { scale: 0.9 },
						}}
					>
						<motion.a
							className="relative p-2.5 sm:p-3 text-gray-700 dark:text-white rounded-full bg-white dark:bg-white/10 shadow-md hover:shadow-lg border border-gray-300 dark:border-white/20 transition-all duration-300 flex items-center justify-center"
							href="https://github.com/amol1629"
							target="_blank"
							whileHover={{
								scale: 1.1,
								backgroundColor: "rgba(36, 41, 46, 0.1)",
							}}
						>
							<FaGithubSquare className="text-lg sm:text-xl" />
						</motion.a>
					</motion.div>
				</div>
			</motion.div>

			{/* Floating Tech Tags */}
			<motion.div
				className="hidden sm:flex flex-wrap justify-center gap-2 mt-12 opacity-70"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.7 }}
				transition={{ delay: 1 }}
			>
				{[
					"HTML",
					"CSS",
					"JavaScript",
					"React.js",
					"Next.js",
					"TypeScript",
					"Tailwind CSS",
					"Node.js",
					
				].map((tech, i) => (
					<motion.span
						key={tech}
						className="text-xs px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-gray-700 dark:text-white/80 border border-gray-300 dark:border-white/20"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 + i * 0.1 }}
						whileHover={{
							scale: 1.1,
							backgroundColor: "rgba(59, 130, 246, 0.2)",
						}}
					>
						{tech}
					</motion.span>
				))}
			</motion.div>
		</section>
	);
}
