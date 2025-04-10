"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();

	return (
		<header className="navbar z-[999] fixed top-3 left-1/2 -translate-x-1/2 w-full flex justify-center items-center px-4 pointer-events-none">
			<motion.div
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="pointer-events-auto w-full max-w-6xl px-4 py-2 rounded-3xl 
          backdrop-blur-lg border border-white/20 dark:border-white/10 
          bg-white/60 dark:bg-[#0f0f0f]/70
          shadow-lg dark:shadow-[0_0_25px_rgba(0,0,0,0.4)]
          transition-colors duration-300"
			>
				<nav className="w-full">
					<ul className="flex flex-wrap justify-center items-center mx-auto gap-x-1 gap-y-1 sm:gap-x-3 py-1 text-sm font-medium w-fit">
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
									onClick={() => {
										setActiveSection(link.name);
										setTimeOfLastClick(Date.now());
									}}
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

									{/* Glow hover effect */}
									<span
										className="absolute inset-0 z-[-1] rounded-full blur-md scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300
                    bg-blue-400/20 dark:bg-white/10"
									/>
								</Link>
							</motion.li>
						))}
					</ul>
				</nav>
			</motion.div>
		</header>
	);
}
