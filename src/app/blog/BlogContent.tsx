"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import { SectionWrapper, SectionHeading, LiquidGlassCard, Badge, EmptyState } from "@/components/shared";
import { blogPosts } from "@/data";
import type { BlogCategory } from "@/types";
import Link from "next/link";
import { Search, FileText, Clock, Calendar } from "lucide-react";
import type { ReactNode } from "react";

type FilterOption = "all" | BlogCategory;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "architecture", label: "Architecture" },
  { value: "performance", label: "Performance" },
  { value: "career", label: "Career" },
  { value: "tools", label: "Tools" },
];


export function BlogContent(): ReactNode {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion ? {} : staggerContainer;
  const itemVariants = prefersReducedMotion ? {} : fadeUp;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesFilter =
        activeFilter === "all" || post.category === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <SectionWrapper className="pt-24">
      <SectionHeading
        label="Blog"
        title="Technical articles"
        description="Thoughts on frontend development, architecture, and building great software."
      />

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--color-fg-tertiary))]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[rgb(var(--color-bg-tertiary))] border border-[rgb(var(--color-border-default))] text-[rgb(var(--color-fg-primary))] placeholder:text-[rgb(var(--color-fg-tertiary))] focus:outline-none focus:border-[rgb(var(--color-accent-cyan))]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === option.value
                  ? "bg-[rgb(var(--color-accent-cyan))] text-[rgb(var(--color-fg-inverted))]"
                  : "bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-fg-secondary))] hover:bg-[rgb(var(--color-bg-elevated))]"
              }`}
              aria-pressed={activeFilter === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="Try adjusting your search or filter criteria."
          icon={<FileText className="w-12 h-12" />}
        />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-6"
        >
          {filteredPosts.map((post) => {
            return (
            <motion.article
              key={post.id}
              variants={itemVariants}
              transition={defaultTransition}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <LiquidGlassCard className="group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="default">{post.category}</Badge>
                        {post.featured && <Badge variant="accent">Featured</Badge>}
                      </div>

                      <h2 className="text-xl font-bold mb-2 group-hover:text-[rgb(var(--color-accent-cyan))] transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-[rgb(var(--color-fg-secondary))] mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--color-fg-tertiary))]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:w-48 md:justify-end">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono bg-[rgb(var(--color-bg-tertiary))] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </LiquidGlassCard>
              </Link>
            </motion.article>
            );
          })}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
