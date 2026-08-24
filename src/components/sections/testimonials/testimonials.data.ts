import type { GlassAccent } from "@/components/shared";

export const TESTIMONIALS_HEADING = {
  label: "Testimonials",
  title: "Trusted by engineering leaders",
  description: "Feedback from teams I've partnered with to solve complex technical challenges.",
} as const;

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  rating: number;
  highlight?: string;
  accent: GlassAccent;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    content:
      "Amol's ability to understand complex business requirements and translate them into clean, maintainable code is exceptional. He transformed our legacy dashboard into a modern React application.",
    author: "Tushar",
    role: "Software Engineer",
    company: "Global IT Services",
    rating: 5,
    highlight: "Legacy Modernization",
    accent: "cyan",
  },
  {
    id: "2",
    content:
      "Working with Amol on our mobile app's web counterpart was seamless. His attention to detail and commitment to pixel-perfect implementations made collaboration effortless.",
    author: "Aishwarya",
    role: "Package App Developer",
    company: "Global Consulting Firm",
    rating: 5,
    highlight: "Cross-Platform",
    accent: "purple",
  },
  {
    id: "3",
    content:
      "Amol architected our entire frontend system from scratch. His decisions around state management, component architecture, and performance optimization were spot on.",
    author: "Nick",
    role: "Tech Architect",
    company: "E-commerce Platform",
    rating: 5,
    highlight: "Architecture",
    accent: "emerald",
  },
  {
    id: "4",
    content:
      "Amol's expertise in React and TypeScript helped us build a component library that's now used across 5 product teams. His documentation is exceptional.",
    author: "Karan",
    role: "Senior Software Developer",
    company: "FinTech Solutions",
    rating: 5,
    highlight: "Component Systems",
    accent: "amber",
  },
  {
    id: "5",
    content:
      "He took our chaotic frontend codebase and turned it into something our team is proud of. The migration to Next.js was seamless thanks to his thorough planning.",
    author: "Mahadev",
    role: "Senior Software Engineer",
    company: "Product Company",
    rating: 5,
    highlight: "Code Quality",
    accent: "cyan",
  },
  {
    id: "6",
    content:
      "Amol mentored our junior developers while delivering critical features on tight deadlines. His technical leadership elevated the entire team's capabilities.",
    author: "Sagar",
    role: "Tech Lead",
    company: "Service Based Company",
    rating: 5,
    highlight: "Team Leadership",
    accent: "purple",
  },
  {
    id: "7",
    content:
      "His deep understanding of frontend performance optimization helped us achieve sub-second load times. Our Core Web Vitals improved dramatically.",
    author: "Dave",
    role: "Tech Lead",
    company: "Product Company",
    rating: 5,
    highlight: "Performance",
    accent: "emerald",
  },
  {
    id: "8",
    content:
      "Amol bridges the gap between design and engineering perfectly. He understands user experience and translates it into functional, beautiful interfaces.",
    author: "John",
    role: "Product Manager",
    company: "Service Based Company",
    rating: 5,
    highlight: "UX Engineering",
    accent: "amber",
  },
  {
    id: "9",
    content:
      "The reusable patterns Amol established are still the foundation of our frontend architecture. His code is clean, well-tested, and easy to maintain.",
    author: "Richard",
    role: "Principal Engineer",
    company: "Product Company",
    rating: 5,
    highlight: "Best Practices",
    accent: "cyan",
  },
  {
    id: "10",
    content:
      "Amol delivered exactly what we needed—a scalable, accessible frontend that our customers love. His commitment to quality is unmatched.",
    author: "Edward",
    role: "Engineering Director",
    company: "Enterprise Solutions",
    rating: 5,
    highlight: "Delivery Excellence",
    accent: "purple",
  },
];
