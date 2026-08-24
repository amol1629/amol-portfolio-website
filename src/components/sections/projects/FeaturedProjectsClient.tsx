"use client";

import { useState, useRef, memo } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Code2, LayoutGrid, List, TrendingUp } from "lucide-react";
import { Icon } from "@iconify/react";
import { useReducedMotion } from "@/hooks";
import { Button, LiquidGlassCard, glassAccentColors, ResponsiveShowMore, Tooltip } from "@/components/shared";
import { TECH_ICONS, CATEGORY_ACCENTS } from "./projects.data";
import type { Project } from "@/types";
import type { ReactNode } from "react";

interface FeaturedProjectsClientProps {
  enterpriseProjects: Project[];
  personalProjects: Project[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

interface StaggeredRevealProps {
  children: ReactNode;
  index: number;
  prefersReducedMotion: boolean;
}

const StaggeredReveal = memo(function StaggeredReveal({
  children,
  index,
  prefersReducedMotion,
}: StaggeredRevealProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
});

interface TechStackIconsProps {
  techStack: string[];
  limit?: number;
  size?: "sm" | "md";
}

const TechStackIcons = memo(function TechStackIcons({
  techStack,
  limit = 6,
  size = "md",
}: TechStackIconsProps): ReactNode {
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const containerSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className="flex flex-wrap gap-2">
      {techStack.slice(0, limit).map((tech) => {
        const iconName = TECH_ICONS[tech];
        return (
          <Tooltip key={tech} content={tech} position="top">
            <div
              className={`${containerSize} rounded-full bg-white/5 border border-white/10 flex items-center justify-center`}
            >
              {iconName ? (
                <Icon icon={iconName} className={`${iconSize} text-[rgb(var(--color-fg-secondary))]`} />
              ) : (
                <span
                  className={`${iconSize} flex items-center justify-center text-[10px] font-mono text-[rgb(var(--color-fg-tertiary))]`}
                >
                  {tech.slice(0, 2)}
                </span>
              )}
            </div>
          </Tooltip>
        );
      })}
      {techStack.length > limit && (
        <Tooltip content={`${techStack.length - limit} more technologies`} position="top">
          <div
            className={`${containerSize} rounded-full bg-white/5 border border-white/10 flex items-center justify-center`}
          >
            <span className="text-[10px] font-medium text-[rgb(var(--color-fg-tertiary))]">
              +{techStack.length - limit}
            </span>
          </div>
        </Tooltip>
      )}
    </div>
  );
});

function FeaturedProjectsClientComponent({
  enterpriseProjects,
  personalProjects,
}: FeaturedProjectsClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const variants = prefersReducedMotion ? {} : containerVariants;

  return (
    <>
      {/* Enterprise Projects */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Enterprise Projects</h3>
            <p className="text-sm text-[rgb(var(--color-fg-tertiary))]">
              Client work with measurable business impact
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={variants}
        >
          <ResponsiveShowMore initialCount={2} className="space-y-6">
            {enterpriseProjects.map((project, index) => (
              <StaggeredReveal key={project.id} index={index} prefersReducedMotion={prefersReducedMotion}>
                <EnterpriseTwoColumnCard project={project} />
              </StaggeredReveal>
            ))}
          </ResponsiveShowMore>
        </motion.div>
      </div>

      {/* Personal Projects */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Personal Projects</h3>
              <p className="text-sm text-[rgb(var(--color-fg-tertiary))]">
                Side projects and technical experiments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
            <Tooltip content="Grid view" position="top">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`min-w-[44px] min-h-[44px] p-2.5 rounded-md transition-all flex items-center justify-center ${viewMode === "grid"
                  ? "bg-white/10 text-white"
                  : "text-[rgb(var(--color-fg-tertiary))] hover:text-white"
                  }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </Tooltip>
            <Tooltip content="List view" position="top">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`min-w-[44px] min-h-[44px] p-2.5 rounded-md transition-all flex items-center justify-center ${viewMode === "list"
                  ? "bg-white/10 text-white"
                  : "text-[rgb(var(--color-fg-tertiary))] hover:text-white"
                  }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={variants}
        >
          <ResponsiveShowMore
            initialCount={3}
            className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}
          >
            {personalProjects.map((project, index) => (
              <StaggeredReveal key={project.id} index={index} prefersReducedMotion={prefersReducedMotion}>
                {viewMode === "grid" ? (
                  <PersonalProjectCard project={project} />
                ) : (
                  <PersonalProjectListItem project={project} />
                )}
              </StaggeredReveal>
            ))}
          </ResponsiveShowMore>
        </motion.div>
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 md:mt-16 flex justify-center"
      >
        <Button href="/projects" variant="primary" size="md">
          View all projects
          <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </Button>
      </motion.div>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
}

const EnterpriseTwoColumnCard = memo(function EnterpriseTwoColumnCard({
  project,
}: ProjectCardProps): ReactNode {
  const accent = CATEGORY_ACCENTS[project.category] ?? "cyan";
  const colors = glassAccentColors[accent];

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <LiquidGlassCard padding="none" className="overflow-hidden">
        <div className="grid md:grid-cols-12 gap-0">
          {/* Left Column: Metrics */}
          <div className="md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center">
            <div className="space-y-4">
              {project.metrics.slice(0, 4).map((metric, idx) => (
                <div key={metric.label} className="group/metric">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-bold tabular-nums" style={{ color: colors.text }}>
                      {metric.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-8 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${colors.text}, transparent)`,
                        opacity: 0.6,
                      }}
                    />
                    <span className="text-xs text-[rgb(var(--color-fg-tertiary))] uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                  {idx < project.metrics.slice(0, 4).length - 1 && <div className="h-px bg-white/5 mt-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-8 p-6 md:p-8 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.client && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  {project.client}
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-[rgb(var(--color-accent-cyan))] transition-colors">
              {project.title}
            </h3>

            <p className="text-[rgb(var(--color-fg-secondary))] mb-6 leading-relaxed line-clamp-3">
              {project.summary}
            </p>

            <div className="mb-6 mt-auto">
              <TechStackIcons techStack={project.techStack} limit={6} size="sm" />
            </div>

            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: colors.text }}>
              <TrendingUp className="w-4 h-4" />
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </Link>
  );
});

const PersonalProjectListItem = memo(function PersonalProjectListItem({
  project,
}: ProjectCardProps): ReactNode {
  const accent = CATEGORY_ACCENTS[project.category] ?? "purple";
  const colors = glassAccentColors[accent];

  return (
    <article className="block group">
      <LiquidGlassCard padding="none" className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <Link href={`/projects/${project.slug}`} className="relative w-full md:w-64 lg:w-80 h-48 md:h-auto flex-shrink-0 bg-[rgb(var(--color-bg-tertiary))] block" aria-label={`${project.title} - View project image`}>
            <Image
              src={project.image}
              alt={project.imageAlt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AOx"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, transparent, ${colors.bg})` }}
            />
          </Link>

          <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {project.category}
              </span>
            </div>

            <Link href={`/projects/${project.slug}`}>
              <h4 className="text-lg md:text-xl font-semibold text-white group-hover:text-[rgb(var(--color-accent-cyan))] transition-colors mb-2">
                {project.title}
              </h4>
            </Link>

            <p className="text-sm text-[rgb(var(--color-fg-secondary))] line-clamp-2 mb-4">
              {project.summary}
            </p>

            <div className="mb-4">
              <TechStackIcons techStack={project.techStack} limit={5} size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[30px] rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors"
                aria-label={`View ${project.title} details`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                View Project
              </Link>
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[30px] min-h-[30px] p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Icon icon="mdi:github" className="w-4 h-4 text-[rgb(var(--color-fg-secondary))]" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </article>
  );
});

const PersonalProjectCard = memo(function PersonalProjectCard({ project }: ProjectCardProps): ReactNode {
  const accent = CATEGORY_ACCENTS[project.category] ?? "purple";
  const colors = glassAccentColors[accent];

  return (
    <article className="block group h-full">
      <LiquidGlassCard className="h-full flex flex-col">
        <Link href={`/projects/${project.slug}`} className="relative aspect-[16/10] -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl block" aria-label={`${project.title} - View project image`}>
          <Image
            src={project.image}
            alt={project.imageAlt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AOx"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(to top, ${colors.bg}, transparent)` }}
          />
        </Link>

        <div className="flex-1 flex flex-col">
          <span
            className="self-start px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full mb-3"
            style={{ background: colors.bg, color: colors.text }}
          >
            {project.category}
          </span>

          <Link href={`/projects/${project.slug}`}>
            <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-[rgb(var(--color-accent-cyan))] transition-colors">
              {project.title}
            </h4>
          </Link>

          <p className="text-sm text-[rgb(var(--color-fg-secondary))] mb-4 line-clamp-2 flex-1">
            {project.summary}
          </p>

          <div className="mb-4">
            <TechStackIcons techStack={project.techStack} limit={4} size="sm" />
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[30px] min-h-[30px] p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Icon icon="mdi:github" className="w-4 h-4 text-[rgb(var(--color-fg-secondary))]" aria-hidden="true" />
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 min-h-[30px] rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors"
                aria-label={`View ${project.title} details`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>View</span>
              </Link>
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </article>
  );
});

export const FeaturedProjectsClient = memo(FeaturedProjectsClientComponent);
