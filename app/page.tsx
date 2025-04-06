import About from "@/components/about";
import Certificates from "@/components/certificate";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
	return (
		<main className="flex flex-col items-center px-4 overflow-x-hidden relative min-h-screen">
			{/* Modern Futuristic Animated Background */}
			<div className="fixed inset-0 -z-10 overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full">
					{/* Layer 1 */}
					<div className="absolute w-[60vw] h-[60vw] top-[-20%] left-[-10%] bg-gradient-to-tr from-cyan-300 via-blue-400 to-indigo-500 dark:from-indigo-800 dark:via-purple-800 dark:to-cyan-900 rounded-full filter blur-3xl opacity-30 dark:opacity-25 animate-blob"></div>

					{/* Layer 2 */}
					<div className="absolute w-[50vw] h-[50vw] bottom-[-10%] right-[-10%] bg-gradient-to-br from-teal-300 via-sky-400 to-blue-500 dark:from-blue-900 dark:via-sky-800 dark:to-teal-700 rounded-full filter blur-2xl opacity-25 dark:opacity-20 animate-blob animation-delay-4000"></div>

					{/* Subtle Overlay for both modes */}
					<div className="absolute inset-0 bg-white/40 dark:bg-black/30 backdrop-blur-sm"></div>
				</div>
			</div>

			{/* Your sections */}
			<Intro />
			<About />
			<Projects />
			<Skills />
			<Certificates />
			<Experience />
			<Contact />
		</main>
	);
}
