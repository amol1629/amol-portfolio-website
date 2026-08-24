import { HeroClient } from "./HeroClient";
import type { ReactNode } from "react";

const HERO_CONTENT = {
  headline: {
    line1: "Fast frontends win users.",
    line2: "I build them.",
  },
  description:
    "Architecting, designing, and optimizing web applications that users love — built to load fast, rank high, and scale effortlessly.",
  cta: {
    primary: { label: "Book a Call", href: "/work-with-me" },
    secondary: { label: "See Work", href: "#projects" },
  },
  trustLine: "Enterprise-grade quality. Startup-speed delivery.",
} as const;

export function Hero(): ReactNode {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container-custom relative z-10 py-24 md:py-32">
        <HeroClient content={HERO_CONTENT} />
      </div>
    </section>
  );
}
