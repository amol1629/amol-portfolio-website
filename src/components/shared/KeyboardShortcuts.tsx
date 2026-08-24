"use client";

import { useEffect, useCallback } from "react";

const SECTIONS = [
  "hero",
  "trust",
  "projects",
  "skills",
  "about",
  "experience",
  "services",
  "certifications",
  "impact",
  "contact",
];

export function KeyboardShortcuts(): null {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const getCurrentSectionIndex = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const sectionId = SECTIONS[i];
      if (!sectionId) continue;
      const element = document.getElementById(sectionId);
      if (element && element.offsetTop <= scrollPosition) {
        return i;
      }
    }
    return 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const currentIndex = getCurrentSectionIndex();

      switch (e.key.toLowerCase()) {
        case "j": {
          e.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, SECTIONS.length - 1);
          const nextSection = SECTIONS[nextIndex];
          if (nextSection) {
            scrollToSection(nextSection);
          }
          break;
        }
        case "k": {
          e.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          const prevSection = SECTIONS[prevIndex];
          if (prevSection) {
            scrollToSection(prevSection);
          }
          break;
        }
        case "g":
          if (e.shiftKey) {
            e.preventDefault();
            const lastSection = SECTIONS[SECTIONS.length - 1];
            if (lastSection) {
              scrollToSection(lastSection);
            }
          } else {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          break;
        case "/":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const searchInput = document.querySelector<HTMLInputElement>(
              'input[type="search"]'
            );
            if (searchInput) {
              searchInput.focus();
            }
          }
          break;
        case "escape":
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getCurrentSectionIndex, scrollToSection]);

  return null;
}
