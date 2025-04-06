"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
	const { ref } = useSectionInView("Contact");

	return (
		<motion.section
			id="contact"
			ref={ref}
			className="relative mb-20 sm:mb-28 w-[min(100%,38rem)] text-center mx-auto px-4 py-16 rounded-2xl overflow-hidden "
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			viewport={{ once: true }}
		>
			{/* 🔮 Background Glow */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] animate-gradient-x bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100 via-blue-200 to-white dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#111827] blur-[120px] opacity-20"></div>
				<div className="absolute w-72 h-72 bg-purple-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
				<div
					className="absolute w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
					style={{ top: "30%", left: "60%" }}
				></div>
			</div>

			<SectionHeading>Contact me</SectionHeading>

			<p className="text-gray-700 dark:text-white/80 -mt-6 mb-6">
				Please contact me directly at{" "}
				<a
					className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					href="mailto:amol1629rathod@gmail.com"
				>
					amol1629rathod@gmail.com
				</a>{" "}
				or through this form.
			</p>

			<form
				className="mt-6 flex flex-col gap-4 text-left dark:text-black"
				action={async (formData) => {
					const { data, error } = await sendEmail(formData);
					if (error) {
						toast.error(error);
						return;
					}
					toast.success("Email sent successfully!");
				}}
			>
				<input
					className="h-14 px-4 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
					name="senderEmail"
					type="email"
					required
					maxLength={500}
					placeholder="Your email"
				/>
				<textarea
					className="h-52 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
					name="message"
					placeholder="Your message"
					required
					maxLength={5000}
				/>
				<div className="mx-auto">
					<SubmitBtn />
				</div>
			</form>
		</motion.section>
	);
}
