"use client";

import { cn } from "@/lib/cn";
import { useActiveSection } from "@/hooks";
import { mainNavLinks } from "@/config";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";

interface NavigationProps {
  className?: string;
  variant?: "default" | "minimal";
}

export function Navigation({ className, variant = "default" }: NavigationProps): ReactNode {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [mounted, setMounted] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const sectionIds = mainNavLinks
    .filter((link) => link.isSection)
    .map((link) => link.href.replace("#", ""));

  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isHomePage || !activeSection || !navRef.current) {
      setPillStyle({ left: 0, width: 0 });
      return;
    }

    const activeLink = linkRefs.current.get(`#${activeSection}`);
    if (activeLink && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setPillStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection, mounted, isHomePage]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    if (href.startsWith("#") && isHomePage) {
      e.preventDefault();
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getIsActive = (link: { href: string; isSection?: boolean; label?: string }) => {
    if (!mounted) return false;

    // Check if current page matches a nav link (e.g., /projects, /certifications)
    const linkSection = link.href.replace("#", "").toLowerCase();
    if (pathname.startsWith(`/${linkSection}`)) {
      return true;
    }

    // On home page, check active section
    if (isHomePage && link.isSection) {
      return activeSection === link.href.replace("#", "");
    }

    return false;
  };

  const showPill = mounted && isHomePage && activeSection && pillStyle.width > 0;

  return (
    <nav
      ref={navRef}
      className={cn("flex items-center gap-1 relative", className)}
    >
      {variant === "default" ? (
        /* Inner pill container with glass effect */
        <div
          className="flex items-center gap-1 px-2 py-1.5 rounded-xl relative"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* Sliding active indicator */}
          {showPill && (
            <motion.span
              layoutId="navPill"
              className="absolute top-1 bottom-1 rounded-lg"
              style={{
                left: pillStyle.left + 8,
                width: pillStyle.width,
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          {mainNavLinks.map((link) => {
            const isActive = getIsActive(link);
            const finalHref = link.isSection ? `/${link.href}` : link.href;

            return (
              <Link
                key={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el);
                }}
                href={finalHref}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent-cyan))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg-primary))]",
                  isActive
                    ? "text-white"
                    : "text-[rgb(var(--color-fg-secondary))] hover:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Hover background */}
                <span
                  className={cn(
                    "absolute inset-0 rounded-lg transition-opacity duration-200",
                    isActive ? "opacity-0" : "opacity-0 hover:opacity-100"
                  )}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Minimal variant - no inner pill */
        <div className="flex items-center gap-8">
          {mainNavLinks.map((link) => {
            const isActive = getIsActive(link);
            const finalHref = link.isSection ? `/${link.href}` : link.href;

            return (
              <Link
                key={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href, el);
                }}
                href={finalHref}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "relative text-sm font-medium tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-bg-primary))]",
                  isActive
                    ? "text-cyan-400"
                    : "text-white/70 hover:text-cyan-400"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {/* Gradient underline - thicker in middle */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 transition-all duration-300 nav-gradient-underline",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
