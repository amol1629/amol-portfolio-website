export interface ProjectMetric {
  value: string;
  label: string;
  context?: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudyContent {
  challenge?: string[];
  solution?: string[];
  results?: string[];
  keyFeatures?: string[];
  lessonsLearned?: string[];
  architecture?: string;
  screenshots?: ProjectScreenshot[];
  video?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export type ProjectType = "enterprise" | "personal";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  hook?: string;
  type: ProjectType;
  category: ProjectCategory;
  featured: boolean;
  image: string;
  imageAlt: string;
  metrics: ProjectMetric[];
  techStack: string[];
  links?: ProjectLinks;
  date: string;
  client?: string;
  role?: string;
  caseStudy?: CaseStudyContent;
}

export type ProjectCategory =
  | "enterprise"
  | "saas"
  | "ecommerce"
  | "fintech"
  | "healthcare"
  | "ai"
  | "tools"
  | "open-source";

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}
