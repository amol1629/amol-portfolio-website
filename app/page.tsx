import About from "@/components/about";
import Certificates from "@/components/certificate";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
	return (
		<main className="flex flex-col items-center px-4">
			<div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[200rem] w-[80rem] rounded-full blur-[15rem] sm:w-[100rem] dark:bg-[#946263]"></div>
			<div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-50rem] h-[200rem] w-[100rem] rounded-full blur-[15rem] sm:w-[120rem] md:left-[-45rem] lg:left-[-40rem] xl:left-[-25rem] 2xl:left-[-10rem] dark:bg-[#676394]"></div>
			<Intro />
			{/* <SectionDivider /> */}
			<About />
			<Projects />
			<Skills />
			<Certificates />
			<Experience />
			<Contact />
		</main>
	);
}
