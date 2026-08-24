"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard, glassAccentColors, ResponsiveShowMore } from "@/components/shared";
import { ArrowRightLeft, Layers, Zap, Users, LayoutGrid, Code, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { ServiceData } from "./services.data";

const serviceIcons: Record<string, LucideIcon> = {
  arrowRightLeft: ArrowRightLeft,
  layers: Layers,
  zap: Zap,
  users: Users,
  layoutGrid: LayoutGrid,
  code: Code,
};

interface ServicesClientProps {
  services: ServiceData[];
}

function ServicesClientComponent({ services }: ServicesClientProps): ReactNode {
  const renderServiceCard = (service: ServiceData, index: number) => {
    const Icon = serviceIcons[service.iconKey] ?? Code;
    const colors = glassAccentColors[service.accent];

    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <LiquidGlassCard className="h-full">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{ background: colors.bg }}
          >
            <Icon className="w-6 h-6" style={{ color: colors.text }} aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
          <p className="text-sm text-[rgb(var(--color-fg-secondary))] mb-4">
            {service.description}
          </p>
          {service.outcomes.length > 0 && (
            <ul className="space-y-2">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="text-sm text-[rgb(var(--color-fg-secondary))] flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: colors.text }}
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          )}
        </LiquidGlassCard>
      </motion.div>
    );
  };

  return (
    <div className="mb-12">
      <ResponsiveShowMore initialCount={3} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => renderServiceCard(service, index))}
      </ResponsiveShowMore>
    </div>
  );
}

export const ServicesClient = memo(ServicesClientComponent);
