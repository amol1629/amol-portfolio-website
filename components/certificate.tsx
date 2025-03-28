"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";
import Image from "next/image";

const certificatesData = [
	{
		name: "React Training for JavaScript Beginners",
		link: "https://www.udemy.com/certificate/UC-f723eddd-ebea-4938-862d-8f591463c217/",
		image: "/images/react-training.jpg",
	},
	{
		name: "The Next.js 13 Bootcamp - The Complete Developer Guide",
		link: "https://www.udemy.com/certificate/UC-3852aed2-4bd1-4992-b4f3-a8832b681815/",
		image: "/images/nextjs-bootcamp.jpg",
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

export default function Certificates() {
	const { ref } = useSectionInView("Certificates");

	return (
		<section
			id="certificates"
			ref={ref}
			className="mb-28 max-w-4xl mx-auto px-6 scroll-mt-28 text-center sm:mb-40 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg p-6"
		>
			<SectionHeading>My Certificates</SectionHeading>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
				{certificatesData.map((certificate, index) => (
					<motion.div
						key={index}
						whileHover={{ scale: 1.05 }}
						className="relative p-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg border border-transparent transition-all duration-300 ease-in-out group"
					>
						{/* Hover Effect: Left Border */}
						<div className="absolute inset-0 rounded-2xl transition-all duration-300 ease-in-out bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800 group-hover:shadow-lg border-l-4 border-transparent group-hover:border-gray-700 dark:group-hover:border-gray-300"></div>

						<div className="relative z-10">
							<Image
								src={certificate.image}
								alt={certificate.name}
								width={400}
								height={250}
								className="w-full h-40 object-cover rounded-lg shadow-sm mb-4"
							/>
							<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
								{certificate.name}
							</h3>
							<Link
								href={certificate.link}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block mt-2 px-6 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition"
							>
								View Certificate
							</Link>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
