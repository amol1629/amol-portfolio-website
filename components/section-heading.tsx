import React from "react";

type SectionHeadingProps = {
	children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
	return (
		// <h2 className="text-3xl font-medium capitalize mb-8 text-center">
		//   {children}
		// </h2>

		<h3 className="text-3xl md:text-4xl lg:text-5xl font-bold  capitalize mb-8 text-center sm:text-2xl  relative">
			<span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-500 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400">
				{children}
			</span>
		</h3>
	);
}
