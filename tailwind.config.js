/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				"gradient-x": "gradientX 18s ease-in-out infinite",
				"gradient-float": "gradientFloat 24s ease-in-out infinite",
				blob: "blob 30s cubic-bezier(0.65, 0, 0.35, 1) infinite",
			},
			keyframes: {
				gradientX: {
					"0%, 100%": { transform: "translateX(0%)" },
					"50%": { transform: "translateX(30%)" },
				},
				gradientFloat: {
					"0%, 100%": { transform: "translate(0px, 0px)" },
					"25%": { transform: "translate(10px, -10px)" },
					"50%": { transform: "translate(20px, 10px)" },
					"75%": { transform: "translate(-10px, 20px)" },
				},
				blob: {
					"0%": {
						transform: "translate(0px, 0px) scale(1)",
						borderRadius: "50% 50% 50% 50%",
					},
					"25%": {
						transform: "translate(30px, -40px) scale(1.05)",
						borderRadius: "45% 55% 55% 45%",
					},
					"50%": {
						transform: "translate(-20px, 20px) scale(0.95)",
						borderRadius: "55% 45% 45% 55%",
					},
					"75%": {
						transform: "translate(-15px, -25px) scale(1.1)",
						borderRadius: "50% 60% 40% 50%",
					},
					"100%": {
						transform: "translate(0px, 0px) scale(1)",
						borderRadius: "50% 50% 50% 50%",
					},
				},
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
