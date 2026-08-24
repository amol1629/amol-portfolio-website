import type { Metadata } from "next";
import { generatePageMetadata } from "@/config";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Technical articles on frontend development, React, TypeScript, performance optimization, and software architecture.",
  path: "/blog",
});

export default function BlogPage(): React.ReactNode {
  return <BlogContent />;
}
