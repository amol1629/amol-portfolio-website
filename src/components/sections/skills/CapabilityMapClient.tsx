"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LiquidGlassCard, glassAccentColors, ResponsiveShowMore } from "@/components/shared";
import { Icon } from "@iconify/react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { CapabilityData } from "./capability.data";

interface CapabilityMapClientProps {
  capabilities: CapabilityData[];
}

function CapabilityMapClientComponent({ capabilities }: CapabilityMapClientProps): ReactNode {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <ResponsiveShowMore initialCount={3} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {capabilities.map((capability, index) => (
        <motion.div
          key={capability.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <CapabilityCard
            capability={capability}
            isExpanded={expandedId === capability.id}
            onToggle={() => setExpandedId(expandedId === capability.id ? null : capability.id)}
          />
        </motion.div>
      ))}
    </ResponsiveShowMore>
  );
}

interface CapabilityCardProps {
  capability: CapabilityData;
  isExpanded: boolean;
  onToggle: () => void;
}

const CapabilityCard = memo(function CapabilityCard({ capability, isExpanded, onToggle }: CapabilityCardProps): ReactNode {
  const colors = glassAccentColors[capability.accent];

  return (
    <LiquidGlassCard padding="md" onClick={onToggle} className="overflow-visible">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: colors.bg }}
        >
          <Icon icon={capability.icon} className="w-6 h-6" style={{ color: colors.text }} />
        </div>
        <ChevronRight
          className={`w-5 h-5 text-[rgb(var(--color-fg-tertiary))] transition-transform duration-300 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </div>

      <h3 className="text-lg font-bold mb-2 text-[rgb(var(--color-fg-primary))]">
        {capability.title}
      </h3>
      <p className="text-sm text-[rgb(var(--color-fg-secondary))] mb-4 line-clamp-2">
        {capability.description}
      </p>

      {capability.metrics && (
        <div
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: colors.bg, color: colors.text }}
        >
          {capability.metrics}
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-visible"
          >
            <div className="pt-6 mt-6 border-t border-white/5">
              <div className="mb-4">
                <h4 className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-tertiary))] mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-3">
                  {capability.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="relative group/skill flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
                    >
                      <Icon icon={skill.icon} className="w-5 h-5" />
                      <span className="text-sm text-[rgb(var(--color-fg-secondary))]">
                        {skill.name}
                      </span>
                      {(skill.years || skill.level) && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-xl border border-white/25 shadow-[0_0_20px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/skill:opacity-100 group-hover/skill:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                          <div className="text-xs font-medium flex items-center gap-1.5">
                            {skill.level && (
                              <span
                                className={
                                  skill.level === "Expert"
                                    ? "text-emerald-400"
                                    : skill.level === "Advanced"
                                      ? "text-cyan-400"
                                      : "text-amber-400"
                                }
                              >
                                {skill.level}
                              </span>
                            )}
                            {skill.years && (
                              <span className="text-white/80">({skill.years}+ years)</span>
                            )}
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-white/10" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-tertiary))] mb-2">
                  See it in action
                </h4>
                <div className="space-y-2">
                  {capability.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group/link"
                    >
                      <span className="text-sm text-[rgb(var(--color-fg-secondary))] group-hover/link:text-[rgb(var(--color-fg-primary))]">
                        {project.name}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        style={{ color: colors.text }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LiquidGlassCard>
  );
});

export const CapabilityMapClient = memo(CapabilityMapClientComponent);
