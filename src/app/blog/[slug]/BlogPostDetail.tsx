"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import {
  SectionWrapper,
  GlassPanel,
  Badge,
  Button,
  Breadcrumbs,
  ShareButtons,
  RelatedContent,
  TableOfContents,
} from "@/components/shared";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data";
import { siteConfig } from "@/config";
import type { BlogPost } from "@/types";
import type { ReactNode } from "react";

interface BlogPostDetailProps {
  post: BlogPost;
}

export function BlogPostDetail({ post }: BlogPostDetailProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = prefersReducedMotion ? {} : staggerContainer;
  const itemVariants = prefersReducedMotion ? {} : fadeUp;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      description: p.excerpt,
      href: `/blog/${p.slug}`,
      category: p.category,
    }));

  const pageUrl = `${siteConfig.url}/blog/${post.slug}`;

  const tocItems = extractHeadings(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <SectionWrapper className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <motion.article
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} transition={defaultTransition} className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
        </motion.div>

        <motion.header
          variants={itemVariants}
          transition={defaultTransition}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="default">{post.category}</Badge>
            {post.featured && <Badge variant="accent">Featured</Badge>}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--color-fg-tertiary))]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>
        </motion.header>

        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            variants={itemVariants}
            transition={defaultTransition}
            className="lg:col-span-3"
          >
            <GlassPanel className="prose prose-invert max-w-none">
              <BlogContent content={post.content} />
            </GlassPanel>
          </motion.div>

          {tocItems.length > 0 && (
            <motion.aside
              variants={itemVariants}
              transition={defaultTransition}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <GlassPanel padding="sm">
                  <TableOfContents items={tocItems} />
                </GlassPanel>
              </div>
            </motion.aside>
          )}
        </div>

        <motion.footer
          variants={itemVariants}
          transition={defaultTransition}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-[rgb(var(--color-fg-tertiary))]" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-mono bg-[rgb(var(--color-bg-tertiary))] rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          <ShareButtons url={pageUrl} title={post.title} className="mb-8" />

          {relatedPosts.length > 0 && (
            <RelatedContent items={relatedPosts} title="Related Articles" className="mb-8" />
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[rgb(var(--color-border-default))]">
            <Button href="/blog" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              More articles
            </Button>
            <Button href="/work-with-me">
              Work with me
            </Button>
          </div>
        </motion.footer>
      </motion.article>
    </SectionWrapper>
  );
}

function BlogContent({ content }: { content: string }): ReactNode {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let currentCodeBlock: string[] | null = null;
  let codeLanguage = "";
  let keyIndex = 0;

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (currentCodeBlock === null) {
        currentCodeBlock = [];
        codeLanguage = line.slice(3).trim();
      } else {
        elements.push(
          <pre
            key={keyIndex++}
            className="bg-[rgb(var(--color-bg-tertiary))] rounded-lg p-4 overflow-x-auto"
          >
            <code className={`language-${codeLanguage}`}>
              {currentCodeBlock.join("\n")}
            </code>
          </pre>
        );
        currentCodeBlock = null;
        codeLanguage = "";
      }
      continue;
    }

    if (currentCodeBlock !== null) {
      currentCodeBlock.push(line);
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={keyIndex++}
          className="text-2xl font-bold mt-8 mb-4 text-[rgb(var(--color-fg-primary))]"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={keyIndex++}
          className="text-xl font-bold mt-6 mb-3 text-[rgb(var(--color-fg-primary))]"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.match(/^\d+\.\s/)) {
      elements.push(
        <p
          key={keyIndex++}
          className="text-[rgb(var(--color-fg-secondary))] mb-2 pl-4"
        >
          {formatInlineCode(line)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <p
          key={keyIndex++}
          className="text-[rgb(var(--color-fg-secondary))] mb-2 pl-4 flex gap-2"
        >
          <span className="text-[rgb(var(--color-accent-cyan))]">•</span>
          <span>{formatInlineCode(line.slice(2))}</span>
        </p>
      );
    } else if (line.trim() !== "") {
      elements.push(
        <p
          key={keyIndex++}
          className="text-[rgb(var(--color-fg-secondary))] mb-4 leading-relaxed"
        >
          {formatInlineCode(line)}
        </p>
      );
    }
  }

  return <>{elements}</>;
}

function formatInlineCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 text-sm font-mono bg-[rgb(var(--color-bg-tertiary))] rounded text-[rgb(var(--color-accent-cyan))]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.includes("**")) {
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bp, j) => {
        if (bp.startsWith("**") && bp.endsWith("**")) {
          return (
            <strong key={`${i}-${j}`} className="font-semibold text-[rgb(var(--color-fg-primary))]">
              {bp.slice(2, -2)}
            </strong>
          );
        }
        return bp;
      });
    }
    return part;
  });
}

function extractHeadings(content: string): { id: string; title: string; level: number }[] {
  const headings: { id: string; title: string; level: number }[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      headings.push({ id, title, level: 2 });
    } else if (line.startsWith("### ")) {
      const title = line.slice(4);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      headings.push({ id, title, level: 3 });
    }
  }

  return headings;
}
