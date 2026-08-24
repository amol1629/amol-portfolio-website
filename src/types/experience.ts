export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: string[];
  techStack?: string[];
  isEducation?: boolean;
  relatedProjects?: string[];
}
