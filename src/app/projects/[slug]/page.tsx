import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data";
import { generatePageMetadata, siteConfig } from "@/config";
import { ProjectDetail } from "./ProjectDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return generatePageMetadata({
      title: "Project Not Found",
      description: "The requested project could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return {
    ...generatePageMetadata({
      title: project.title,
      description: project.summary,
      path: `/projects/${project.slug}`,
      image: project.image,
    }),
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: [
        {
          url: project.image.startsWith("http") ? project.image : `${siteConfig.url}${project.image}`,
          alt: project.imageAlt || project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps): Promise<React.ReactNode> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
