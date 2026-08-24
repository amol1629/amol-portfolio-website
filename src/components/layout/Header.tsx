"use client";

import { cn } from "@/lib/cn";
import { useIsScrolled } from "@/hooks";
import { Navigation } from "./Navigation";
import { MobileNavTrigger } from "./MobileNav";
import { Button } from "@/components/shared";
import { siteConfig, ctaLink } from "@/config";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

export function Header(): ReactNode {
  const isScrolled = useIsScrolled();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-500",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-custom">
        <div
          className="relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300"
          style={{
            background: isScrolled
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Top edge glow */}
          <div
            className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.3) 50%, transparent 90%)",
            }}
          />

          {/* Accent glow at bottom */}
          <div
            className="absolute inset-x-0 -bottom-px h-[1px] rounded-b-2xl pointer-events-none opacity-50"
            style={{
              background: "linear-gradient(90deg, transparent 20%, rgba(6, 182, 212, 0.5) 35%, rgba(139, 92, 246, 0.5) 65%, transparent 80%)",
            }}
          />

          {/* Logo */}
          <Link
            href="/"
            className="group relative text-lg font-bold tracking-tight shrink-0"
            aria-label={`${siteConfig.name} - Home`}
          >
            <motion.span
              className="gradient-text relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {siteConfig.name}
            </motion.span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/30 to-[#8b5cf6]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Center Navigation - Floating pill style */}
          <Navigation className="hidden min-[1300px]:flex absolute left-1/2 -translate-x-1/2" />

          {/* Right side - CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative hidden sm:block group">
              {/* Glow effect behind button */}
              <div
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                }}
              />
              <Button
                href={ctaLink.href}
                size="sm"
                className="relative"
              >
                {ctaLink.label}
              </Button>
            </div>
            <MobileNavTrigger className="!flex min-[1300px]:!hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
