"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { SectionWrapper, LiquidGlassCard, Badge, EmptyState, glassAccentColors } from "@/components/shared";
import { projects } from "@/data";
import type { Project } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { FolderOpen, ArrowRight, Building2, Briefcase, Code2, Layers, TrendingUp, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import {
  TECH_ICON_MAP,
  CATEGORY_ACCENTS,
  INITIAL_VISIBLE_COUNT,
  PROJECT_COUNTS,
  PROJECTS_PAGE_HEADING,
  type FilterOption,
} from "./projects.data";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const FILTER_TABS = [
  { key: "all" as const, label: "All Projects", icon: Layers },
  { key: "enterprise" as const, label: "Enterprise", icon: Briefcase },
  { key: "personal" as const, label: "Personal", icon: Code2 },
] as const;

interface FilterTabsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const FilterTabs = memo(function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps): ReactNode {
  return (
    <div className="flex justify-center gap-2 flex-wrap mb-12">
      {FILTER_TABS.map(({ key, label, icon: TabIcon }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === key
              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              : "bg-white/[0.02] text-[rgb(var(--color-fg-secondary))] border border-white/10 hover:bg-white/[0.05] hover:border-white/20"
          }`}
        >
          <TabIcon className="w-4 h-4" />
          {label}
          <span className="ml-1 px-2 py-0.5 rounded-full bg-white/10 text-xs">{PROJECT_COUNTS[key]}</span>
        </button>
      ))}
    </div>
  );
});

interface FeaturedSpotlightProps {
  project: Project;
  variants: Variants | Record<string, never>;
}

const FeaturedSpotlight = memo(function FeaturedSpotlight({ project, variants }: FeaturedSpotlightProps): ReactNode {
  const accent = CATEGORY_ACCENTS[project.category] ?? "cyan";
  const colors = glassAccentColors[accent];

  return (
    <motion.div variants={variants} className="mb-12">
      <Link href={`/projects/${project.slug}`} className="block group">
        <LiquidGlassCard className="overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" padding="none">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="accent">Featured</Badge>
                <Badge variant="default">{project.category}</Badge>
                {project.client && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-[rgb(var(--color-fg-tertiary))]">
                    <Building2 className="w-3.5 h-3.5" />
                    {project.client}
                  </span>
                )}
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-[rgb(var(--color-accent-cyan))] transition-colors">
                {project.title}
              </h2>

              <p className="text-[rgb(var(--color-fg-secondary))] mb-6 leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-6 mb-6">
                {project.metrics.slice(0, 4).map((metric) => (
                  <div key={metric.label}>
                    <div className="text-2xl font-bold" style={{ color: colors.text }}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-[rgb(var(--color-fg-tertiary))]">{metric.label}</div>
                  </div>
                ))}
              </div>

              {project.type !== "enterprise" && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 6).map((tech) => {
                    const iconName = TECH_ICON_MAP[tech.toLowerCase()] ?? "mdi:code-tags";
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-white/[0.03] rounded-lg border border-white/5 text-[rgb(var(--color-fg-secondary))]"
                      >
                        <Icon icon={iconName} className="w-4 h-4" />
                        {tech}
                      </span>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center gap-2 font-medium group-hover:gap-3 transition-all" style={{ color: colors.text }}>
                <TrendingUp className="w-4 h-4" />
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {project.type === "enterprise" ? (
              <div className="relative min-h-[280px] lg:min-h-[400px] order-1 lg:order-2 flex items-center justify-center p-8 lg:p-10">
                <div className="w-full max-w-md space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-tertiary))] mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map((tech) => {
                        const iconName = TECH_ICON_MAP[tech.toLowerCase()] ?? "mdi:code-tags";
                        return (
                          <div
                            key={tech}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                          >
                            <Icon icon={iconName} className="w-5 h-5" style={{ color: colors.text }} />
                            <span className="text-sm font-medium text-[rgb(var(--color-fg-secondary))]">{tech}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {project.role && (
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-tertiary))] mb-1">Role</div>
                      <div className="text-sm font-medium text-white">{project.role}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : project.image ? (
              <div className="relative min-h-[280px] lg:min-h-[400px] order-1 lg:order-2 bg-[rgb(var(--color-bg-tertiary))]">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
              </div>
            ) : null}
          </div>
        </LiquidGlassCard>
      </Link>
    </motion.div>
  );
});

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps): ReactNode {
  const isEnterprise = project.type === "enterprise";
  const showImage = !isEnterprise && project.image;

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full group">
      <LiquidGlassCard className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" padding="none">
        {showImage && (
          <div className="relative h-48 overflow-hidden bg-[rgb(var(--color-bg-tertiary))]">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

            {project.metrics.length > 0 && (
              <div className="absolute bottom-3 left-4 right-4 flex gap-4">
                {project.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="text-white">
                    <span className="text-lg font-bold">{metric.value}</span>
                    <span className="text-xs text-white/70 ml-1">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="default">{project.category}</Badge>
            {isEnterprise && project.client && (
              <span className="inline-flex items-center gap-1 text-xs text-[rgb(var(--color-fg-tertiary))]">
                <Building2 className="w-3 h-3" />
                {project.client}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-[rgb(var(--color-accent-cyan))] transition-colors line-clamp-2">
            {project.title}
          </h3>

          <p className="text-sm text-[rgb(var(--color-fg-secondary))] mb-4 line-clamp-2 flex-1">
            {project.summary}
          </p>

          {isEnterprise && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-white/5">
              {project.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label}>
                  <span className="text-lg font-bold text-cyan-400">{metric.value}</span>
                  <span className="text-xs text-[rgb(var(--color-fg-secondary))] ml-1.5">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack.slice(0, 4).map((tech) => {
              const iconName = TECH_ICON_MAP[tech.toLowerCase()] ?? "mdi:code-tags";
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-white/[0.03] rounded border border-white/5 text-[rgb(var(--color-fg-secondary))]"
                >
                  <Icon icon={iconName} className="w-3 h-3" />
                  {tech}
                </span>
              );
            })}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-mono text-[rgb(var(--color-fg-tertiary))]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-white/5 text-sm font-medium text-cyan-400 group-hover:gap-2.5 transition-all">
            View Project
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </LiquidGlassCard>
    </Link>
  );
});

function ProjectsContentComponent(): ReactNode {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [showAll, setShowAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;

  const { featuredProject, enterpriseProjects, personalProjects } = useMemo(() => {
    let filtered = projects;
    if (activeFilter !== "all") {
      filtered = projects.filter((p) => p.type === activeFilter);
    }

    const featured = filtered.find((p) => p.featured);
    const others = filtered.filter((p) => p.id !== featured?.id);

    const enterprise = others.filter((p) => p.type === "enterprise");
    const personal = others.filter((p) => p.type === "personal");

    return { featuredProject: featured, enterpriseProjects: enterprise, personalProjects: personal };
  }, [activeFilter]);

  const visibleEnterprise = activeFilter === "all"
    ? enterpriseProjects
    : (showAll ? enterpriseProjects : enterpriseProjects.slice(0, INITIAL_VISIBLE_COUNT));
  const visiblePersonal = showAll ? personalProjects : personalProjects.slice(0, INITIAL_VISIBLE_COUNT);

  const handleFilterChange = useCallback((filter: FilterOption) => {
    setActiveFilter(filter);
    setShowAll(false);
  }, []);

  return (
    <SectionWrapper className="pt-24 pb-20">
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400"
        >
          {PROJECTS_PAGE_HEADING.label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {PROJECTS_PAGE_HEADING.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[rgb(var(--color-fg-secondary))] max-w-2xl mx-auto"
        >
          {PROJECTS_PAGE_HEADING.description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </motion.div>

      <AnimatePresence mode="wait">
        {featuredProject || enterpriseProjects.length > 0 || personalProjects.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={variants}
          >
            {featuredProject && (
              <FeaturedSpotlight project={featuredProject} variants={childVariants} />
            )}

            {/* Enterprise Projects Section */}
            {enterpriseProjects.length > 0 && (
              <div className={activeFilter === "all" ? "mb-16" : ""}>
                {activeFilter === "all" && (
                  <motion.h2
                    variants={childVariants}
                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                  >
                    <Briefcase className="w-6 h-6 text-cyan-400" />
                    Enterprise Projects
                  </motion.h2>
                )}
                <motion.div
                  variants={variants}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {visibleEnterprise.map((project) => (
                      <motion.div
                        key={project.id}
                        variants={childVariants}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                {activeFilter === "enterprise" && enterpriseProjects.length > INITIAL_VISIBLE_COUNT && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-8"
                  >
                    <button
                      type="button"
                      onClick={() => setShowAll((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-white hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <span>{showAll ? "Show Less" : `Show ${enterpriseProjects.length - INITIAL_VISIBLE_COUNT} More`}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Personal Projects Section */}
            {personalProjects.length > 0 && (
              <div>
                {activeFilter === "all" && (
                  <motion.h2
                    variants={childVariants}
                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                  >
                    <Code2 className="w-6 h-6 text-purple-400" />
                    Personal Projects
                  </motion.h2>
                )}
                <motion.div
                  variants={variants}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {visiblePersonal.map((project) => (
                      <motion.div
                        key={project.id}
                        variants={childVariants}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                {(activeFilter === "personal" || activeFilter === "all") && personalProjects.length > INITIAL_VISIBLE_COUNT && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-8"
                  >
                    <button
                      type="button"
                      onClick={() => setShowAll((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-white hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <span>{showAll ? "Show Less" : `Show ${personalProjects.length - INITIAL_VISIBLE_COUNT} More`}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <EmptyState
            title="No projects found"
            description="Try adjusting your filter criteria."
            icon={<FolderOpen className="w-12 h-12" />}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

export const ProjectsContent = memo(ProjectsContentComponent);
