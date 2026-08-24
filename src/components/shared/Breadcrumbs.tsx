"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/config";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps): ReactNode {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `${siteConfig.url}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link
              href="/"
              itemProp="item"
              className="text-[rgb(var(--color-fg-tertiary))] hover:text-[rgb(var(--color-accent-cyan))] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only" itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <ChevronRight className="w-4 h-4 text-[rgb(var(--color-fg-tertiary))]" aria-hidden="true" />
              {item.href ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className="text-[rgb(var(--color-fg-tertiary))] hover:text-[rgb(var(--color-accent-cyan))] transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className="text-[rgb(var(--color-fg-primary))]" itemProp="name">
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
