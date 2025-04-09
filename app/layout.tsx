"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import BubbleBackground from "@/components/bubble-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Amol | Personal Portfolio",
	description:
		"Amol is a front-end developer with almost 2 years of experience.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="!scroll-smooth">
			<body
				className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
			>
				{/* Floating Bubbles Background */}
				<BubbleBackground />

				<ThemeContextProvider>
					<ActiveSectionContextProvider>
						<Header />
						<main className="relative z-10">{children}</main>
						<Footer />

						<Toaster position="top-right" />
						<ThemeSwitch />
					</ActiveSectionContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
