"use client";

import { cn } from "@/lib/cn";
import { siteConfig, footerNavLinks, socialLinks } from "@/config";
import { Tooltip } from "@/components/shared";
import { Icon } from "@iconify/react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const iconMap: Record<string, string> = {
  linkedin: "mdi:linkedin",
  github: "mdi:github",
};

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps): ReactNode {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn("relative", className)}
      style={{
        background: "rgb(0 0 0 / 49%)",
        backdropFilter: "blur(3px) saturate(150%)",
        WebkitBackdropFilter: "blur(3px) saturate(150%)",
      }}
    >
      {/* Gradient top border - thin at edges, thicker in middle */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 20%, rgba(139,92,246,0.8) 50%, rgba(6,182,212,0.5) 80%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] blur-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 30%, rgba(139,92,246,0.8) 50%, rgba(6,182,212,0.6) 70%, transparent 100%)",
        }}
      />

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-block text-3xl md:text-4xl font-normal hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-signature), cursive" }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 text-[rgb(var(--color-fg-secondary))] max-w-sm">
              {siteConfig.title}. Helping organizations build exceptional
              digital experiences.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4 text-sm text-[rgb(var(--color-fg-tertiary))]">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Based in India (IST)</span>
            </div>

            {/* Social Icons - same style as About section */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const iconName = iconMap[social.platform] ?? "mdi:link";
                return (
                  <Tooltip key={social.platform} content={social.label} position="top">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
                      aria-label={social.label}
                    >
                      <Icon
                        icon={iconName}
                        className="w-5 h-5 text-[rgb(var(--color-fg-secondary))] group-hover:text-cyan-400 transition-colors"
                      />
                    </a>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[rgb(var(--color-fg-primary))]">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerNavLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[rgb(var(--color-fg-secondary))] hover:text-[rgb(var(--color-fg-primary))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[rgb(var(--color-fg-primary))]">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/certifications"
                  className="text-[rgb(var(--color-fg-secondary))] hover:text-[rgb(var(--color-fg-primary))] transition-colors"
                >
                  Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/work-with-me"
                  className="text-[rgb(var(--color-fg-secondary))] hover:text-[rgb(var(--color-fg-primary))] transition-colors"
                >
                  Work With Me
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-[rgb(var(--color-fg-tertiary))]">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
