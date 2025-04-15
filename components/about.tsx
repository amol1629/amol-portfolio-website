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
				Hi, I'm <span className="font-extrabold">Amol Rathod</span> — a
				passionate{" "}
				<span className="font-bold">Front-End Developer</span> based
				in Pune, Maharashtra. I specialize in crafting seamless,
				scalable, and performance-driven web experiences using modern
				technologies like{" "}
				<span className="font-bold">
					JavaScript, React, Next.js, Tailwind CSS
				</span>
				, and <span className="font-bold">ShadCN</span>.
			</p>

			<p className="mb-3">
				With almost{" "}
				<span className="font-bold underline">
					2 years of professional experience
				</span>
				, I’ve contributed to high-impact client projects, improving
				performance, stability, and maintainability. I follow clean code
				principles such as{" "}
				<span className="font-bold">SOLID, DRY, and KISS</span> to
				ensure efficient and elegant solutions that scale well.
			</p>

			<p className="mb-3">
				Whether it's an{" "}
				<span className="font-bold">e-commerce platform</span> like{" "}
				<em>PentKart</em> or an{" "}
				<span className="font-bold">AI-enhanced feedback tool </span>
				like <em>True Feedback</em>, I love solving real-world problems
				with thoughtful UI design and modern development practices. My
				core stack also includes{" "}
				<span className="font-bold">Node.js and MongoDB</span>, and
				I'm familiar with{" "}
				<span className="font-bold">
					TypeScript, Vue.js, and Redux
				</span>
				.
			</p>

			<p className="mb-3">
				When I'm not coding, I enjoy{" "}
				<span className="font-bold">reading books</span>, watching
				documentaries, and diving into{" "}
				<span className="font-bold">history and philosophy</span>. I'm
				 always exploring
				new technologies to stay ahead in this ever-evolving field.
			</p>
		</motion.section>
	);
}
