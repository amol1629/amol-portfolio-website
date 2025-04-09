"use client";

import { motion } from "framer-motion";
import React from "react";

const bubbles = new Array(20).fill(null).map((_, i) => ({
	id: i,
	size: Math.random() * 80 + 40,
	top: `${Math.random() * 100}%`,
	left: `${Math.random() * 100}%`,
	delay: Math.random() * 5,
	duration: Math.random() * 20 + 10,
}));

export default function BubbleBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			{bubbles.map((bubble) => (
				<motion.div
					key={bubble.id}
					initial={{ y: 0, opacity: 0.3 }}
					animate={{ y: -2000, opacity: 0 }}
					transition={{
						repeat: Infinity,
						repeatType: "loop",
						duration: bubble.duration,
						delay: bubble.delay,
					}}
					style={{
						width: bubble.size,
						height: bubble.size,
						top: bubble.top,
						left: bubble.left,
					}}
					className="absolute rounded-full bg-blue-300/30 dark:bg-cyan-400/10 blur-2xl pointer-events-none"
				/>
			))}
		</div>
	);
}
