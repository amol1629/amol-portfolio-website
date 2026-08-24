"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/hooks";
import { mainNavLinks, ctaLink, socialLinks, siteConfig } from "@/config";
import Link from "next/link";
import Image from "next/image";
import { X, Home, User, Briefcase, Code2, FolderKanban, Award, Mail, Sparkles } from "lucide-react";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

const socialIconMap: Record<string, string> = {
  github: "mdi:github",
  linkedin: "mdi:linkedin",
  email: "mdi:email-outline",
};

const navIcons: Record<string, typeof Home> = {
  Home,
  About: User,
  Services: Briefcase,
  Skills: Code2,
  Projects: FolderKanban,
  Experience: Award,
  Certifications: Award,
  Contact: Mail,
};

interface MobileNavTriggerProps {
  className?: string;
}

export function MobileNavTrigger({ className }: MobileNavTriggerProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openNav = useCallback(() => setIsOpen(true), []);
  const closeNav = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    // Store scroll position
    const scrollY = window.scrollY;

    // Lock body scroll
    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    document.body.classList.add('mobile-nav-open');

    // Prevent touchmove on body (but not on nav panel)
    const preventScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navPanel = document.querySelector('[data-mobile-nav-panel]');
      if (navPanel && !navPanel.contains(target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.classList.remove('mobile-nav-open');
      document.removeEventListener('touchmove', preventScroll);
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeNav();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeNav]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 1300 && isOpen) closeNav();
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, closeNav]);

  return (
    <>
      <button
        onClick={openNav}
        className={cn(
          "flex flex-col justify-center items-center w-11 h-11 gap-1.5",
          "hover:opacity-80 transition-opacity",
          className
        )}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <span className="block w-5 h-0.5 bg-current rounded-full" />
        <span className="block w-5 h-0.5 bg-current rounded-full" />
        <span className="block w-3.5 h-0.5 bg-current rounded-full self-start ml-[10px]" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && <MobileNavOverlay onClose={closeNav} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

interface MobileNavOverlayProps {
  onClose: () => void;
}

function MobileNavOverlay({ onClose }: MobileNavOverlayProps): ReactNode {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const sectionIds = mainNavLinks
    .filter((link) => link.isSection)
    .map((link) => link.href.replace("#", ""));

  const activeSection = useActiveSection(sectionIds);

  const getIsActive = (link: { href: string; isSection?: boolean }) => {
    const linkSection = link.href.replace("#", "").toLowerCase();
    if (pathname.startsWith(`/${linkSection}`)) {
      return true;
    }
    if (isHomePage && link.isSection) {
      return activeSection === link.href.replace("#", "");
    }
    return false;
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-sm"
      />

      {/* Slide-in Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        data-mobile-nav-panel
        className="fixed top-0 right-0 bottom-0 z-[99999] w-full max-w-[320px] bg-[#0a0a14] border-l border-white/10 flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header with Profile */}
        <div className="relative p-6 border-b border-white/10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-red-500/50 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-[#0a0a14]">
              <Image
                src="/images/profile.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div>
              <h2
                className="text-2xl font-normal bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-signature), cursive" }}
              >
                {siteConfig.name}
              </h2>
              <p className="text-xs text-white/50 mt-0.5">  Senior Frontend Engineer & UI Architect
</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto overscroll-contain py-4 px-3 touch-pan-y">
          <ul className="space-y-1">
            {mainNavLinks.map((link, index) => {
              const finalHref = link.isSection ? `/${link.href}` : link.href;
              const IconComponent = navIcons[link.label] ?? Sparkles;
              const isActive = getIsActive(link);

              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={finalHref}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-200",
                      isActive
                        ? "text-white border-cyan-500/30"
                        : "text-white/80 hover:text-white border-transparent hover:border-white/10"
                    )}
                    style={isActive ? {
                      background: "linear-gradient(to right, color-mix(in oklab, lab(37 -29.01 -11.33 / 0.61) 15%, transparent), color-mix(in oklab, lab(37 -29.01 -11.33 / 0.61) 15%, transparent))"
                    } : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isActive ? "bg-cyan-500/20" : "bg-white/5 group-hover:bg-cyan-500/20"
                    )}>
                      <IconComponent className="w-4 h-4 text-cyan-400" />
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-4">
          {/* CTA Button - matches desktop style */}
          <Link
            href={ctaLink.href}
            onClick={onClose}
            className="block w-full py-3 text-center text-sm font-medium rounded-full transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
            }}
          >
            {ctaLink.label}
          </Link>

          {/* Social Links - same style as About section */}
          <div className="flex justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
                aria-label={social.label}
              >
                <Icon
                  icon={socialIconMap[social.platform] ?? "mdi:link"}
                  className="w-5 h-5 text-[rgb(var(--color-fg-secondary))] group-hover:text-cyan-400 transition-colors"
                />
              </a>
            ))}
          </div>

          {/* Mini Footer */}
          <p className="text-center text-[10px] text-white/30">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </motion.div>
    </>
  );
}

