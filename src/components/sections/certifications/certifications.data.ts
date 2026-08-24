export const CERTIFICATIONS_HEADING = {
  label: "Certifications",
  title: "Professional Credentials",
  description: "Industry-recognized certifications validating expertise across cloud platforms and modern development.",
} as const;

export interface ProviderInfo {
  name: string;
  icon: string;
  color: string;
  logo?: string;
}

export const PROVIDER_INFO: Record<string, ProviderInfo> = {
  ibm: { name: "IBM", icon: "simple-icons:ibm", color: "#1F70C1" },
  udemy: { name: "Udemy", icon: "simple-icons:udemy", color: "#A435F0" },
  hackerrank: { name: "HackerRank", icon: "simple-icons:hackerrank", color: "#00875A" },
  aws: { name: "AWS", icon: "simple-icons:amazonaws", color: "#FF9900" },
  azure: { name: "Azure", icon: "simple-icons:microsoftazure", color: "#0078D4" },
  google: { name: "Google", icon: "simple-icons:google", color: "#4285F4" },
  microsoft: { name: "Microsoft", icon: "simple-icons:microsoft", color: "#00A4EF" },
  coursera: { name: "Coursera", icon: "simple-icons:coursera", color: "#0056D2" },
  linkedin: { name: "LinkedIn", icon: "simple-icons:linkedin", color: "#0A66C2" },
  anthropic: { name: "Anthropic", icon: "simple-icons:anthropic", color: "#8B5A3C" },
  perficient: { name: "Perficient", icon: "", color: "#0D6B6E", logo: "/images/logos/perficient.png" },
  optimizely: { name: "Optimizely", icon: "", color: "#0037FF", logo: "/images/logos/optimizely.png" },
  un: { name: "UN", icon: "mdi:earth", color: "#5B92E5" },
} as const;

export interface ProviderWithCount {
  provider: string;
  count: number;
  info: ProviderInfo;
}
