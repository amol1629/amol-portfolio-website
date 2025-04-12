"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";
import Image from "next/image";

interface Certificate {
	name: string;
	link: string;
	image: string;
	pdfLink?: string;
}

interface DownloadingStates {
	[key: string]: {
		image: boolean;
		pdf: boolean;
	};
}

const certificatesData: Certificate[] = [
	{
		name: "JavaScript (Intermediate) Certificate",
		link: "https://www.hackerrank.com/certificates/bb858e7f1890",
		image: "/images/javascript.png",
		pdfLink: "/pdfs/javascript.pdf", // Assuming PDF versions exist
	},
	{
		name: "TypeScript for Professionals - by Basarat",
		link: "https://www.udemy.com/certificate/UC-8f352c7f-2206-4a47-b690-eff0a09a1ff2/",
		image: "/images/typescript-professionals.jpg",
		pdfLink: "/pdfs/typescript-professionals.pdf",
	},
	{
		name: "Hello React - React Training for JavaScript Beginners",
		link: "https://www.udemy.com/certificate/UC-f723eddd-ebea-4938-862d-8f591463c217/",
		image: "/images/react-training.jpg",
		pdfLink: "/pdfs/react-training.pdf",
	},
	{
		name: "The Next.js 13 Bootcamp - The Complete Developer Guide",
		link: "https://www.udemy.com/certificate/UC-3852aed2-4bd1-4992-b4f3-a8832b681815/",
		image: "/images/nextjs-bootcamp.jpg",
		pdfLink: "/pdfs/nextjs-bootcamp.pdf",
	},
	{
		name: "Rest API (Intermediate) Certificate",
		link: "https://www.hackerrank.com/certificates/fb47322d7431",
		image: "/images/rest-api.png",
		pdfLink: "/pdfs/rest-api.pdf",
	},
	{
		name: "Tailwind CSS - A New Way To Think",
		link: "https://www.udemy.com/certificate/UC-510ec8e9-2810-4c10-a93a-f1c16664696a/",
		image: "/images/tailwind-css.jpg",
		pdfLink: "/pdfs/tailwind-css.pdf",
	},
	{
		name: "SOLID Principles: Introducing Software Architecture & Design",
		link: "https://www.udemy.com/certificate/UC-984796d8-e3f5-4210-b9de-85e6b3a641ed/",
		image: "/images/solid-principles.jpg",
		pdfLink: "/pdfs/solid-principles.pdf",
	},
];

// Futuristic animations
const fadeInAnimation = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
			delay: 0.1,
		},
	},
};

const modalVariants = {
	hidden: { opacity: 0, y: 20, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 30,
			mass: 1,
			delay: 0.1,
		},
	},
	exit: {
		opacity: 0,
		y: 20,
		scale: 0.98,
		transition: {
			duration: 0.4,
			ease: [0.36, 0, 0.66, -0.56],
		},
	},
};

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

const formatSelectorVariants = {
	hidden: { opacity: 0, y: 10, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 30,
		},
	},
	exit: {
		opacity: 0,
		y: 10,
		scale: 0.95,
		transition: {
			duration: 0.2,
			ease: "easeIn",
		},
	},
};

const particleVariants = {
	animate: (i: number) => ({
		y: [0, -15, 0],
		x: [0, Math.random() * 10 - 5, 0],
		opacity: [0.4, 0.8, 0.4],
		scale: [1, 1.2, 1],
		transition: {
			duration: 4 + Math.random() * 3,
			repeat: Infinity,
			repeatType: "reverse" as const,
			delay: i * 0.1,
		},
	}),
};

