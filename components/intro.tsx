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

interface TypewriterProps {
	text: string;
	delay?: number;
	onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
	text,
	delay = 30,
	onComplete,
}) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		// Reset state when text changes
		setDisplayedText("");
		setCurrentIndex(0);
	}, [text]);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, delay);

			return () => clearTimeout(timeout);
		} else if (onComplete) {
			onComplete();
		}
	}, [currentIndex, delay, text, onComplete]);

	return <>{displayedText}</>;
};

// Simplified floating particles
const FloatingParticles: React.FC = () => {
	// Reduced number of particles from 8 to 4
	return (
		<>
			{[...Array(4)].map((_, i) => (
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
						duration: Math.random() * 10 + 15, // Slower animation
						repeat: Infinity,
						ease: "easeInOut",
						delay: i * 1,
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

	const phrases = [
		"Front-end developer",
		"JavaScript expert",
		"React specialist",
		"Next.js enthusiast",
		"UI craftsman",
	];

	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	// Typing speed (in milliseconds)
	const typingDelay = 100;
	const deletingDelay = 50;
	const pauseDelay = 1000;

	useEffect(() => {
		const timeout = setTimeout(
			() => {
				// Current phrase being handled
				const currentPhrase = phrases[currentIndex];

				// If deleting
				if (isDeleting) {
					setCurrentText(
						currentPhrase.substring(0, currentText.length - 1)
					);

					// When deletion is complete
					if (currentText.length === 0) {
						setIsDeleting(false);
						// Move to next phrase
						setCurrentIndex((prev) => (prev + 1) % phrases.length);
					}
				}
				// If typing
				else {
					setCurrentText(
						currentPhrase.substring(0, currentText.length + 1)
					);

					// When typing is complete
					if (currentText.length === currentPhrase.length) {
						// Pause before starting to delete
						setTimeout(() => {
							setIsDeleting(true);
						}, pauseDelay);
					}
				}
			},
			isDeleting ? deletingDelay : typingDelay
		);

		return () => clearTimeout(timeout);
	}, [currentText, currentIndex, isDeleting, phrases]);

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
			className="relative mb-4 max-w-[60rem] text-center sm:mb-0 scroll-mt-[100rem] px-4 py-4 md:px-6 md:py-8 lg:px-8 lg:py-12 overflow-hidden"
		>
			{/* Simplified Background Elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/10 dark:bg-blue-500/10 rounded-full filter blur-3xl" />
				<div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/10 rounded-full filter blur-3xl" />
				<FloatingParticles />
			</div>

			{/* Profile Image with Simpler Effect */}
			<motion.div
				className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<div className="relative">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 100,
							duration: 0.5,
						}}
					>
						<div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48">
							{/* Simplified ring effect */}
							<div className="absolute inset-0 rounded-full border-2 border-blue-400/30 dark:border-cyan-400/30" />

							<Image
								src="/profile_photo.jpeg"
								alt="Amol portrait"
								width="192"
								height="192"
								quality="95"
								priority={true}
								className="h-full w-full rounded-full object-cover border-[3px] border-white/20 dark:border-white/30 shadow-lg"
							/>
						</div>
					</motion.div>

					<motion.span
						className="absolute -bottom-2 -right-2 text-3xl sm:text-4xl"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							delay: 0.2,
							duration: 0.5,
						}}
					>
						<span className="relative z-10">👋</span>
					</motion.span>
				</div>
			</motion.div>

			{/* Animated Typography with Typewriter Effect */}
			<motion.div
				className="mb-10 mt-6 px-2 text-xl sm:text-2xl md:text-3xl font-medium leading-tight sm:leading-[1.5] tracking-wide min-h-[12rem] sm:min-h-[10rem]"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.6,
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
					<span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent inline-block min-w-[180px]">
						{currentText}
						<span className="animate-blink">|</span>
					</span>
				</div>

				<div className="text-gray-700 dark:text-gray-300">
					Passionate about clean code and creating beautiful UIs.
				</div>
			</motion.div>

			{/* Simplified Action Buttons */}
			<motion.div
				className="flex flex-wrap gap-4 justify-center items-center mt-8"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.5,
					duration: 0.6,
				}}
			>
				{/* Contact Me Button - Fixed to use href properly */}
				<Link href="#contact">
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => {
							setActiveSection("Contact");
							setTimeOfLastClick(Date.now());
						}}
						className="px-6 py-3 flex gap-2 items-center rounded-full cursor-pointer bg-blue-600 text-white shadow-md hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 transition-all duration-300 ease-in-out"
					>
						<span className="font-medium">Contact Me</span>
						<BsArrowRight />
					</motion.div>
				</Link>

				{/* Resume Download Button */}
				<motion.a
					href="/RESUME--RATHOD_AMOL_ANIRUDHA.pdf"
					download
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="px-6 py-3 flex gap-2 items-center rounded-full cursor-pointer bg-purple-600 text-white shadow-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-all duration-300 ease-in-out"
				>
					<span className="font-medium">Resume</span>
					<HiDownload />
				</motion.a>

				{/* Social Media Links - Now circular */}
				<motion.a
					href="https://www.linkedin.com/in/amol-rathod-44b4aa230/"
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="p-3 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out"
				>
					<BsLinkedin />
				</motion.a>

				<motion.a
					href="https://github.com/amol1629"
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="p-3 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 ease-in-out"
				>
					<FaGithubSquare />
				</motion.a>
			</motion.div>
		</section>
	);
}
