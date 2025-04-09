"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";

// Icons
import {
	MdTravelExplore,
	MdLibraryBooks,
	MdSportsEsports,
	MdBrush,
	MdHeadset,
} from "react-icons/md";
import { FaHiking, FaFilm, FaBicycle } from "react-icons/fa";
import { GiGuitar, GiCook, GiMeditation } from "react-icons/gi";
import { BsMusicNoteBeamed } from "react-icons/bs";

const hobbies = [
	{
		name: "Reading",
		icon: <MdLibraryBooks className="text-indigo-400" />,
		description:
			"Exploring thought-provoking, motivational, and spiritual reads",
	},
	{
		name: "Meditation",
		icon: <GiMeditation className="text-blue-300" />,
		description: "Staying mindful and mentally fresh",
	},
	{
		name: "Traveling",
		icon: <MdTravelExplore className="text-teal-400" />,
		description: "Exploring new places and cultures",
	},

	// {
	// 	name: "Gaming",
	// 	icon: <MdSportsEsports className="text-pink-500" />,
	// 	description: "Competitive and story-based video games",
	// },
	{
		name: "Music",
		icon: <BsMusicNoteBeamed className="text-yellow-400" />,
		description: "Listening to lo-fi, classical, and synthwave",
	},
	// {
	// 	name: "Art & Drawing",
	// 	icon: <MdBrush className="text-purple-500" />,
	// 	description: "Sketching futuristic concepts and designs",
	// },

	// {
	// 	name: "Hiking",
	// 	icon: <FaHiking className="text-green-500" />,
	// 	description: "Spending time in nature and trails",
	// },
	// {
	// 	name: "Cycling",
	// 	icon: <FaBicycle className="text-rose-400" />,
	// 	description: "Morning rides and adventures",
	// },
	// {
	// 	name: "Cooking",
	// 	icon: <GiCook className="text-orange-500" />,
	// 	description: "Experimenting with new recipes",
	// },
	// {
	// 	name: "Playing Guitar",
	// 	icon: <GiGuitar className="text-red-400" />,
	// 	description: "Acoustic tunes and calming melodies",
	// },
	{
		name: "Watching Movies",
		icon: <FaFilm className="text-sky-400" />,
		description: "Sci-fi, thrillers, and documentaries",
	},
];

const fadeIn = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const hobbyItem = {
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

export default function Hobbies() {
	const { ref } = useSectionInView("Hobbies", 0.3);
	const { theme } = useTheme();

	return (
		<section
			id="hobbies"
			ref={ref}
			className="relative mb-28 sm:mb-40 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28 text-center overflow-hidden py-20 rounded-2xl"
		>
			{/* 🎨 Futuristic Animated Background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] animate-gradient-x bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100 via-sky-200 to-white dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#111827] blur-[120px] opacity-20 "></div>
				<div className="absolute w-72 h-72 bg-pink-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
				<div
					className="absolute w-72 h-72 bg-sky-300 dark:bg-sky-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
					style={{ top: "35%", left: "60%" }}
				></div>
			</div>

			{/* Animated blobs */}
			<motion.div
				animate={{
					x: [0, 30, -20, 10, 0],
					y: [0, -30, 20, -10, 0],
					scale: [1, 1.1, 0.9, 1.05, 1],
				}}
				transition={{
					duration: 20,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute -top-20 -left-20 w-96 h-96 
                        bg-indigo-300/20 dark:bg-indigo-900/20 
                        rounded-full mix-blend-multiply filter blur-3xl opacity-30"
			/>

			<motion.div
				animate={{
					x: [0, -30, 20, -10, 0],
					y: [0, 20, -30, 10, 0],
					scale: [1, 0.9, 1.1, 0.95, 1],
				}}
				transition={{
					duration: 25,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute top-1/3 right-0 w-80 h-80 
                        bg-sky-300/20 dark:bg-sky-800/20 
                        rounded-full mix-blend-multiply filter blur-3xl opacity-30"
			/>

			<motion.div
				animate={{
					x: [0, 20, -10, 30, 0],
					y: [0, 10, -20, 30, 0],
					scale: [1, 1.05, 0.95, 1.1, 1],
				}}
				transition={{
					duration: 18,
					ease: "easeInOut",
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute bottom-0 left-1/3 w-72 h-72 
                        bg-purple-300/20 dark:bg-purple-800/20 
                        rounded-full mix-blend-multiply filter blur-3xl opacity-30"
			/>

			{/* Decorative geometric shapes */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 0.6, scale: 1 }}
				transition={{ delay: 0.2, duration: 1.5 }}
				className="absolute -top-10 right-10 sm:right-20 w-8 h-8 border-2 border-indigo-300/30 dark:border-indigo-700/50 rotate-12"
			/>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 0.6, scale: 1 }}
				transition={{ delay: 0.3, duration: 1.5 }}
				className="absolute top-20 left-10 sm:left-40 w-6 h-6 rounded-full border-2 border-purple-300/30 dark:border-purple-700/50"
			/>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 0.6, scale: 1 }}
				transition={{ delay: 0.4, duration: 1.5 }}
				className="absolute top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-md border-2 border-blue-300/30 dark:border-blue-700/50 -rotate-12"
			/>

			<motion.div
				variants={fadeIn}
				initial="initial"
				whileInView="animate"
				viewport={{ once: true }}
			>
				<SectionHeading>My Hobbies</SectionHeading>
			</motion.div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left mt-10">
				{hobbies.map((hobby, index) => (
					<motion.div
						key={index}
						variants={hobbyItem}
						initial="initial"
						whileInView="animate"
						whileHover="whileHover"
						viewport={{ once: true }}
						className="relative group overflow-hidden rounded-2xl p-6 border border-white/10 shadow-xl bg-white/10 dark:bg-[#0e101a]/60 transition-all duration-300 ease-in-out cursor-default"
					>
						{/* 💫 Glow on Hover */}
						<div className="absolute inset-0 -z-10 pointer-events-none">
							<div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 dark:from-[#3b7ea1] dark:via-[#5e4b8b] dark:to-[#20435c]" />
						</div>

						<div className="relative z-10">
							<h4 className="text-lg font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100">
								{hobby.icon} {hobby.name}
							</h4>
							<p className="text-sm text-gray-700 dark:text-gray-300 opacity-80">
								{hobby.description}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* Enhanced decorative floating elements with animations */}
			<motion.div
				animate={{
					y: [0, 15, 0],
					opacity: [0.5, 0.8, 0.5],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute top-20 right-20 w-8 h-8 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10"
			/>

			<motion.div
				animate={{
					y: [0, -15, 0],
					opacity: [0.5, 0.8, 0.5],
				}}
				transition={{
					duration: 5,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 1,
				}}
				className="absolute bottom-20 left-20 w-6 h-6 rounded-full bg-purple-500/10 dark:bg-purple-400/10"
			/>

			<motion.div
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.4, 0.7, 0.4],
				}}
				transition={{
					duration: 6,
					repeat: Infinity,
					repeatType: "reverse",
					delay: 2,
				}}
				className="absolute top-1/3 left-1/4 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-400/10"
			/>
		</section>
	);
}
