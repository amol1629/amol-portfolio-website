import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { motion } from "framer-motion";

export default function SubmitBtn() {
	const { pending } = useFormStatus();

	return (
		<motion.button
			type="submit"
			className="group relative flex items-center justify-center gap-2 h-[3.5rem] w-[10rem] rounded-full overflow-hidden transition-all"
			disabled={pending}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0.9 }}
			animate={{ opacity: 1 }}
		>
			{/* Animated background gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-700 dark:to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />

			{/* Pulsing glow effect (hidden when disabled) */}
			{!pending && (
				<motion.div
					className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
					animate={{
						opacity: [0, 0.4, 0],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 2.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			)}

			{/* Content container */}
			<div className="relative z-10 flex items-center justify-center gap-2">
				{pending ? (
					<motion.div
						className="h-6 w-6 rounded-full border-2 border-white border-t-transparent"
						animate={{ rotate: 360 }}
						transition={{
							duration: 1,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
				) : (
					<>
						<motion.span
							className="font-medium text-white tracking-wider"
							initial={{ x: 0 }}
							animate={{ x: [0, 2, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							Submit
						</motion.span>
						<motion.div
							initial={{ x: 0, y: 0 }}
							whileHover={{
								x: 3,
								y: -3,
								transition: { type: "spring", stiffness: 500 },
							}}
						>
							<FaPaperPlane className="text-xs opacity-90 transition-all" />
						</motion.div>
					</>
				)}
			</div>

			{/* Futuristic border animation */}
			<div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-cyan-300/30 transition-all duration-500 pointer-events-none" />

			{/* Disabled state overlay */}
			{pending && (
				<div className="absolute inset-0 bg-black/20 rounded-full backdrop-blur-[1px]" />
			)}
		</motion.button>
	);
}
