import type { Service, EngagementStep, FAQ } from "@/types";

export const services: Service[] = [
  {
    id: "legacy-migration",
    title: "Legacy Code Rescue",
    description:
      "Old .NET or jQuery frontends with 8+ second load times? I've migrated entire platforms to React with zero downtime and systematic milestones.",
    outcomes: [
      "60% faster load times",
      "Zero-downtime migrations",
      "Modern React + TypeScript",
    ],
    icon: "ArrowRightLeft",
  },
  {
    id: "design-systems",
    title: "Design Systems & Component Libraries",
    description:
      "Teams rebuilding the same UI? I build component libraries with Storybook documentation that cut dev time by 45% and get adopted across teams.",
    outcomes: [
      "45% faster development",
      "100% design consistency",
      "Reusable across teams",
    ],
    icon: "Layers",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description:
      "Achieve sub-second load times and smooth 60fps interactions. I audit, diagnose, and fix performance bottlenecks across the entire frontend stack.",
    outcomes: [
      "90+ Lighthouse scores",
      "40% faster page loads",
      "Improved Core Web Vitals",
    ],
    icon: "Zap",
  },
  {
    id: "team-enablement",
    title: "Team Mentorship & Standards",
    description:
      "Junior teams need direction. I mentor devs, run code reviews that teach, and establish coding standards that stick — so your team ships 2x faster.",
    outcomes: [
      "95% code consistency",
      "50% faster onboarding",
      "Self-sufficient teams",
    ],
    icon: "Users",
  },
  {
    id: "architecture",
    title: "Frontend Architecture",
    description:
      "Design scalable, maintainable frontend architectures that grow with your business. From folder structure to state management, I set the foundation right.",
    outcomes: [
      "Scalable codebase",
      "Clear patterns to follow",
      "Future-proof decisions",
    ],
    icon: "LayoutGrid",
  },
  {
    id: "development",
    title: "Full-Stack Development",
    description:
      "End-to-end development of web applications with React, Next.js, and Node.js. From MVP to enterprise scale, delivering production-ready solutions.",
    outcomes: [
      "Production-ready code",
      "Comprehensive testing",
      "CI/CD pipelines",
    ],
    icon: "Code",
  },
];

export const engagementProcess: EngagementStep[] = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "30-minute call to understand your challenges, goals, and timeline. No commitment required.",
  },
  {
    step: 2,
    title: "Proposal & Scope",
    description:
      "Detailed proposal outlining approach, deliverables, timeline, and investment. Clear expectations upfront.",
  },
  {
    step: 3,
    title: "Kickoff & Execution",
    description:
      "Structured engagement with regular check-ins, progress updates, and collaborative problem-solving.",
  },
  {
    step: 4,
    title: "Handoff & Support",
    description:
      "Documentation, knowledge transfer, and post-engagement support to ensure lasting success.",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What's your typical engagement model?",
    answer:
      "I focus on project-based engagements with defined scopes — migrations, performance audits, design systems, or full-stack development. Clear deliverables, timelines, and milestones from day one.",
  },
  {
    question: "Do you work with remote teams?",
    answer:
      "Absolutely. I've worked with distributed teams across multiple time zones. I'm flexible with async communication and can align with your team's working hours for sync meetings.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "5+ years expertise in React, Next.js, TypeScript, Tailwind CSS, and System Design. 4+ years with Node.js, Azure, SharePoint, PostgreSQL, MongoDB, and Prompt Engineering. Also experienced with Python, AWS, Docker, and LangChain.",
  },
  {
    question: "How do you handle knowledge transfer?",
    answer:
      "Every engagement includes documentation, code comments, and dedicated handoff sessions. For longer engagements, I do regular knowledge-sharing sessions with your team throughout the project.",
  },
  {
    question: "What's your availability?",
    answer:
      "I typically take on 1-2 concurrent engagements to ensure quality focus. For new inquiries, lead time is usually 2-4 weeks. Urgent needs can sometimes be accommodated — let's discuss.",
  },
];
