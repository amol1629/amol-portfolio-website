"use client";

import { memo } from "react";
import { useReducedMotion } from "@/hooks";
import { Button } from "@/components/shared";
import type { ReactNode } from "react";

interface HeroContent {
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  trustLine: string;
}

interface HeroClientProps {
  content: HeroContent;
}

function HeroClientComponent({ content }: HeroClientProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const { headline, description, cta, trustLine } = content;

  const baseClasses = prefersReducedMotion ? "" : "animate-[fadeUp_0.6s_ease-out_both]";

  return (
    <div className="text-center">
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight mb-6">
        <span
          className={`block text-[rgb(var(--color-fg-primary))] ${baseClasses}`}
          style={prefersReducedMotion ? {} : { animationDelay: "0.1s" }}
        >
          {headline.line1}
        </span>
        <span
          className={`block hero-gradient-text hero-gradient-text--animated ${baseClasses}`}
          style={prefersReducedMotion ? {} : { animationDelay: "0.2s" }}
        >
          {headline.line2}
        </span>
      </h1>

      <p
        className={`text-lg md:text-xl text-[rgb(var(--color-fg-secondary))] max-w-2xl mx-auto mb-10 leading-relaxed ${baseClasses}`}
        style={prefersReducedMotion ? {} : { animationDelay: "0.3s" }}
      >
        {description}
      </p>

      <div
        className={`flex flex-wrap justify-center gap-4 mb-12 ${baseClasses}`}
        style={prefersReducedMotion ? {} : { animationDelay: "0.4s" }}
      >
        <Button href={cta.primary.href} size="lg">
          {cta.primary.label}
        </Button>
        <Button href={cta.secondary.href} variant="outline" size="lg">
          {cta.secondary.label}
        </Button>
      </div>

      <p
        className={`text-sm text-[rgb(var(--color-fg-tertiary))] uppercase tracking-widest ${baseClasses}`}
        style={prefersReducedMotion ? {} : { animationDelay: "0.5s" }}
      >
        {trustLine}
      </p>
    </div>
  );
}

export const HeroClient = memo(HeroClientComponent);
