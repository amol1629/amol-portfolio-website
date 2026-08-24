"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { LiquidGlassCard } from "../glass"; import { glassAccentColors, type GlassAccent } from "./GlassPanel";
import { getTechIcon } from "@/lib";
import type { ReactNode } from "react";

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  image?: string;
  category?: string;
  techStack?: string[];
  metrics?: { value: string; label: string }[];
  client?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  className?: string;
}

const categoryAccents: Record<string, GlassAccent> = {
  frontend: "cyan",
  architecture: "purple",
  performance: "emerald",
  career: "amber",
  tools: "cyan",
  enterprise: "cyan",
  saas: "purple",
  ecommerce: "amber",
  fintech: "emerald",
  healthcare: "emerald",
  ai: "purple",
  "open-source": "emerald",
};

export function RelatedContent({
  title = "You might also like",
  items,
  className,
}: RelatedContentProps): ReactNode {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-[rgb(var(--color-fg-primary))] mb-6">
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const accent = item.category ? (categoryAccents[item.category.toLowerCase()] ?? "cyan") : "cyan";
          const colors = glassAccentColors[accent];
          return (
          <Link key={item.href} href={item.href} className="group">
            <LiquidGlassCard padding="none" className="h-full overflow-hidden">
              {item.image ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (item.techStack || item.metrics || item.client) && (
                <div className="p-4 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                  {item.client && (
                    <div className="text-xs text-[rgb(var(--color-fg-tertiary))] mb-3">
                      Client: <span className="text-[rgb(var(--color-fg-secondary))]">{item.client}</span>
                    </div>
                  )}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="flex gap-4 mb-3">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <span className="text-lg font-bold" style={{ color: colors.text }}>{metric.value}</span>
                          <span className="text-xs text-[rgb(var(--color-fg-tertiary))] ml-1">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => {
                        const iconName = getTechIcon(tech);
                        return (
                          <span key={tech} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-white/5 rounded border border-white/5 text-[rgb(var(--color-fg-secondary))]">
                            <Icon icon={iconName} className="w-3 h-3" />
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              <div className="p-4">
                {item.category && (
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.text }}>
                    {item.category}
                  </span>
                )}
                <h4 className="font-semibold mt-1 mb-2 text-[rgb(var(--color-fg-primary))] transition-colors line-clamp-2 group-hover:text-[var(--hover-color)]" style={{ "--hover-color": colors.text } as React.CSSProperties}>
                  {item.title}
                </h4>
                <p className="text-sm text-[rgb(var(--color-fg-tertiary))] line-clamp-2">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm" style={{ color: colors.text }}>
                  Read more
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </LiquidGlassCard>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
