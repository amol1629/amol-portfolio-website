import type { GlassAccent } from "@/components/shared";

export interface CapabilitySkill {
  name: string;
  icon: string;
  years?: number;
  level?: "Expert" | "Advanced" | "Proficient";
}

export interface CapabilityProject {
  name: string;
  slug: string;
}

export interface CapabilityData {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: CapabilitySkill[];
  projects: CapabilityProject[];
  metrics?: string;
  accent: GlassAccent;
}

export const CAPABILITIES_DATA: CapabilityData[] = [
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    description: "Building scalable SPAs and SSR/SSG applications with modern React ecosystem and state management.",
    icon: "lucide:layout-template",
    skills: [
      { name: "React", icon: "logos:react", years: 5, level: "Expert" },
      { name: "Next.js", icon: "logos:nextjs-icon", years: 5, level: "Expert" },
      { name: "TypeScript", icon: "logos:typescript-icon", years: 5, level: "Expert" },
      { name: "JavaScript", icon: "logos:javascript", years: 5, level: "Expert" },
      { name: "Vue.js", icon: "logos:vue", years: 2, level: "Advanced" },
      { name: "Redux", icon: "logos:redux", years: 5, level: "Expert" },
      { name: "Context API", icon: "logos:react", years: 5, level: "Expert" },
      { name: "Zustand", icon: "simple-icons:zustand", years: 4, level: "Expert" },
      { name: "TanStack Query", icon: "simple-icons:reactquery", years: 3, level: "Expert" },
      { name: "React Native", icon: "logos:react", years: 2, level: "Advanced" },
    ],
    projects: [
      { name: "Component Library", slug: "component-library" },
      { name: "Smart Home Platform", slug: "smart-home-platform" },
    ],
    metrics: "10+ enterprise SPAs delivered",
    accent: "cyan",
  },
  {
    id: "performance-engineering",
    title: "Performance Engineering",
    description: "Optimizing Core Web Vitals, reducing TTI, and eliminating performance bottlenecks with auditing tools.",
    icon: "lucide:gauge",
    skills: [
      { name: "Lighthouse", icon: "logos:lighthouse", years: 5, level: "Expert" },
      { name: "Web Vitals", icon: "logos:vitejs", years: 4, level: "Expert" },
      { name: "Webpack", icon: "logos:webpack", years: 4, level: "Expert" },
      { name: "Vite", icon: "logos:vitejs", years: 3, level: "Expert" },
      { name: "Code Splitting", icon: "logos:javascript", years: 5, level: "Expert" },
      { name: "Lazy Loading", icon: "logos:javascript", years: 5, level: "Expert" },
    ],
    projects: [
      { name: "Energy Portal", slug: "energy-portal" },
      { name: "eLearning Builder", slug: "elearning-builder" },
    ],
    metrics: "25% Core Web Vitals improvement",
    accent: "emerald",
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Integrating OpenAI, Anthropic Claude, and RAG-based agent workflows into production applications.",
    icon: "lucide:sparkles",
    skills: [
      { name: "OpenAI API", icon: "simple-icons:openai", years: 3, level: "Expert" },
      { name: "Anthropic Claude", icon: "simple-icons:anthropic", years: 3, level: "Expert" },
      { name: "Google Gemini", icon: "logos:google-gemini", years: 3, level: "Expert" },
      { name: "RAG", icon: "mdi:database-search", years: 3, level: "Expert" },
      { name: "Prompt Engineering", icon: "mdi:chat-processing", years: 3, level: "Expert" },
      { name: "GitHub Copilot", icon: "logos:github-copilot", years: 3, level: "Expert" },
    ],
    projects: [
      { name: "AI Assessment Platform", slug: "ai-assessment-platform" },
    ],
    metrics: "AI-enhanced UX shipped",
    accent: "purple",
  },
  {
    id: "backend-data",
    title: "Backend & Data",
    description: "Building REST APIs, GraphQL services, and managing data with modern databases and caching.",
    icon: "lucide:database",
    skills: [
      { name: "Node.js", icon: "logos:nodejs-icon", years: 4, level: "Expert" },
      { name: "Express.js", icon: "simple-icons:express", years: 4, level: "Expert" },
      { name: "GraphQL", icon: "logos:graphql", years: 3, level: "Advanced" },
      { name: "MongoDB", icon: "logos:mongodb-icon", years: 3, level: "Advanced" },
      { name: "Redis", icon: "logos:redis", years: 3, level: "Advanced" },
      { name: "IndexedDB", icon: "mdi:database", years: 4, level: "Expert" },
      { name: "REST APIs", icon: "mdi:api", years: 5, level: "Expert" },
    ],
    projects: [
      { name: "Food Delivery Platform", slug: "food-delivery-platform" },
      { name: "HR Performance SaaS", slug: "hr-performance-saas" },
    ],
    metrics: "50,000+ users served",
    accent: "cyan",
  },
  {
    id: "design-systems",
    title: "Design Systems & UI",
    description: "Creating reusable component libraries with Storybook documentation, testing, and modern UI frameworks.",
    icon: "lucide:component",
    skills: [
      { name: "Storybook", icon: "logos:storybook-icon", years: 4, level: "Expert" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", years: 5, level: "Expert" },
      { name: "ShadCN", icon: "simple-icons:shadcnui", years: 4, level: "Expert" },
      { name: "Figma", icon: "logos:figma", years: 4, level: "Expert" },
      { name: "Framer Motion", icon: "simple-icons:framer", years: 4, level: "Expert" },
      { name: "Bootstrap", icon: "logos:bootstrap", years: 5, level: "Expert" },
      { name: "Sass", icon: "logos:sass", years: 5, level: "Expert" },
    ],
    projects: [
      { name: "Component Library", slug: "component-library" },
    ],
    metrics: "25+ components, 45% dev time saved",
    accent: "amber",
  },
  {
    id: "technical-leadership",
    title: "Technical Leadership",
    description: "Leading Agile teams, mentoring developers, establishing CI/CD pipelines and coding standards.",
    icon: "lucide:users",
    skills: [
      { name: "Git", icon: "logos:git-icon", years: 5, level: "Expert" },
      { name: "GitHub Actions", icon: "logos:github-actions", years: 4, level: "Expert" },
      { name: "Azure DevOps", icon: "logos:azure-devops", years: 3, level: "Advanced" },
      { name: "Jira", icon: "logos:jira", years: 5, level: "Expert" },
      { name: "Jest", icon: "logos:jest", years: 5, level: "Expert" },
      { name: "React Testing Library", icon: "logos:testing-library", years: 4, level: "Expert" },
      { name: "Chai", icon: "logos:chai", years: 1, level: "Proficient" },
      { name: "Mocha", icon: "logos:mocha", years: 1, level: "Proficient" },
      { name: "CI/CD", icon: "mdi:pipe", years: 4, level: "Expert" },
    ],
    projects: [
      { name: "Retail Platform", slug: "retail-platform" },
      { name: "Energy Portal", slug: "energy-portal" },
    ],
    metrics: "6-member teams, 100% on-time",
    accent: "purple",
  },
];

export const CAPABILITIES_HEADING = {
  label: "Capabilities",
  title: "What I bring to your project",
  description: "Deep expertise in areas that matter for enterprise success. Each capability is proven through real project delivery.",
} as const;
