export type CertificationProvider =
  | "microsoft"
  | "aws"
  | "azure"
  | "google"
  | "meta"
  | "oracle"
  | "salesforce"
  | "ibm"
  | "udemy"
  | "hackerrank"
  | "coursera"
  | "linkedin"
  | "anthropic"
  | "perficient"
  | "optimizely"
  | "moz"
  | "mozilla"
  | "un"
  | "other";

export type CertificationCategory =
  | "cloud"
  | "microsoft"
  | "frontend"
  | "backend"
  | "devops"
  | "data"
  | "ai"
  | "security"
  | "architecture"
  | "management"
  | "seo";

export interface Certification {
  id: string;
  name: string;
  shortName?: string;
  provider: CertificationProvider;
  category: CertificationCategory;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeImage?: string;
  pdfUrl?: string;
  featured: boolean;
}
