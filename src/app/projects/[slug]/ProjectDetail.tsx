"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Building2,
  ArrowRight,
  X,
  ZoomIn,
} from "lucide-react";
import { Icon } from "@iconify/react";

import { getTechIcon } from "@/lib";
import { useReducedMotion } from "@/hooks";
import {
  Button,
  Breadcrumbs,
  RelatedContent,
  LiquidGlassCard,
} from "@/components/shared";
import { projects } from "@/data";
import type { Project } from "@/types";
import type { ReactNode } from "react";

interface ProjectDetailProps {
  project: Project;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export function ProjectDetail({ project }: ProjectDetailProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;
  const hasCaseStudy = project.caseStudy;
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; alt: string } | null>(null);
  const [shake, setShake] = useState(false);

  const handleBackdropClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3)
    .map((p) => {
      const base = {
        title: p.title,
        description: p.summary,
        href: `/projects/${p.slug}`,
        category: p.category,
      };
      if (p.type === "enterprise") {
        const enterprise: {
          title: string;
          description: string;
          href: string;
          category: string;
          techStack: string[];
          metrics: { value: string; label: string }[];
          client?: string;
        } = {
          ...base,
          techStack: p.techStack.slice(0, 4),
          metrics: p.metrics.slice(0, 2),
        };
        if (p.client) enterprise.client = p.client;
        return enterprise;
      }
      return {
        ...base,
        image: p.image,
      };
    });

  return (
    <div className="min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={variants}>

        {/* Hero Section - Full Width */}
        <motion.section variants={childVariants} className="relative pt-24 pb-16">
          {/* Background gradient for hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />

          <div className="container-custom relative">
            {/* Breadcrumbs */}
            <motion.div variants={childVariants} className="mb-8">
              <Breadcrumbs
                items={[
                  { label: "Projects", href: "/projects" },
                  { label: project.title },
                ]}
              />
            </motion.div>

            {/* Hero Content */}
            <div className="max-w-4xl mx-auto text-center">
              {/* Meta badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {project.client && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Building2 className="w-4 h-4" />
                    {project.client}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 capitalize">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
                {project.title}
              </h1>

              {/* Hook Statement */}
              {project.hook && (
                <p className="text-2xl md:text-3xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 font-light">
                  &ldquo;{project.hook}&rdquo;
                </p>
              )}

              {/* Summary */}
              <p className="text-xl md:text-2xl text-[rgb(var(--color-fg-secondary))] leading-relaxed mb-8">
                {project.summary}
              </p>

              {/* CTA Buttons */}
              {project.links && (
                <div className="flex flex-wrap justify-center gap-4">
                  {project.links.live && (
                    <Button href={project.links.live} external size="lg">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Live Project
                    </Button>
                  )}
                  {project.links.github && (
                    <Button href={project.links.github} external variant="outline" size="lg">
                      <Icon icon="mdi:github" className="w-5 h-5 mr-2" />
                      View Source Code
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Metrics Bar - Full Width */}
        <motion.section variants={childVariants} className="py-12 border-y border-white/5">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[rgb(var(--color-fg-secondary))] uppercase tracking-wider">
                    {metric.label}
                  </div>
                  {metric.context && (
                    <div className="text-xs text-[rgb(var(--color-fg-tertiary))] mt-1">
                      {metric.context}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Hero Image - For personal projects */}
        {project.type !== "enterprise" && project.image && (
          <motion.section variants={childVariants} className="py-12">
            <div className="container-custom">
              <div
                className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in group"
                onClick={() => setFullscreenImage({ src: project.image!, alt: project.imageAlt || project.title })}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Story Section - Challenge → Solution → Results */}
        {hasCaseStudy && (
          <motion.section variants={childVariants} className="py-16 md:py-24">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto space-y-20">

                {/* Challenge */}
                {hasCaseStudy.challenge && (
                  <motion.div variants={childVariants}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <AlertCircle className="w-7 h-7 text-red-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold">The Challenge</h2>
                        <p className="text-[rgb(var(--color-fg-tertiary))]">What we were up against</p>
                      </div>
                    </div>
                    <LiquidGlassCard padding="lg">
                      <ul className="space-y-4">
                        {hasCaseStudy.challenge.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-lg text-[rgb(var(--color-fg-secondary))]">
                            <span className="w-2 h-2 rounded-full bg-red-400 mt-3 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </LiquidGlassCard>
                  </motion.div>
                )}

                {/* Arrow connector */}
                {hasCaseStudy.challenge && hasCaseStudy.solution && (
                  <div className="flex justify-center">
                    <div className="w-px h-12 bg-gradient-to-b from-red-400/50 to-cyan-400/50" />
                  </div>
                )}

                {/* Solution */}
                {hasCaseStudy.solution && (
                  <motion.div variants={childVariants}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        <Lightbulb className="w-7 h-7 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold">The Solution</h2>
                        <p className="text-[rgb(var(--color-fg-tertiary))]">How we approached it</p>
                      </div>
                    </div>
                    <LiquidGlassCard padding="lg">
                      <ul className="space-y-4">
                        {hasCaseStudy.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-lg text-[rgb(var(--color-fg-secondary))]">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mt-3 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </LiquidGlassCard>
                  </motion.div>
                )}

                {/* Arrow connector */}
                {hasCaseStudy.solution && hasCaseStudy.results && (
                  <div className="flex justify-center">
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-400/50 to-emerald-400/50" />
                  </div>
                )}

                {/* Results */}
                {hasCaseStudy.results && (
                  <motion.div variants={childVariants}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <TrendingUp className="w-7 h-7 text-emerald-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold">The Results</h2>
                        <p className="text-[rgb(var(--color-fg-tertiary))]">What we achieved</p>
                      </div>
                    </div>
                    <LiquidGlassCard padding="lg" className="bg-gradient-to-br from-emerald-500/5 to-transparent">
                      <ul className="space-y-4">
                        {hasCaseStudy.results.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-lg text-[rgb(var(--color-fg-secondary))]">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </LiquidGlassCard>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Key Features */}
        {hasCaseStudy?.keyFeatures && hasCaseStudy.keyFeatures.length > 0 && (
          <motion.section variants={childVariants} className="py-16 border-t border-white/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <CheckCircle2 className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Key Features</h2>
                    <p className="text-[rgb(var(--color-fg-tertiary))]">What makes this project stand out</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {hasCaseStudy.keyFeatures.map((feature, idx) => (
                    <LiquidGlassCard key={idx} padding="md">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-[rgb(var(--color-fg-secondary))]">{feature}</p>
                      </div>
                    </LiquidGlassCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Lessons Learned */}
        {hasCaseStudy?.lessonsLearned && hasCaseStudy.lessonsLearned.length > 0 && (
          <motion.section variants={childVariants} className="py-16 border-t border-white/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Lightbulb className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Lessons Learned</h2>
                    <p className="text-[rgb(var(--color-fg-tertiary))]">Key takeaways and insights</p>
                  </div>
                </div>
                <LiquidGlassCard padding="lg" className="bg-gradient-to-br from-amber-500/5 to-transparent">
                  <ul className="space-y-4">
                    {hasCaseStudy.lessonsLearned.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg text-[rgb(var(--color-fg-secondary))]">
                        <Lightbulb className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </LiquidGlassCard>
              </div>
            </div>
          </motion.section>
        )}

        {/* Tech Stack */}
        <motion.section variants={childVariants} className="py-16 border-t border-white/5">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Tech Stack</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {project.techStack.map((tech) => {
                  const iconName = getTechIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all"
                    >
                      <Icon icon={iconName} className="w-6 h-6" />
                      <span className="text-sm font-medium">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonial */}
        {hasCaseStudy?.testimonial && (
          <motion.section variants={childVariants} className="py-16">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <LiquidGlassCard padding="lg" className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
                  <div className="text-5xl mb-6 opacity-30">&ldquo;</div>
                  <blockquote className="text-xl md:text-2xl text-[rgb(var(--color-fg-secondary))] italic mb-8 leading-relaxed">
                    {hasCaseStudy.testimonial.quote}
                  </blockquote>
                  <div>
                    <div className="font-semibold text-lg">{hasCaseStudy.testimonial.author}</div>
                    <div className="text-sm text-[rgb(var(--color-fg-tertiary))]">
                      {hasCaseStudy.testimonial.role}
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>
            </div>
          </motion.section>
        )}

        {/* Screenshots Gallery */}
        {project.type !== "enterprise" && hasCaseStudy?.screenshots && hasCaseStudy.screenshots.length > 0 && (
          <motion.section variants={childVariants} className="py-16 border-t border-white/5">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Screenshots</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {hasCaseStudy.screenshots.map((screenshot, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden bg-black/20 group cursor-zoom-in border border-white/5"
                    onClick={() => setFullscreenImage({ src: screenshot.src, alt: screenshot.alt })}
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {screenshot.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm text-white">{screenshot.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}


        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.section variants={childVariants} className="py-16 border-t border-white/5">
            <div className="container-custom">
              <RelatedContent items={relatedProjects} title="Related Projects" />
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section variants={childVariants} className="py-20">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <LiquidGlassCard padding="lg">
                <h3 className="text-3xl font-bold mb-4">Want similar results?</h3>
                <p className="text-lg text-[rgb(var(--color-fg-secondary))] mb-8">
                  Let&apos;s discuss how I can help your project succeed.
                </p>
                <Button href="/work-with-me" size="lg">
                  Start a Conversation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </LiquidGlassCard>
            </div>
          </div>
        </motion.section>

      </motion.div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            {/* Close button */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="fixed top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-red-500/20 transition-colors z-[101]"
            >
              <X className="w-6 h-6 text-white/70 hover:text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: shake ? [0, -10, 10, -10, 10, 0] : 0
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                x: { duration: 0.4, ease: "easeInOut" }
              }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fullscreenImage.src}
                alt={fullscreenImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
