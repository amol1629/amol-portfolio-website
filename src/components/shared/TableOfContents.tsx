"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps): ReactNode {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={cn("space-y-1", className)}>
      <h4 className="text-sm font-semibold text-[rgb(var(--color-fg-primary))] mb-3">
        On this page
      </h4>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={cn(
            "block w-full text-left text-sm py-1 transition-colors",
            item.level === 2 && "pl-0",
            item.level === 3 && "pl-4",
            item.level === 4 && "pl-8",
            activeId === item.id
              ? "text-[rgb(var(--color-accent-cyan))]"
              : "text-[rgb(var(--color-fg-tertiary))] hover:text-[rgb(var(--color-fg-secondary))]"
          )}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}
