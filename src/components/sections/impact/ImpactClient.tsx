"use client";

import { useState, useRef, memo } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { LiquidGlassCard, glassAccentColors } from "@/components/shared";
import { ArrowRight, Zap, Clock, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface BeforeAfterMetric {
  id: string;
  label: string;
  before: string;
  after: string;
  improvement: string;
  icon: string;
  accent: "cyan" | "emerald" | "purple" | "amber";
}

interface IndustryData {
  name: string;
  percentage: number;
  color: string;
  projects: number;
}

interface ImpactClientProps {
  beforeAfterMetrics: BeforeAfterMetric[];
  industryBreakdown: IndustryData[];
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

const ICON_MAP: Record<string, typeof Zap> = {
  Zap,
  Clock,
  TrendingUp,
};

interface BeforeAfterCardProps {
  item: BeforeAfterMetric;
}

const BeforeAfterCard = memo(function BeforeAfterCard({ item }: BeforeAfterCardProps): ReactNode {
  const IconComponent = ICON_MAP[item.icon] ?? ArrowRight;
  const colors = glassAccentColors[item.accent];

  return (
    <LiquidGlassCard className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: colors.bg }}
        >
          <IconComponent className="w-4 h-4" style={{ color: colors.text }} />
        </div>
        <span className="text-sm font-medium text-[rgb(var(--color-fg-primary))]">{item.label}</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="text-center flex-1">
          <div className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-tertiary))] mb-1">Before</div>
          <div className="text-2xl font-bold text-red-400/80">{item.before}</div>
        </div>

        <div className="flex items-center">
          <ArrowRight className="w-6 h-6" style={{ color: colors.text }} />
        </div>

        <div className="text-center flex-1">
          <div className="text-xs uppercase tracking-wider text-[rgb(var(--color-fg-tertiary))] mb-1">After</div>
          <div className="text-2xl font-bold" style={{ color: colors.text }}>{item.after}</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: colors.bg, color: colors.text }}
        >
          {item.improvement}
        </span>
      </div>
    </LiquidGlassCard>
  );
});

interface DonutChartProps {
  data: IndustryData[];
}

const DonutChart = memo(function DonutChart({ data }: DonutChartProps): ReactNode {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredIndex(index);
  };

  return (
    <div className="relative w-32 h-32 shrink-0">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="w-full h-full -rotate-90"
      >
        {data.map((industry, index) => {
          const prevTotal = data.slice(0, index).reduce((sum, i) => sum + i.percentage, 0);
          const circumference = 2 * Math.PI * 35;
          const offset = (prevTotal / 100) * circumference;
          const length = (industry.percentage / 100) * circumference;
          const isHovered = hoveredIndex === index;

          return (
            <circle
              key={industry.name}
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke={industry.color}
              strokeWidth={isHovered ? 14 : 12}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              className="transition-all duration-200 cursor-pointer"
              style={{
                filter: isHovered ? `drop-shadow(0 0 8px ${industry.color})` : "none",
                opacity: hoveredIndex !== null && !isHovered ? 0.5 : 1,
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-2xl font-bold text-[rgb(var(--color-fg-primary))]">10+</div>
          <div className="text-xs text-[rgb(var(--color-fg-tertiary))]">Projects</div>
        </div>
      </div>

      {hoveredIndex !== null && (
        <div
          className="absolute px-3 py-2 rounded-lg bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] whitespace-nowrap z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 10,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: data[hoveredIndex]!.color }}
            />
            <span className="text-sm font-medium text-white">{data[hoveredIndex]!.name}</span>
          </div>
          <div className="text-xs text-white/70 mt-1">
            {data[hoveredIndex]!.percentage}% • {data[hoveredIndex]!.projects} project{data[hoveredIndex]!.projects > 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
});

function ImpactClientComponent({ beforeAfterMetrics, industryBreakdown }: ImpactClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : containerVariants;
  const childVariants = prefersReducedMotion ? {} : itemVariants;

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className="mb-16"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {beforeAfterMetrics.map((item) => (
            <motion.div key={item.id} variants={childVariants}>
              <BeforeAfterCard item={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        className="max-w-lg mx-auto"
      >
        <LiquidGlassCard>
          <h3 className="text-lg font-bold mb-6 text-[rgb(var(--color-fg-primary))]">
            Industries Served
          </h3>
          <div className="flex items-center gap-8">
            <DonutChart data={industryBreakdown} />

            <div className="flex-1 grid grid-cols-2 gap-2">
              {industryBreakdown.map((industry) => (
                <div key={industry.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: industry.color }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs text-[rgb(var(--color-fg-primary))] truncate">{industry.name}</div>
                    <div className="text-xs text-[rgb(var(--color-fg-tertiary))]">{industry.projects} projects</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LiquidGlassCard>
      </motion.div>
    </>
  );
}

export const ImpactClient = memo(ImpactClientComponent);
