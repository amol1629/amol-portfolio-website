"use client";

import { memo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { Icon } from "@iconify/react";
import { LayoutGrid, Zap, Users, Brain, Download, ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { AboutData } from "./about.data";

const expertiseIcons: Record<string, LucideIcon> = {
  layoutGrid: LayoutGrid,
  zap: Zap,
  users: Users,
  brain: Brain,
};

interface AboutClientProps {
  data: AboutData;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

function StatsSection({ stats }: { stats: AboutData["stats"] }): ReactNode {
  return (
    <div className="flex flex-wrap gap-6 md:gap-8 pt-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-bold gradient-text">{stat.value}</div>
          <div className="text-sm text-[rgb(var(--color-fg-primary))/80]">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function ExpertiseSection({ expertise }: { expertise: AboutData["expertise"] }): ReactNode {
  return (
    <div className="pt-6">
      <p className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-secondary))] mb-3">
        What I Do Best
      </p>
      <div className="flex flex-wrap gap-2">
        {expertise.map((item) => {
          const ItemIcon = expertiseIcons[item.iconKey] ?? LayoutGrid;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
            >
              <ItemIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-[rgb(var(--color-fg-primary))/80]">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CurrentFocusSection({ currentFocus }: { currentFocus: AboutData["currentFocus"] }): ReactNode {
  return (
    <div className="pt-4">
      <p className="text-sm">
        <span className="text-[rgb(var(--color-fg-primary))/80]">Currently exploring:</span>{" "}
        {currentFocus.map((focus, idx) => (
          <span key={focus}>
            <span className="text-purple-400">{focus}</span>
            {idx < currentFocus.length - 1 && (
              <span className="text-[rgb(var(--color-fg-secondary))]"> · </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}

function SocialLinksSection({ socialLinks, resumePath, resumeFilename }: { socialLinks: AboutData["socialLinks"]; resumePath: string; resumeFilename: string }): ReactNode {
  return (
    <div className="pt-4 flex items-center gap-4">
      <div className="flex items-center gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
            aria-label={social.name}
          >
            <Icon
              icon={social.iconifyIcon}
              className="w-5 h-5 text-[rgb(var(--color-fg-secondary))] group-hover:text-cyan-400 transition-colors"
            />
          </a>
        ))}
      </div>
      <a
        href={resumePath}
        download={resumeFilename}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all text-sm font-medium"
      >
        <Download className="w-4 h-4" />
        Download Resume
      </a>
    </div>
  );
}

function AboutClientComponent({ data }: AboutClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;
  const [showAllBio, setShowAllBio] = useState(false);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className="grid md:grid-cols-2 gap-12 items-center mb-20"
      >
        <motion.div variants={childVariants}>
          <div className="max-w-[200px] sm:max-w-[280px] md:max-w-[448px] mx-auto">
            <Image
              src={data.profileImage}
              alt={data.name}
              width={448}
              height={448}
              sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, 448px"
              className="rounded-2xl object-cover w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-6">
          <div>
            <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {data.name}
            </h3>
            <p className="text-lg text-cyan-400 mb-4">{data.title}</p>
          </div>

          {/* Desktop: show all paragraphs */}
          <div className="hidden md:block space-y-4">
            {data.bio.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "text-lg text-[rgb(var(--color-fg-primary))] leading-relaxed"
                    : "text-[rgb(var(--color-fg-primary))/90] leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mobile/Tablet: show 2 paragraphs with toggle for more content */}
          <div className="md:hidden space-y-4">
            {data.bio.slice(0, 2).map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "text-lg text-[rgb(var(--color-fg-primary))] leading-relaxed"
                    : "text-[rgb(var(--color-fg-primary))/90] leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}

            {/* Expanded content on mobile */}
            {showAllBio && (
              <>
                {data.bio.slice(2).map((paragraph, idx) => (
                  <p
                    key={idx + 2}
                    className="text-[rgb(var(--color-fg-primary))/90] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
                <StatsSection stats={data.stats} />
                <ExpertiseSection expertise={data.expertise} />
                <CurrentFocusSection currentFocus={data.currentFocus} />
                <SocialLinksSection socialLinks={data.socialLinks} resumePath={data.resumePath} resumeFilename={data.resumeFilename} />
              </>
            )}

            <button
              onClick={() => setShowAllBio(!showAllBio)}
              className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
            >
              {showAllBio ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Desktop: show all content */}
          <div className="hidden md:block">
            <StatsSection stats={data.stats} />
          </div>
          <div className="hidden md:block">
            <ExpertiseSection expertise={data.expertise} />
          </div>
          <div className="hidden md:block">
            <CurrentFocusSection currentFocus={data.currentFocus} />
          </div>
          <div className="hidden md:block">
            <SocialLinksSection socialLinks={data.socialLinks} resumePath={data.resumePath} resumeFilename={data.resumeFilename} />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={childVariants}
        className="max-w-3xl"
      >
        <h3 className="text-2xl font-bold mb-4">{data.approach.title}</h3>
        <div className="space-y-4 text-[rgb(var(--color-fg-secondary))]">
          <p className="text-lg text-pretty">{data.approach.intro}</p>
          {data.approach.points.map((point) => (
            <p key={point.label} className="text-pretty">
              <span className="text-white font-medium">{point.label}:</span> {point.text}
            </p>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export const AboutClient = memo(AboutClientComponent);
