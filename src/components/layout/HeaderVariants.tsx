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

// ============================================
// VARIANT 1: Floating Center Pill (Current)
// Clean minimal with centered nav in glass pill
// ============================================
export function HeaderVariant1(): ReactNode {
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
            background: isScrolled ? "rgba(15, 23, 42, 0.8)" : "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.3) 50%, transparent 90%)" }}
          />
          <div className="absolute inset-x-0 -bottom-px h-[1px] rounded-b-2xl pointer-events-none opacity-50"
            style={{ background: "linear-gradient(90deg, transparent 20%, rgba(6, 182, 212, 0.5) 35%, rgba(139, 92, 246, 0.5) 65%, transparent 80%)" }}
          />

          <Link href="/" className="group relative text-lg font-bold tracking-tight shrink-0">
            <motion.span className="gradient-text relative z-10" whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              {siteConfig.name}
            </motion.span>
          </Link>

          <Navigation className="hidden min-[971px]:flex absolute left-1/2 -translate-x-1/2" />

          <div className="flex items-center gap-4 shrink-0">
            <div className="relative hidden sm:block group">
              <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }} />
              <Button href={ctaLink.href} size="sm" className="relative">{ctaLink.label}</Button>
            </div>
            <MobileNavTrigger className="max-[970px]:flex hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================
// VARIANT 2: Split Glass Panels
// Logo in left pill, nav in center pill, CTA in right pill
// ============================================
export function HeaderVariant2(): ReactNode {
  const isScrolled = useIsScrolled();

  const panelStyle = {
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(20px) saturate(150%)",
    WebkitBackdropFilter: "blur(20px) saturate(150%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
  };

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
        <div className="flex items-center justify-between gap-4">
          {/* Logo Panel */}
          <motion.div
            className="px-5 py-2.5 rounded-full"
            style={panelStyle}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="gradient-text">{siteConfig.name}</span>
            </Link>
          </motion.div>

          {/* Center Nav Panel */}
          <div className="hidden min-[971px]:block px-2 py-1.5 rounded-full" style={panelStyle}>
            <Navigation />
          </div>

          {/* CTA Panel */}
          <div className="flex items-center gap-3">
            <motion.div
              className="hidden sm:block px-1 py-1 rounded-full"
              style={panelStyle}
              whileHover={{ scale: 1.02 }}
            >
              <Button href={ctaLink.href} size="sm" className="rounded-full">
                {ctaLink.label}
              </Button>
            </motion.div>
            <MobileNavTrigger className="max-[970px]:flex hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================
// VARIANT 3: Underline Minimal
// No background, just clean links with animated underline
// ============================================
export function HeaderVariant3(): ReactNode {
  const isScrolled = useIsScrolled();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-500",
        isScrolled ? "py-4" : "py-6"
      )}
      style={{
        background: isScrolled ? "rgba(0, 0, 0, 0.5)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo with dot accent */}
          <Link href="/" className="group flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
            <span className="text-white group-hover:text-cyan-400 transition-colors">{siteConfig.name}</span>
          </Link>

          {/* Minimal nav links */}
          <nav className="hidden min-[971px]:flex items-center gap-8">
            <Navigation />
          </nav>

          {/* Ghost CTA */}
          <div className="flex items-center gap-4">
            <Link
              href={ctaLink.href}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors group"
            >
              {ctaLink.label}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <MobileNavTrigger className="max-[970px]:flex hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================
// VARIANT 4: Dock Style (macOS inspired)
// Floating dock at bottom or top with icon-like items
// ============================================
export function HeaderVariant4(): ReactNode {
  const isScrolled = useIsScrolled();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-[var(--z-header)] py-4"
    >
      <div className="container-custom flex justify-center">
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{
            background: "rgba(30, 30, 30, 0.8)",
            backdropFilter: "blur(30px) saturate(200%)",
            WebkitBackdropFilter: "blur(30px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
          animate={{ scale: isScrolled ? 0.95 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 transition-colors"
          >
            <span className="text-lg font-bold gradient-text">{siteConfig.name.split(' ')[0]}</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10" />

          {/* Nav items as dock icons */}
          <Navigation className="hidden min-[971px]:flex" />

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 hidden sm:block" />

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
            <Link
              href={ctaLink.href}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </motion.div>

          <MobileNavTrigger className="max-[970px]:flex hidden" />
        </motion.div>
      </div>
    </motion.header>
  );
}

// ============================================
// VARIANT 5: Premium Glossy Glass
// Simple, elegant, glossy transparent navbar
// ============================================
export function HeaderVariant5(): ReactNode {
  const isScrolled = useIsScrolled();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-500 animate-[slideDown_0.6s_ease-out]",
        isScrolled ? "py-2" : "py-3"
      )}
    >
      <div
        className="relative flex items-center justify-between px-8 md:px-12 py-4"
        style={{
          background: isScrolled
            ? "rgba(10, 15, 30, 0.6)"
            : "rgba(10, 15, 30, 0.3)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Logo with signature font */}
        <Link href="/" className="group relative">
          <span
            className="text-3xl font-normal bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
            style={{
              fontFamily: "var(--font-signature), cursive",
            }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Nav links */}
        <Navigation className="hidden min-[1300px]:flex" variant="minimal" />

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href={ctaLink.href}
            className="hidden sm:block relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          >
            {ctaLink.label}
          </Link>
          <MobileNavTrigger className="flex min-[1300px]:hidden" />
        </div>
      </div>
    </header>
  );
}
