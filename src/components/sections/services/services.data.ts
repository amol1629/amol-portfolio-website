import type { GlassAccent } from "@/components/shared";

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  iconKey: string;
  accent: GlassAccent;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "legacy-migration",
    title: "Legacy Code Rescue",
    description:
      "Old .NET or jQuery frontends with 8+ second load times? I've migrated entire platforms to React with zero downtime and systematic milestones.",
    outcomes: [
      "60% faster load times",
      "Zero-downtime migrations",
      "Modern React + TypeScript",
    ],
    iconKey: "arrowRightLeft",
    accent: "amber",
  },
  {
    id: "design-systems",
    title: "Design Systems & Component Libraries",
    description:
      "Teams rebuilding the same UI? I build component libraries with Storybook documentation that cut dev time by 45% and get adopted across teams.",
    outcomes: [
      "45% faster development",
      "100% design consistency",
      "Reusable across teams",
    ],
    iconKey: "layers",
    accent: "purple",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description:
      "Achieve sub-second load times and smooth 60fps interactions. I audit, diagnose, and fix performance bottlenecks across the entire frontend stack.",
    outcomes: [
      "90+ Lighthouse scores",
      "40% faster page loads",
      "Improved Core Web Vitals",
    ],
    iconKey: "zap",
    accent: "emerald",
  },
  {
    id: "team-enablement",
    title: "Team Mentorship & Standards",
    description:
      "Junior teams need direction. I mentor devs, run code reviews that teach, and establish coding standards that stick — so your team ships 2x faster.",
    outcomes: [
      "95% code consistency",
      "50% faster onboarding",
      "Self-sufficient teams",
    ],
    iconKey: "users",
    accent: "cyan",
  },
  {
    id: "architecture",
    title: "Frontend Architecture",
    description:
      "Design scalable, maintainable frontend architectures that grow with your business. From folder structure to state management, I set the foundation right.",
    outcomes: [
      "Scalable codebase",
      "Clear patterns to follow",
      "Future-proof decisions",
    ],
    iconKey: "layoutGrid",
    accent: "cyan",
  },
  {
    id: "development",
    title: "Full-Stack Development",
    description:
      "End-to-end development of web applications with React, Next.js, and Node.js. From MVP to enterprise scale, delivering production-ready solutions.",
    outcomes: [
      "Production-ready code",
      "Comprehensive testing",
      "CI/CD pipelines",
    ],
    iconKey: "code",
    accent: "purple",
  },
];

export const SERVICES_HEADING = {
  label: "Services",
  title: "How I can help",
  description: "From architecture design to hands-on development, I offer services tailored to your technical challenges.",
} as const;
