import type { Metadata } from "next";
import { generatePageMetadata } from "@/config";
import { ProjectsContent } from "./ProjectsContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Case studies showcasing frontend architecture, performance optimization, and full-stack development across enterprise, e-commerce, and healthcare sectors.",
  path: "/projects",
});

export default function ProjectsPage(): React.ReactNode {
  return <ProjectsContent />;
}
