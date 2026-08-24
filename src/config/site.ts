export const siteConfig = {
  name: "Amol Rathod",
  title: "Technical Consultant & Frontend Specialist",
  description:
    "Technical consultant specializing in frontend architecture, performance optimization, and scalable web applications. Helping organizations build exceptional digital experiences.",
  url: "https://amolrathod.com",
  email: "rathodamol1554@gmail.com",
  author: "Amol Rathod",
  locale: "en-US",
  themeColor: "#06B6D4",
  links: {
    linkedin: "https://www.linkedin.com/in/amol-rathod-44b4aa230/",
    github: "https://github.com/amol1629",
  },
} as const;

export type SiteConfig = typeof siteConfig;