const hologramEffect = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	exit: {
		opacity: 0,
		y: 20,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

export default function Certificates() {
	const { ref } = useSectionInView("Certificates", 0.3);
	const [selectedCertificate, setSelectedCertificate] =
		useState<Certificate | null>(null);
	const [downloadingStates, setDownloadingStates] =
		useState<DownloadingStates>({});
	const [showParticles, setShowParticles] = useState<boolean>(false);
	const [showFormatSelector, setShowFormatSelector] =
		useState<boolean>(false);
	const [selectedFormat, setSelectedFormat] = useState<"jpg" | "pdf">("jpg");
	const [isDownloading, setIsDownloading] = useState<boolean>(false);

	// Hide navbar when modal is open
	useEffect(() => {
		if (selectedCertificate) {
			document.body.style.overflow = "hidden";
			const navbar = document.querySelector(".navbar") as HTMLElement;
			if (navbar) navbar.style.display = "none";

			// Show particles after a delay
			const timer = setTimeout(() => setShowParticles(true), 300);
			return () => clearTimeout(timer);
		} else {
			document.body.style.overflow = "auto";
			const navbar = document.querySelector(".navbar") as HTMLElement | null;
			if (navbar) navbar.style.display = "flex";
			setShowFormatSelector(false);
		}
	}, [selectedCertificate]);

	const openModal = (certificate: Certificate) => {
		setSelectedCertificate(certificate);
	};

	const closeModal = () => {
		setShowParticles(false);
		setTimeout(() => {
			setSelectedCertificate(null);
		}, 100);
	};

	const toggleFormatSelector = () => {
		setShowFormatSelector(!showFormatSelector);
	};

	const handleDownload = async () => {
		if (!selectedCertificate) return;

		setIsDownloading(true);
		const type = selectedFormat === "jpg" ? "image" : "pdf";
		const fileUrl =
			selectedFormat === "jpg"
				? selectedCertificate.image
				: selectedCertificate.pdfLink;
		const fileExtension = selectedFormat;

		if (!fileUrl) {
			console.error(
				`No ${type} URL available for ${selectedCertificate.name}`
			);
			setIsDownloading(false);
			return;
		}

		try {
			const response = await fetch(fileUrl);
			const blob = await response.blob();
			const downloadLink = document.createElement("a");
			downloadLink.href = URL.createObjectURL(blob);
			downloadLink.download = `${selectedCertificate.name.replace(
				/\s+/g,
				"-"
			)}.${fileExtension}`;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		} catch (error) {
			console.error(`Download failed for ${type}:`, error);
		} finally {
			setTimeout(() => {
				setIsDownloading(false);
				setShowFormatSelector(false);
			}, 1500);
		}
	};

	const particles = Array.from({ length: 20 }, (_, i) => i);

	return (
		<section
			id="certificates"
			ref={ref}
			className="relative mb-28 max-w-6xl mx-auto px-6 scroll-mt-28 text-center sm:mb-40 py-20 rounded-2xl overflow-hidden"
		>
			{/* Futuristic background effects */}
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

			{/* Certificate grid (keep your existing grid code) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
				{certificatesData.map((certificate, index) => (
					<motion.div
						key={index}
						variants={fadeInAnimation}
						initial="initial"
						whileInView="animate"
						viewport={{ once: true }}
						whileHover={{ scale: 1.015 }}
						className="group relative h-full rounded-2xl border border-white/10 dark:border-white/5 shadow-xl bg-white/10 dark:bg-[#0e101a]/60 overflow-hidden hover:border-blue-400/60 hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"
					>
						{/* ✨ Subtle Glow Background on Hover */}
						<div className="absolute inset-0 -z-10 pointer-events-none">
							<div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]" />
						</div>

						{/* 🧠 Card Content */}
						<div className="relative z-10 h-full flex flex-col border border-white/10 dark:border-white/5 p-6 rounded-2xl bg-white/10 dark:bg-[#0e101a]/60 shadow-xl transition-all duration-300 ease-in-out group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.25)]">
							{/* 👁 Image */}
							<div
								className="flex-shrink-0 cursor-pointer overflow-hidden rounded-lg relative"
								onClick={() => openModal(certificate)}
							>
								<Image
									src={certificate.image}
									alt={certificate.name}
									width={400}
									height={250}
									className="w-full h-40 object-cover rounded-lg shadow-sm mb-4 transition-transform duration-500 hover:scale-110"
								/>

								{/* Image Overlay with Enhanced Zoom Icon */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 dark:from-black/80 dark:to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
									<motion.div
										className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30"
										initial={{ scale: 0.8, opacity: 0 }}
										whileInView={{ scale: 1, opacity: 1 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 10,
											delay: 0.1,
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
											/>
										</svg>
									</motion.div>
								</div>
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
									className="relative inline-flex justify-center items-center px-6 py-3 text-sm font-medium group overflow-hidden transition-all duration-300 ease-in-out"
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

			{/* Futuristic modal with animated format selector */}
			<AnimatePresence>
				{selectedCertificate && (
					<>
						<motion.div
							className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
							variants={backdropVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							onClick={closeModal}
						/>

						{showParticles && (
							<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
								{particles.map((i) => (
									<motion.div
										key={i}
										custom={i}
										variants={particleVariants}
										animate="animate"
										className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/40 dark:bg-cyan-400/40"
										style={{
											left: `${Math.random() * 100}%`,
											top: `${Math.random() * 100}%`,
										}}
									/>
								))}
							</div>
						)}

						<motion.div
							className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 "
							onClick={(e) => e.stopPropagation()}
						>
							<motion.div
								className="relative bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 max-w-4xl w-full  md:h-auto max-h-[90vh] flex flex-col shadow-2xl border border-white/20 dark:border-gray-700/30"
								variants={modalVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								{/* Holographic border effect */}
								<div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
									<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 dark:from-blue-500/5 dark:via-purple-500/3 dark:to-cyan-500/5"></div>
									<div className="absolute inset-0 border border-white/10 dark:border-gray-700/20 rounded-2xl"></div>
									<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.05)_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.03)_70%)] animate-pulse-slow"></div>
								</div>

								{/* Close button with futuristic animation */}
								<motion.button
									onClick={closeModal}
									className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 group border border-white/30 dark:border-gray-700/30 shadow-sm"
									whileHover={{ scale: 1.1, rotate: 90 }}
									whileTap={{ scale: 0.95 }}
									transition={{
										type: "spring",
										stiffness: 500,
										damping: 15,
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-gray-200"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</motion.button>

								{/* Certificate content with scroll container */}
								<div className="flex-1 flex flex-col min-h-0 overflow-hidden">
									<motion.h3
										className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center px-4"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.2,
											duration: 0.6,
											ease: [0.22, 1, 0.36, 1],
										}}
									>
										{selectedCertificate.name}
									</motion.h3>

									{/* Scrollable content area with custom scrollbar */}
									<motion.div
										className="flex-1 overflow-y-auto min-h-0 scroll-smooth px-4 flex flex-col items-center futuristic-scrollbar rounded-2xl"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.1 }}
									>
										<div className="w-full mb-6 flex justify-center items-center">
											<div className="relative max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] rounded-2xl">
												<motion.div
													initial={{
														scale: 0.98,
														opacity: 0,
													}}
													animate={{
														scale: 1,
														opacity: 1,
													}}
													transition={{
														duration: 0.6,
														ease: [
															0.22, 1, 0.36, 1,
														],
														delay: 0.3,
													}}
													className="relative h-full rounded-2xl"
												>
													<Image
														src={
															selectedCertificate.image
														}
														alt={
															selectedCertificate.name
														}
														width={800}
														height={600}
														className="rounded-2xl object-contain max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] shadow-lg"
														style={{
															maxWidth: "100%",
														}}
													/>
													{/* Holographic overlay effect */}
													<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.1)_0%,transparent_50%,rgba(59,130,246,0.1)_100%)] pointer-events-none rounded-2xl"></div>
												</motion.div>
											</div>
										</div>

										{/* View original link */}
										<div className="mb-4 text-center">
											<Link
												href={selectedCertificate.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
											>
												View original certificate
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
													className="ml-1"
												>
													<line
														x1="5"
														y1="12"
														x2="19"
														y2="12"
													></line>
													<polyline points="12 5 19 12 12 19"></polyline>
												</svg>
											</Link>
										</div>
									</motion.div>

									{/* Download section - Fixed at bottom */}
									<motion.div
										className="relative w-full max-w-md mx-auto p-4 mt-auto"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: 0.4,
											duration: 0.6,
											ease: [0.22, 1, 0.36, 1],
										}}
									>
										{/* Format selector floating above button */}
										<AnimatePresence>
											{showFormatSelector && (
												<motion.div
													className="absolute bottom-full left-0 right-0 mb-4 z-10 px-4 sm:px-0"
													initial={{
														opacity: 0,
														y: 20,
														scale: 0.95,
													}}
													animate={{
														opacity: 1,
														y: 0,
														scale: 1,
													}}
													exit={{
														opacity: 0,
														y: 10,
														scale: 0.95,
													}}
													transition={{
														type: "spring",
														stiffness: 500,
														damping: 30,
													}}
												>
													<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
														{/* Floating selector with gradient border */}
														<div className="relative p-2 bg-gradient-to-br from-white/80 to-gray-50 dark:from-gray-800/80 dark:to-gray-900/50">
															{/* Animated background effect */}
															<div className="absolute inset-0 overflow-hidden pointer-events-none">
																<motion.div
																	className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#6366f1_25%,#3b82f6_50%,#6366f1_75%,#3b82f6_100%)] opacity-[0.03] dark:opacity-[0.05]"
																	animate={{
																		backgroundPosition:
																			[
																				"0%",
																				"100%",
																			],
																	}}
																	transition={{
																		duration: 4,
																		repeat: Infinity,
																		ease: "linear",
																	}}
																/>
															</div>

															<div className="flex gap-2">
																{[
																	{
																		format: "jpg" as const,
																		icon: "🖼️",
																		label: "Image",
																	},
																	{
																		format: "pdf" as const,
																		icon: "📄",
																		label: "PDF",
																	},
																].map(
																	(
																		option
																	) => (
																		<motion.button
																			key={
																				option.format
																			}
																			onClick={() => {
																				setSelectedFormat(
																					option.format
																				);
																				handleDownload();
																			}}
																			className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200 ${
																				selectedFormat ===
																				option.format
																					? "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
																					: "bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
																			}`}
																			whileHover={{
																				scale: 1.03,
																			}}
																			whileTap={{
																				scale: 0.97,
																			}}
																			initial={{
																				opacity: 0,
																				y: 10,
																			}}
																			animate={{
																				opacity: 1,
																				y: 0,
																			}}
																			transition={{
																				delay: 0.1,
																			}}
																		>
																			{/* Selection indicator */}
																			{selectedFormat ===
																				option.format && (
																				<motion.div
																					className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
																					initial={{
																						scaleX: 0,
																					}}
																					animate={{
																						scaleX: 1,
																					}}
																					transition={{
																						duration: 0.3,
																					}}
																				/>
																			)}

																			<motion.span
																				className="text-xl sm:text-2xl mb-1"
																				animate={
																					selectedFormat ===
																					option.format
																						? {
																								y: [
																									0,
																									-5,
																									0,
																								],
																								scale: [
																									1,
																									1.2,
																									1,
																								],
																						  }
																						: {}
																				}
																				transition={{
																					duration: 1.5,
																					repeat: Infinity,
																					repeatType:
																						"reverse",
																				}}
																			>
																				{
																					option.icon
																				}
																			</motion.span>

																			<span
																				className={`text-xs sm:text-sm font-medium ${
																					selectedFormat ===
																					option.format
																						? "text-blue-600 dark:text-blue-400"
																						: "text-gray-600 dark:text-gray-300"
																				}`}
																			>
																				{
																					option.label
																				}
																			</span>

																			{/* Hover effect */}
																			<motion.div
																				className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
																				initial={{
																					opacity: 0,
																				}}
																				whileHover={{
																					opacity: 1,
																				}}
																			/>
																		</motion.button>
																	)
																)}
															</div>
														</div>

														{/* Close button */}
														<motion.button
															onClick={() =>
																setShowFormatSelector(
																	false
																)
															}
															className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center justify-center gap-1"
															whileHover={{
																scale: 1.02,
															}}
															whileTap={{
																scale: 0.98,
															}}
														>
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
															>
																<line
																	x1="18"
																	y1="6"
																	x2="6"
																	y2="18"
																></line>
																<line
																	x1="6"
																	y1="6"
																	x2="18"
																	y2="18"
																></line>
															</svg>
															Close
														</motion.button>
													</div>

													{/* Floating arrow pointer */}
													<motion.div
														className="absolute top-full left-1/2 w-4 h-4 bg-white dark:bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-gray-200 dark:border-gray-700 shadow-sm"
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{
															delay: 0.2,
															type: "spring",
														}}
													/>
												</motion.div>
											)}
										</AnimatePresence>

										{/* Main download button */}
										<motion.button
											onClick={() => {
												if (isDownloading) return;
												setShowFormatSelector(
													!showFormatSelector
												);
											}}
											disabled={isDownloading}
											className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-full font-medium shadow-md relative overflow-hidden ${
												isDownloading
													? "bg-blue-500/90 dark:bg-blue-600/90 text-white"
													: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white hover:shadow-lg"
											}`}
											whileHover={
												!isDownloading
													? { scale: 1.02 }
													: {}
											}
											whileTap={
												!isDownloading
													? { scale: 0.98 }
													: {}
											}
										>
											{isDownloading ? (
												<div className="flex items-center justify-center gap-2">
													<motion.div
														className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
														animate={{
															rotate: 360,
														}}
														transition={{
															duration: 0.8,
															repeat: Infinity,
															ease: "linear",
														}}
													/>
													Downloading...
												</div>
											) : (
												<>
													<span className="relative z-10 flex items-center justify-center gap-2">
														{showFormatSelector
															? "Choose Format"
															: "Download Certificate"}
														<motion.span
															animate={{
																rotate: showFormatSelector
																	? 180
																	: 0,
															}}
															transition={{
																type: "spring",
																stiffness: 500,
																damping: 15,
															}}
														>
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
															>
																<polyline points="6 9 12 15 18 9"></polyline>
															</svg>
														</motion.span>
													</span>

													{/* Button hover effect */}
													<motion.div
														className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300"
														initial={{ opacity: 0 }}
														whileHover={{
															opacity: 1,
														}}
													/>

													{/* Subtle shimmer effect */}
													<motion.div
														className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
														animate={{ x: "100%" }}
														transition={{
															duration: 1.5,
															repeat: Infinity,
															ease: "linear",
														}}
													/>
												</>
											)}
										</motion.button>
									</motion.div>
								</div>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</section>
	);
}
