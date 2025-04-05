"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
	const { ref } = useSectionInView("About");

	return (
		<motion.section
			ref={ref}
			className="my-28 max-w-[45rem] text-center leading-8 sm:mb-32 scroll-mt-28"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.175 }}
			id="about"
		>
			<SectionHeading>About me</SectionHeading>
			<p className="mb-3">
				Seeking a{" "}
				<span className="font-medium">Front-End Developer</span>{" "}
				position in the IT industry, leveraging
				expertise in{" "}
				<span className="font-medium">
					JavaScript, React, and Next.js
				</span>{" "}
				to build scalable and high-performance web applications. Proven
				ability to craft{" "}
				<span className="font-medium">
					intuitive and user-centric UIs
				</span>{" "}
				using Tailwind CSS and ShadCN, ensuring clean code and adherence
				to best practices like{" "}
				<span className="font-medium">SOLID, DRY, and KISS</span>. Eager
				to contribute to a dynamic team and deliver impactful solutions
				that drive growth and success.
			</p>

			<p className="mb-3">
				After graduating with a degree in{" "}
				<span className="font-medium">Computer Science</span>, I
				developed a passion for building seamless user experiences. My
				core stack includes{" "}
				<span className="font-medium">
					React, Next.js, Node.js, and MongoDB
				</span>
				. I am also familiar with TypeScript, Vue.js, and Redux. I
				thrive in Agile environments, collaborating with teams to
				deliver optimized and maintainable code.
			</p>

			<p className="mb-3">
				<span className="italic">When I'm not coding</span>, I enjoy
				reading books, watching documentaries, and exploring new
				technologies. I also have a keen interest in{" "}
				<span className="font-medium">history and philosophy</span> and
				am currently learning how to play the guitar.
			</p>
		</motion.section>
	);
}
