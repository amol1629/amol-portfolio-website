import type { GlassAccent } from "@/components/shared";
import { projects } from "@/data";

export const PROJECTS_PAGE_HEADING = {
  label: "Projects",
  title: "Case Studies",
  description: "From Fortune 500 platforms to personal experiments — each project taught me something new.",
} as const;

export const TECH_ICON_MAP: Record<string, string> = {
  "react": "logos:react",
  "next.js": "logos:nextjs-icon",
  "typescript": "logos:typescript-icon",
  "javascript": "logos:javascript",
  "node.js": "logos:nodejs-icon",
  "graphql": "logos:graphql",
  "openai api": "simple-icons:openai",
  "azure": "logos:microsoft-azure",
  "tailwind css": "logos:tailwindcss-icon",
  "postgresql": "logos:postgresql",
  "mongodb": "logos:mongodb-icon",
  "prisma": "logos:prisma",
  "docker": "logos:docker-icon",
  "github": "logos:github-icon",
  "git": "logos:git-icon",
  "figma": "logos:figma",
  "storybook": "logos:storybook-icon",
  "jest": "logos:jest",
  "cypress": "logos:cypress-icon",
  "python": "logos:python",
  "aws": "logos:aws",
  "vercel": "logos:vercel-icon",
  "redis": "logos:redis",
  "firebase": "logos:firebase",
  "shadcn/ui": "simple-icons:shadcnui",
  "shadcn": "simple-icons:shadcnui",
  "framer motion": "simple-icons:framer",
  "zustand": "simple-icons:zustand",
  "zod": "simple-icons:zod",
  "chart.js": "logos:chartjs",
  "recharts": "simple-icons:chartdotjs",
  "express": "simple-icons:express",
  "redux": "logos:redux",
  "tailwind": "logos:tailwindcss-icon",
  "stripe": "logos:stripe",
  "sanity": "logos:sanity",
  "chatgpt api": "simple-icons:openai",
  "rest apis": "mdi:api",
  "supabase": "logos:supabase-icon",
} as const;

export const CATEGORY_ACCENTS: Record<string, GlassAccent> = {
  enterprise: "cyan",
  saas: "purple",
  ecommerce: "amber",
  fintech: "emerald",
  healthcare: "emerald",
  ai: "purple",
  tools: "cyan",
  "open-source": "emerald",
} as const;

export type FilterOption = "all" | "enterprise" | "personal";

export const INITIAL_VISIBLE_COUNT = 6;

export const PROJECT_COUNTS = {
  all: projects.length,
  enterprise: projects.filter((p) => p.type === "enterprise").length,
  personal: projects.filter((p) => p.type === "personal").length,
} as const;
