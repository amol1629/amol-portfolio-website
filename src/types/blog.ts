export type BlogCategory = "frontend" | "architecture" | "performance" | "career" | "tools";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
}
