"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LiquidGlassCard, Badge, glassAccentColors, ResponsiveShowMore } from "@/components/shared";
import { formatDate } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ChevronDown } from "lucide-react";
import { calculateDuration } from "./experience.data";
import type { Experience as ExperienceType } from "@/types";
import type { ReactNode } from "react";

interface ExperienceClientProps {
  experiences: ExperienceType[];
}

const ACCENT_OPTIONS = ["cyan", "emerald", "amber", "purple"] as const;

function ExperienceClientComponent({ experiences }: ExperienceClientProps): ReactNode {
  return (
    <div className="relative">
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(var(--color-accent-cyan))/0.5] via-[rgb(var(--color-accent-purple))/0.3] to-transparent hidden md:block" />

      <ResponsiveShowMore initialCount={2} className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <ExperienceCard experience={experience} index={index} />
          </motion.div>
        ))}
      </ResponsiveShowMore>
    </div>
  );
}

interface AnimatedYearsProps {
  startDate: string;
}

const AnimatedYears = memo(function AnimatedYears({ startDate }: AnimatedYearsProps): ReactNode {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const start = new Date(startDate);
  const now = new Date();
  const years = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            setCount(current);
            if (current >= years) {
              clearInterval(interval);
            }
          }, 100);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [years]);

  return <span ref={ref}>{count}+</span>;
});

interface ExperienceCardProps {
  experience: ExperienceType;
  index: number;
}

const ExperienceCard = memo(function ExperienceCard({ experience, index }: ExperienceCardProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;
  const dateRange = experience.current
    ? `${formatDate(experience.startDate)} — Present`
    : `${formatDate(experience.startDate)} — ${formatDate(experience.endDate ?? "")}`;
  const duration = calculateDuration(experience.startDate, experience.endDate);

  const accent = experience.current ? "cyan" : (ACCENT_OPTIONS[index % ACCENT_OPTIONS.length] ?? "cyan");
  const colors = glassAccentColors[accent];

  const hasExpandableContent =
    experience.highlights.length > 0 || (experience.techStack && experience.techStack.length > 0);

  return (
    <div className={`relative md:w-1/2 ${isLeft ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}>
      <div
        className={`hidden md:block absolute top-6 w-4 h-4 rounded-full ${isLeft ? "-right-2" : "-left-2"} ${experience.current ? "animate-pulse" : ""}`}
        style={{
          background: experience.current ? colors.text : colors.bg,
          boxShadow: experience.current ? `0 0 12px ${colors.glow}` : "none",
          border: `2px solid ${colors.border}`,
        }}
      />
      {experience.current && (
        <div
          className={`hidden md:block absolute top-6 w-4 h-4 rounded-full ${isLeft ? "-right-2" : "-left-2"} animate-ping`}
          style={{ background: colors.text, opacity: 0.4 }}
        />
      )}

      <LiquidGlassCard
        className={experience.current ? "shadow-[0_0_20px_rgba(6,182,212,0.15)] border-cyan-500/30" : ""}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-lg font-bold">{experience.role}</h3>
          {experience.current && <Badge variant="accent">Current</Badge>}
          {!experience.isEducation && (
            <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/20 text-gray-300 font-medium">
              {duration}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-[rgb(var(--color-fg-secondary))] mb-4">
          {experience.companyLogo && (
            <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center shrink-0 relative">
              {experience.companyLogo.startsWith("http") ? (
                <Image
                  src={experience.companyLogo}
                  alt={`${experience.company} logo`}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                <Icon icon={experience.companyLogo} className="w-4 h-4" style={{ color: colors.text }} />
              )}
            </div>
          )}
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline transition-colors"
            style={{ color: colors.text }}
            onClick={(e) => e.stopPropagation()}
          >
            {experience.company}
          </a>
          {experience.location && (
            <>
              <span>•</span>
              <span>{experience.location}</span>
            </>
          )}
          <span>•</span>
          <span>{dateRange}</span>
        </div>

        {experience.current && !experience.isEducation && (
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className="text-[rgb(var(--color-fg-tertiary))]">Experience here:</span>
            <span className="text-xl font-bold" style={{ color: colors.text }}>
              <AnimatedYears startDate={experience.startDate} />
            </span>
            <span className="text-[rgb(var(--color-fg-tertiary))]">years</span>
          </div>
        )}

        <p className="text-[rgb(var(--color-fg-secondary))] mb-4">{experience.description}</p>

        <div className="hidden xl:block">
          {experience.highlights.length > 0 && (
            <ul className="space-y-2 mb-4">
              {experience.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-[rgb(var(--color-fg-secondary))]">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: colors.text }} />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {experience.techStack && experience.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-white/[0.05] rounded-full border border-white/10 text-[rgb(var(--color-fg-secondary))] shadow-[0_0_8px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="xl:hidden">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                {experience.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-[rgb(var(--color-fg-secondary))]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: colors.text }} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {experience.techStack && experience.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-white/[0.05] rounded-full border border-white/10 text-[rgb(var(--color-fg-secondary))] shadow-[0_0_8px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {hasExpandableContent && !experience.isEducation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors mt-2"
              style={{ color: colors.text }}
            >
              <span>{isExpanded ? "Show Less" : "Show More"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </LiquidGlassCard>
    </div>
  );
});

export const ExperienceClient = memo(ExperienceClientComponent);
