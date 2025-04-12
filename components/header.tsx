"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLinkClick = (linkName: any) => {
		setActiveSection(linkName);
		setTimeOfLastClick(Date.now());
		setIsMenuOpen(false);
	};

	const menuStyles =
		"backdrop-blur-lg border border-white/20 dark:border-white/10 bg-white/60 dark:bg-[#0f0f0f]/70 shadow-lg dark:shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-colors duration-300";

	return (
		<header className="z-[999] fixed top-4 left-1/2 -translate-x-1/2 w-full flex justify-center items-center px-4 pointer-events-none">
			<motion.div
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className={`pointer-events-auto w-full max-w-6xl px-4 py-2 rounded-3xl ${menuStyles}`}
			>
				<nav className="w-full flex justify-between items-center">
					{/* Logo: Profile photo + Name */}

					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="flex items-center gap-2 md:hidden"
					>
						<div className="w-10 h-10 rounded-full overflow-hidden shadow-md shadow-cyan-500/30 dark:shadow-cyan-400/30 border border-white/30 dark:border-white/10 hover:scale-105 transition-transform duration-300">
							<Image
								src="/profile_photo.jpeg"
								alt="Amol Rathod"
								width={40}
								height={40}
								className="w-full h-full object-cover rounded-full"
								priority
							/>
						</div>
						<span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-cyan-300 dark:to-blue-500 bg-clip-text text-transparent tracking-wide animate-pulse drop-shadow-sm">
							Amol Rathod
						</span>
					</motion.div>

					{/* Desktop Nav */}
					<ul className="hidden sm:flex flex-wrap justify-center items-center mx-auto gap-x-3 py-1 text-sm font-medium w-fit">
						{links.map((link, index) => (
							<motion.li
								key={link.hash}
								initial={{ y: -10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.04 * index }}
								className="relative"
							>
								<Link
									href={link.hash}
									onClick={() => handleLinkClick(link.name)}
									className={clsx(
										"group relative px-3 py-2 rounded-full transition-all duration-300 isolate overflow-hidden text-xs sm:text-[0.8rem]",
										activeSection === link.name
											? "text-white font-medium"
											: "text-black/80 dark:text-white/70 hover:text-black dark:hover:text-white"
									)}
								>
									<span className="relative z-10 whitespace-nowrap">
										{link.name}
									</span>

									{/* Active pill background */}
									{activeSection === link.name && (
										<motion.span
											layoutId="activeSection"
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 30,
											}}
											className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-cyan-400 dark:to-blue-600 shadow-[0_0_5px_1px_rgba(0,191,255,0.2)] dark:shadow-[0_0_5px_1px_rgba(0,191,255,0.1)]"
										/>
									)}

									{/* Hover Glow */}
									<span className="absolute inset-0 z-[-1] rounded-full blur-md scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-400/20 dark:bg-white/10" />
								</Link>
							</motion.li>
						))}
					</ul>

					{/* Hamburger */}
					<div className="sm:hidden ml-auto">
						<motion.button
							onClick={() => setIsMenuOpen((prev) => !prev)}
							whileTap={{ scale: 0.9, rotate: 15 }}
							className="text-black dark:text-white transition duration-300 hover:scale-110"
						>
							{isMenuOpen ? <X size={26} /> : <Menu size={26} />}
						</motion.button>
					</div>
				</nav>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMenuOpen && (
						<motion.ul
							initial={{ opacity: 0, scale: 0.95, y: -20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -10 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className={`sm:hidden mt-4 flex flex-col items-center gap-2 text-sm font-medium p-4 rounded-2xl ${menuStyles}`}
						>
							{links.map((link, index) => (
								<motion.li
									key={link.hash}
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.05 * index }}
									className="w-full text-center relative"
								>
									<Link
										href={link.hash}
										onClick={() =>
											handleLinkClick(link.name)
										}
										className={clsx(
											"group block px-4 py-2 rounded-full transition-all duration-300 isolate overflow-hidden",
											activeSection === link.name
												? "text-white font-semibold"
												: "text-black/80 dark:text-white/70 hover:text-black dark:hover:text-white"
										)}
									>
										<span className="relative z-10">
											{link.name}
										</span>

										{/* Active pill in mobile */}
										{activeSection === link.name && (
											<motion.span
												layoutId="activeSection"
												transition={{
													type: "spring",
													stiffness: 500,
													damping: 30,
												}}
												className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-cyan-400 dark:to-blue-600 shadow-[0_0_5px_1px_rgba(0,191,255,0.2)] dark:shadow-[0_0_5px_1px_rgba(0,191,255,0.1)]"
											/>
										)}

										{/* Hover Glow */}
										<span className="absolute inset-0 z-[-1] rounded-full blur-md scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-400/20 dark:bg-white/10" />
									</Link>
								</motion.li>
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</motion.div>
		</header>
	);
}
