export interface ImpactMetric {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  context?: string;
  icon: string;
  accent: "cyan" | "emerald" | "purple" | "amber";
  isPercentage?: boolean;
}

export interface Achievement {
  id: string;
  category: string;
  description: string;
  icon: string;
  accent: "cyan" | "emerald" | "purple" | "amber";
}

export interface BeforeAfter {
  id: string;
  label: string;
  before: string;
  after: string;
  improvement: string;
  icon: string;
  accent: "cyan" | "emerald" | "purple" | "amber";
}

export interface TimelineItem {
  year: string;
  milestone: string;
  icon: string;
}

export interface IndustryData {
  name: string;
  percentage: number;
  color: string;
  projects: number;
}

export const impactMetrics: ImpactMetric[] = [
  {
    id: "years",
    value: 5,
    suffix: "+",
    label: "Years Experience",
    context: "Frontend Development",
    icon: "Calendar",
    accent: "cyan",
  },
  {
    id: "enterprise",
    value: 10,
    suffix: "+",
    label: "Enterprise Projects",
    context: "Fortune 500 clients",
    icon: "Building2",
    accent: "purple",
  },
  {
    id: "personal",
    value: 6,
    suffix: "+",
    label: "Personal Projects",
    context: "Open source & tools",
    icon: "Rocket",
    accent: "emerald",
  },
  {
    id: "devtime",
    value: 45,
    suffix: "%",
    label: "Dev Time Saved",
    context: "Component library impact",
    icon: "Clock",
    accent: "amber",
    isPercentage: true,
  },
  {
    id: "performance",
    value: 60,
    suffix: "%",
    label: "Load Time Reduction",
    context: "Legacy migrations",
    icon: "Zap",
    accent: "emerald",
    isPercentage: true,
  },
  {
    id: "mentored",
    value: 6,
    suffix: "+",
    label: "Devs Mentored",
    context: "2 promoted to senior",
    icon: "Users",
    accent: "purple",
  },
];

export const beforeAfterMetrics: BeforeAfter[] = [
  {
    id: "load-time",
    label: "Page Load Time",
    before: "8s",
    after: "2s",
    improvement: "75% faster",
    icon: "Timer",
    accent: "emerald",
  },
  {
    id: "lighthouse",
    label: "Lighthouse Score",
    before: "45",
    after: "95+",
    improvement: "2x improvement",
    icon: "Gauge",
    accent: "cyan",
  },
  {
    id: "bundle-size",
    label: "Bundle Size",
    before: "2.5MB",
    after: "450KB",
    improvement: "82% smaller",
    icon: "Package",
    accent: "purple",
  },
];

export const achievements: Achievement[] = [
  {
    id: "enterprise-impact",
    category: "Enterprise",
    description:
      "Led frontend modernization for Fortune 500 energy company, reducing page load times by 60%",
    icon: "Building2",
    accent: "cyan",
  },
  {
    id: "team-growth",
    category: "Leadership",
    description:
      "Led 6-member frontend team with sprint planning, code reviews, and technical mentorship",
    icon: "Users",
    accent: "purple",
  },
  {
    id: "performance-expert",
    category: "Performance",
    description:
      "Consistently achieve 90+ Lighthouse scores on production applications",
    icon: "Zap",
    accent: "emerald",
  },
  {
    id: "architecture",
    category: "Architecture",
    description:
      "Built component library with 25+ components adopted across 3+ enterprise teams",
    icon: "Layers",
    accent: "amber",
  },
];

export const careerTimeline: TimelineItem[] = [
  { year: "2020", milestone: "Started as Software Engineer at MyClan Services", icon: "Briefcase" },
  { year: "2021", milestone: "Built Retail & Food Delivery Platform features", icon: "ShoppingCart" },
  { year: "2022", milestone: "Grew expertise in React ecosystem & best practices", icon: "TrendingUp" },
  { year: "2023", milestone: "Joined Harbinger, contributed to AI Assessment Platform", icon: "Brain" },
  { year: "2024", milestone: "Won SuperStar, Technical Star, Hackathon awards", icon: "Award" },
  { year: "2025", milestone: "Technical Consultant at Perficient - leading 6-member team", icon: "Rocket" },
];

export const industryBreakdown: IndustryData[] = [
  { name: "EdTech", percentage: 25, color: "#06b6d4", projects: 3 },
  { name: "IoT", percentage: 18, color: "#a855f7", projects: 2 },
  { name: "Food Tech", percentage: 14, color: "#f59e0b", projects: 1 },
  { name: "Energy", percentage: 13, color: "#10b981", projects: 1 },
  { name: "Finance", percentage: 12, color: "#3b82f6", projects: 1 },
  { name: "Retail", percentage: 10, color: "#ec4899", projects: 1 },
  { name: "HR Tech", percentage: 8, color: "#6366f1", projects: 1 },
];
