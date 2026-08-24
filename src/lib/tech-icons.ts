export const techIconMap: Record<string, string> = {
  // Frameworks & Libraries
  "react": "logos:react",
  "react 19": "logos:react",
  "next.js": "logos:nextjs-icon",
  "next.js 15": "logos:nextjs-icon",
  "express": "simple-icons:express",
  "redux": "logos:redux",

  // Languages
  "typescript": "logos:typescript-icon",
  "javascript": "logos:javascript",
  "python": "logos:python",

  // Styling
  "tailwind css": "logos:tailwindcss-icon",
  "tailwind": "logos:tailwindcss-icon",
  "shadcn": "simple-icons:shadcnui",
  "shadcn/ui": "simple-icons:shadcnui",

  // Backend & Runtime
  "node.js": "logos:nodejs-icon",
  "graphql": "logos:graphql",

  // Auth
  "jwt": "logos:jwt-icon",

  // Databases
  "postgresql": "logos:postgresql",
  "mongodb": "logos:mongodb-icon",
  "prisma": "logos:prisma",
  "sqlite": "logos:sqlite",
  "redis": "logos:redis",
  "firebase": "logos:firebase",
  "supabase": "logos:supabase-icon",

  // Cloud & DevOps
  "aws": "logos:aws",
  "azure": "logos:microsoft-azure",
  "docker": "logos:docker-icon",
  "vercel": "logos:vercel-icon",

  // AI & APIs
  "openai api": "simple-icons:openai",
  "chatgpt api": "simple-icons:openai",

  // Testing & Tools
  "jest": "logos:jest",
  "cypress": "logos:cypress-icon",
  "storybook": "logos:storybook-icon",
  "webpack": "logos:webpack",

  // Performance
  "lighthouse": "simple-icons:lighthouse",
  "web vitals": "mdi:speedometer",
  "chrome devtools": "logos:chrome",
  "performance profiling": "mdi:chart-line",

  // Version Control & Docs
  "github": "logos:github-icon",
  "git": "logos:git-icon",
  "conventional commits": "mdi:source-commit",
  "documentation": "mdi:file-document-outline",
  "developer tools": "mdi:tools",

  // Design
  "figma": "logos:figma",

  // CMS & Payments
  "sanity": "logos:sanity",
  "stripe": "logos:stripe",

  // State & Validation
  "framer motion": "simple-icons:framer",
  "zustand": "simple-icons:zustand",
  "zod": "simple-icons:zod",

  // Charts
  "chart.js": "logos:chartjs",
  "recharts": "simple-icons:chartdotjs",

  // eLearning
  "scorm": "mdi:school-outline",

  // PDF & Documents
  "jspdf": "mdi:file-pdf-box",
};

export const DEFAULT_TECH_ICON = "mdi:code-tags";

export function getTechIcon(tech: string): string {
  return techIconMap[tech.toLowerCase()] ?? DEFAULT_TECH_ICON;
}
