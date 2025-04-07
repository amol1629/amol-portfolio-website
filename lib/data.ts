import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import hotelManagementProjectImage from "@/public/hotelManagementProject.png";
import pentkartImg from "@/public/pentKartProject.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
	{
		name: "Home",
		hash: "#home",
	},
	{
		name: "About",
		hash: "#about",
	},
	{
		name: "Projects",
		hash: "#projects",
	},
	{
		name: "Skills",
		hash: "#skills",
	},
	{
		name: "Certificates",
		hash: "#certificates",
	},
	{
		name: "Experience",
		hash: "#experience",
	},

	{
		name: "Contact",
		hash: "#contact",
	},
] as const;

export const experiencesData = [
	{
		title: "Bachelors in Computer Science",
		location:
			"Rajiv Gandhi Computer Science College (Chhatrapati Sambhajinagar)",
		description: "July 2018 - May 2021",
		icon: React.createElement(LuGraduationCap),
		date: "2018 - 2021",
	},
	{
		title: "Masters in Computer Science",
		location: "Dr. D. Y. Patil A.C.S College (Pune)",
		description: "Aug 2021 - April 2023",
		icon: React.createElement(LuGraduationCap),
		date: "2021 - 2023",
	},

	{
		title: "Intern",
		location: "Harbinger System Pvt. Ltd | Baner, Pune",
		description:
			"Completed an internship from Jan 2024 to June 2024, gaining hands-on experience in software development.",
		icon: React.createElement(CgWorkAlt),
		date: "Jan 2023 - June 2023",
	},

	{
		title: "Software Engineer",
		location: "Harbinger System Pvt. Ltd | Baner, Pune",
		description:
			"Developed scalable and maintainable code, focusing on user-centric UIs using React, Next.js, Tailwind CSS, ShadCN, and other UI libraries.\n" +
			"Key contributor to major client projects, enhancing project efficiency by 30%, stability by 25%, and overall performance by 20%.\n" +
			"Collaborated in Agile environments, participating in daily standups, sprint planning, and retrospectives to ensure timely delivery of project milestones.\n" +
			"Worked on several internal products, emphasising clean code practices and optimising performance.\n" +
			"Applied industry best practices including SOLID principles, DRY, KISS, and YAGNI, leading to a 35% reduction in code redundancy and a 40% increase in maintainability.\n" +
			"Earned multiple 'SuperStar of the Month' and 'Technical Star' awards, and won 'Design Summit' and 'Hackathon' competitions.",
		icon: React.createElement(CgWorkAlt),
		date: "Jan 2023 - Oct 2024",
	},
] as const;

export const projectsData = [
	{
		title: "PentKart",
		description:
			"A full-stack e-commerce platform designed for seamless shopping experiences. Features include product discovery, intuitive cart management, secure checkout, and order tracking.",
		tags: ["React", "Node.js", "Express", "MongoDB", "Redux"],
		imageUrl: pentkartImg,
		githubUrl:
			"https://github.com/amol1629/pentKART/tree/master/arpentagon-ecommerce",
	},
	{
		title: "True Feedback",
		description:
			"An AI-powered anonymous feedback platform with intelligent suggestions. Supports secure email & OTP login for an effortless user experience.",
		tags: ["Next.js", "MongoDB", "ShadCN", "Tailwind CSS", "ChatGPT API"],
		imageUrl: hotelManagementProjectImage,
		githubUrl: "",
	},
	{
		title: "Hotel Management System",
		description:
			"A modern hotel booking system with seamless room search, booking management, and secure payments via Stripe. Users can authenticate using Google, GitHub, or email/password.",
		tags: ["Next.js", "React", "Sanity", "Tailwind", "Stripe"],
		imageUrl: hotelManagementProjectImage,
		githubUrl: "https://github.com/amol1629/hotel-management",
	},
];

export const skillsData = [
	"HTML",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Redux",
	"Next.js",
	"Node.js",
	"Git",
	"Tailwind",
	"Bootstrap",
	"ShadCn",

	"MongoDB",

	"Solid Principles",
] as const;
