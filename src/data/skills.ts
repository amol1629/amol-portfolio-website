import type { Skill, SkillDomainGroup } from "@/types";

export const skills: Skill[] = [
  // Frontend - Expert (5+ years)
  { id: "react", name: "React", domain: "frontend", level: "expert", years: 5 },
  { id: "nextjs", name: "Next.js", domain: "frontend", level: "expert", years: 5 },
  { id: "typescript", name: "TypeScript", domain: "frontend", level: "expert", years: 5 },
  { id: "javascript", name: "JavaScript", domain: "frontend", level: "expert", years: 5 },
  { id: "html-css", name: "HTML/CSS", domain: "frontend", level: "expert", years: 5 },
  { id: "tailwind", name: "Tailwind CSS", domain: "frontend", level: "expert", years: 5 },
  { id: "framer-motion", name: "Framer Motion", domain: "frontend", level: "advanced", years: 4 },
  { id: "threejs", name: "Three.js", domain: "frontend", level: "proficient", years: 2 },
  { id: "graphql", name: "GraphQL", domain: "frontend", level: "advanced", years: 4 },
  { id: "redux", name: "Redux", domain: "frontend", level: "expert", years: 5 },

  // Backend - Advanced (4+ years)
  { id: "nodejs", name: "Node.js", domain: "backend", level: "advanced", years: 4 },
  { id: "python", name: "Python", domain: "backend", level: "proficient", years: 2 },
  { id: "postgresql", name: "PostgreSQL", domain: "backend", level: "advanced", years: 4 },
  { id: "mongodb", name: "MongoDB", domain: "backend", level: "advanced", years: 4 },
  { id: "redis", name: "Redis", domain: "backend", level: "proficient", years: 2 },
  { id: "rest-api", name: "REST APIs", domain: "backend", level: "expert", years: 5 },

  // Cloud & Microsoft Ecosystem - Advanced (4+ years)
  { id: "azure", name: "Microsoft Azure", domain: "cloud-microsoft", level: "advanced", years: 4 },
  { id: "azure-devops", name: "Azure DevOps", domain: "cloud-microsoft", level: "advanced", years: 4 },
  { id: "sharepoint", name: "SharePoint", domain: "cloud-microsoft", level: "advanced", years: 4 },
  { id: "power-platform", name: "Power Platform", domain: "cloud-microsoft", level: "proficient", years: 2 },
  { id: "m365", name: "Microsoft 365", domain: "cloud-microsoft", level: "advanced", years: 4 },
  { id: "aws", name: "AWS", domain: "cloud-microsoft", level: "proficient", years: 2 },
  { id: "vercel", name: "Vercel", domain: "cloud-microsoft", level: "advanced", years: 4 },
  { id: "docker", name: "Docker", domain: "cloud-microsoft", level: "proficient", years: 2 },

  // AI & Machine Learning - Proficient (2+ years)
  { id: "openai-api", name: "OpenAI API", domain: "ai-ml", level: "proficient", years: 2 },
  { id: "chatgpt-api", name: "ChatGPT API", domain: "ai-ml", level: "proficient", years: 2 },
  { id: "langchain", name: "LangChain", domain: "ai-ml", level: "proficient", years: 2 },
  { id: "prompt-engineering", name: "Prompt Engineering", domain: "ai-ml", level: "advanced", years: 4 },
  { id: "ai-integration", name: "AI Integration", domain: "ai-ml", level: "proficient", years: 2 },
  { id: "llm-apps", name: "LLM Applications", domain: "ai-ml", level: "proficient", years: 2 },

  // Architecture - Expert (5+ years)
  { id: "system-design", name: "System Design", domain: "architecture", level: "expert", years: 5 },
  { id: "micro-frontends", name: "Micro-Frontends", domain: "architecture", level: "advanced", years: 4 },
  { id: "design-patterns", name: "Design Patterns", domain: "architecture", level: "expert", years: 5 },
  { id: "api-design", name: "API Design", domain: "architecture", level: "expert", years: 5 },
  { id: "performance", name: "Performance Optimization", domain: "architecture", level: "expert", years: 5 },
  { id: "scalability", name: "Scalability Patterns", domain: "architecture", level: "advanced", years: 4 },

  // Testing - Expert/Advanced (4-5 years)
  { id: "jest", name: "Jest", domain: "testing", level: "expert", years: 5 },
  { id: "rtl", name: "React Testing Library", domain: "testing", level: "expert", years: 5 },
  { id: "cypress", name: "Cypress", domain: "testing", level: "advanced", years: 4 },
  { id: "playwright", name: "Playwright", domain: "testing", level: "proficient", years: 2 },

  // Tools - Expert/Advanced (4-5 years)
  { id: "git", name: "Git", domain: "tools", level: "expert", years: 5 },
  { id: "webpack", name: "Webpack", domain: "tools", level: "advanced", years: 4 },
  { id: "vite", name: "Vite", domain: "tools", level: "advanced", years: 4 },
  { id: "figma", name: "Figma", domain: "tools", level: "proficient", years: 2 },
];

export const skillDomainGroups: SkillDomainGroup[] = [
  {
    domain: "frontend",
    label: "Frontend",
    skills: skills.filter((s) => s.domain === "frontend"),
  },
  {
    domain: "backend",
    label: "Backend",
    skills: skills.filter((s) => s.domain === "backend"),
  },
  {
    domain: "cloud-microsoft",
    label: "Cloud & Microsoft",
    skills: skills.filter((s) => s.domain === "cloud-microsoft"),
  },
  {
    domain: "ai-ml",
    label: "AI & Machine Learning",
    skills: skills.filter((s) => s.domain === "ai-ml"),
  },
  {
    domain: "architecture",
    label: "Architecture",
    skills: skills.filter((s) => s.domain === "architecture"),
  },
  {
    domain: "testing",
    label: "Testing",
    skills: skills.filter((s) => s.domain === "testing"),
  },
  {
    domain: "tools",
    label: "Tools",
    skills: skills.filter((s) => s.domain === "tools"),
  },
];
