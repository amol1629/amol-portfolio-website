import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data";
import { generatePageMetadata, siteConfig } from "@/config";
import { BlogPostDetail } from "./BlogPostDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return generatePageMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return {
    ...generatePageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
    }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      authors: [siteConfig.name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps): Promise<React.ReactNode> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
