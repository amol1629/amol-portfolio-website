import type { NavLink } from "@/types";

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "#hero", isSection: true },
  { label: "About", href: "#about", isSection: true },
  { label: "Services", href: "#services", isSection: true },
  { label: "Skills", href: "#skills", isSection: true },
  { label: "Projects", href: "#projects", isSection: true },
  { label: "Experience", href: "#experience", isSection: true },
  { label: "Certifications", href: "#certifications", isSection: true },
  { label: "Contact", href: "#contact", isSection: true },
];

export const footerNavLinks: NavLink[] = [
  { label: "About", href: "#about", isSection: true },
  { label: "Services", href: "#services", isSection: true },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Blog", href: "/blog" },
];

export const ctaLink: NavLink = {
  label: "Work With Me",
  href: "/work-with-me",
};
