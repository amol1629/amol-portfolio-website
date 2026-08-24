"use client";

import { cn } from "@/lib/cn";
import { MagneticElement } from "@/components/effects";
import Link from "next/link";
import type { ReactNode } from "react";
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const variantClasses = {
  primary:
    "bg-[linear-gradient(135deg,rgba(6,182,212,0.15),rgba(139,92,246,0.15))] text-white border border-white/15 hover:border-white/25 hover:bg-[linear-gradient(135deg,rgba(6,182,212,0.25),rgba(139,92,246,0.25))]",
  secondary:
    "bg-[rgba(15,23,42,0.8)] text-white/90 border border-white/10 hover:bg-[rgba(20,30,50,0.9)] hover:border-cyan-500/40 hover:text-white",
  ghost:
    "bg-transparent text-white/80 hover:bg-white/5 hover:text-white",
  outline:
    "bg-[linear-gradient(135deg,rgba(6,182,212,0.15),rgba(139,92,246,0.15))] text-white border border-white/15 hover:border-white/25 hover:bg-[linear-gradient(135deg,rgba(6,182,212,0.25),rgba(139,92,246,0.25))]",
};

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  external,
  target,
  rel,
  disabled,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps): ReactNode {
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    const isExternal = external || target === "_blank";

    if (isExternal) {
      return (
        <MagneticElement strength={0.2} radius={80}>
          <a
            href={href}
            className={classes}
            target={target ?? "_blank"}
            rel={rel ?? "noopener noreferrer"}
            aria-label={ariaLabel}
          >
            {children}
          </a>
        </MagneticElement>
      );
    }

    return (
      <MagneticElement strength={0.2} radius={80}>
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      </MagneticElement>
    );
  }

  return (
    <MagneticElement strength={disabled ? 0 : 0.2} radius={80}>
      <button
        type={type}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    </MagneticElement>
  );
}
