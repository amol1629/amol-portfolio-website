"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { SectionWrapper, LiquidGlassCard, glassAccentColors, type GlassAccent } from "@/components/shared";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

interface TrustCard {
  id: string;
  title: string;
  icon: string;
  items: string[];
  accent: GlassAccent;
}

const trustCards: TrustCard[] = [
  {
    id: "enterprise",
    title: "Enterprise Impact",
    icon: "ph:buildings-duotone",
    items: ["Fortune 500 Clients", "10+ Products Shipped", "50,000+ Users Served", "100% On-Time Delivery"],
    accent: "cyan",
  },
  {
    id: "performance",
    title: "Performance Wins",
    icon: "ph:lightning-duotone",
    items: ["25% Core Web Vitals ↑", "46% Faster TTI", "30% Tech Debt ↓", "22% Fewer Bugs"],
    accent: "purple",
  },
  {
    id: "ai",
    title: "AI & Innovation",
    icon: "ph:brain-duotone",
    items: ["OpenAI & Claude APIs", "RAG-Based Agents", "AI-Powered Products", "Prompt Engineering"],
    accent: "cyan",
  },
  {
    id: "leadership",
    title: "Technical Leadership",
    icon: "ph:users-three-duotone",
    items: ["6-Member Team Lead", "8 Sprints Delivered", "40% Faster Onboarding", "3 Juniors Mentored"],
    accent: "emerald",
  },
  {
    id: "quality",
    title: "Quality & Security",
    icon: "ph:shield-check-duotone",
    items: ["WCAG 2.1 AA Compliant", "40% Vulnerabilities ↓", "99.8% Uptime", "12 Accessible Features"],
    accent: "purple",
  },
  {
    id: "recognition",
    title: "Recognition",
    icon: "ph:trophy-duotone",
    items: ["Extra Mile Award", "SuperStar of Month (3x)", "Technical Star Award", "Hackathon Winner"],
    accent: "amber",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export function TrustLayer(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;

  return (
    <SectionWrapper id="trust" className="py-16 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="text-[rgb(var(--color-fg-secondary))] text-lg md:text-xl max-w-2xl mx-auto">
          Trusted by enterprises to architect scalable frontend systems
        </p>
      </motion.div>

      {/* Trust Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {trustCards.map((card) => (
          <TrustCardComponent key={card.id} card={card} variants={childVariants} />
        ))}
      </motion.div>

      {/* Company Logos Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/5"
      >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[rgb(var(--color-fg-tertiary))] mb-6">
          Experience With
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {["Perficient", "Harbinger", "MyClan"].map((company) => (
            <span
              key={company}
              className="text-lg md:text-xl font-semibold text-[rgb(var(--color-fg-tertiary))] hover:text-[rgb(var(--color-fg-secondary))] transition-colors"
            >
              {company}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

interface TrustCardProps {
  card: TrustCard;
  variants: typeof itemVariants | Record<string, never>;
}

function TrustCardComponent({ card, variants }: TrustCardProps): ReactNode {
  const colors = glassAccentColors[card.accent];

  return (
    <motion.div variants={variants}>
      <LiquidGlassCard padding="md" className="h-full group cursor-pointer">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: colors.bg }}
          >
            <Icon icon={card.icon} className="w-5 h-5" style={{ color: colors.text }} />
          </div>
          <h3 className="font-semibold text-[rgb(var(--color-fg-primary))]">{card.title}</h3>
        </div>

        {/* Items */}
        <ul className="space-y-2">
          {card.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-[rgb(var(--color-fg-secondary))]"
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: colors.text }}
              />
              {item}
            </li>
          ))}
        </ul>
      </LiquidGlassCard>
    </motion.div>
  );
}
