export interface AboutData {
  name: string;
  title: string;
  bio: readonly string[];
  stats: readonly { value: string; label: string }[];
  expertise: readonly { label: string; iconKey: string }[];
  currentFocus: readonly string[];
  socialLinks: readonly { name: string; iconifyIcon: string; url: string }[];
  approach: {
    title: string;
    intro: string;
    points: readonly { label: string; text: string }[];
  };
  resumePath: string;
  resumeFilename: string;
  profileImage: string;
}

export const ABOUT_DATA: AboutData = {
  name: "Amol Rathod",
  title: "Senior Frontend Engineer & UI Architect",
  bio: [
    "I'm a frontend architect with 5+ years of experience building scalable, performant web applications for Fortune 500 companies. I specialize in React ecosystems, design systems, and turning complex requirements into elegant solutions.",
    "From component libraries adopted by multiple enterprise teams to AI-powered platforms serving thousands of users — I've led frontend development across diverse domains including IoT, fintech, e-commerce, and EdTech.",
    "Beyond code, I mentor junior developers, drive technical decisions, and bridge the gap between design and engineering. I believe great frontend work is invisible — users just feel the speed and polish.",
  ],
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "10+", label: "Enterprise Projects" },
    { value: "6+", label: "Personal Projects" },
    { value: "6+", label: "Devs Mentored" },
  ],
  expertise: [
    { label: "Design Systems & Component Libraries", iconKey: "layoutGrid" },
    { label: "Performance Optimization", iconKey: "zap" },
    { label: "Team Leadership & Mentoring", iconKey: "users" },
    { label: "AI-Powered Applications", iconKey: "brain" },
  ],
  currentFocus: ["AI Agents", "Edge Computing", "Design Tokens"],
  socialLinks: [
    { name: "GitHub", iconifyIcon: "mdi:github", url: "https://github.com/amol1629" },
    { name: "LinkedIn", iconifyIcon: "mdi:linkedin", url: "https://www.linkedin.com/in/amol-rathod-44b4aa230/" },
    { name: "Email", iconifyIcon: "mdi:email", url: "mailto:rathodamol1554@gmail.com" },
  ],
  approach: {
    title: "My approach",
    intro: "I don't just write code — I own outcomes. Whether it's architecting a platform from scratch, rescuing a legacy codebase, or mentoring a junior team to ship faster, I take full responsibility.",
    points: [
      { label: "What I do", text: "Build component libraries, migrate legacy systems, optimize performance, and establish coding standards that teams actually follow." },
      { label: "How I work", text: "Start with audits and metrics. Identify the biggest pain points. Ship incremental wins while building toward the larger architecture. Document everything so the team can scale without me." },
      { label: "Results I deliver", text: "40-60% faster load times. 45% reduction in dev time. Code consistency above 95%. Teams that ship 2x faster after I establish patterns." },
    ],
  },
  resumePath: "/pdfs/resume.pdf",
  resumeFilename: "Amol_Rathod_Resume.pdf",
  profileImage: "/images/profile.jpg",
};
