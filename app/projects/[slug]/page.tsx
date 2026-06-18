import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllSlugs,
  getProjectBySlug,
  type Locale,
} from "@/app/lib/projects";
import ProjectDetailClient from "@/app/components/projects/ProjectDetailClient";
import { projectMdxComponents } from "@/app/components/projects/mdx-components";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  shouldNoIndexProjectStatus,
  techArticleJsonLd,
} from "@/app/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getProjectMeta(lang: Locale, slug: string) {
  const project = getProjectBySlug(slug, lang);
  if (!project) {
    return undefined;
  }

  const { content: _content, ...meta } = project;
  void _content;
  return meta;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project =
    getProjectBySlug(slug, "en") ?? getProjectBySlug(slug, "fa");

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: project.title,
    description:
      project.description ??
      `Engineering project: ${project.title} — infrastructure and platform work by Ali Sadat.`,
    path: `/projects/${slug}`,
    image: `/projects/${slug}/opengraph-image`,
    type: "article",
    publishedTime: project.createdAt,
    keywords: [...project.tags, "engineering project", "DevOps", "portfolio"],
    noIndex: shouldNoIndexProjectStatus(project.status),
  });
}

export const dynamic = "force-static";

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const enProject = getProjectBySlug(slug, "en");
  const faProject = getProjectBySlug(slug, "fa");

  if (!enProject && !faProject) {
    notFound();
  }

  const project = enProject ?? faProject;
  if (!project) {
    notFound();
  }

  const enMeta = getProjectMeta("en", slug);
  const faMeta = getProjectMeta("fa", slug);

  return (
    <>
      <JsonLd
        data={[
          techArticleJsonLd({
            title: project.title,
            description:
              project.description ??
              `Engineering project: ${project.title}`,
            path: `/projects/${slug}`,
            datePublished: project.createdAt,
            image: project.image,
            keywords: project.tags,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${slug}` },
          ]),
        ]}
      />
      <ProjectDetailClient
        projectsByLocale={{
          ...(enMeta ? { en: enMeta } : {}),
          ...(faMeta ? { fa: faMeta } : {}),
        }}
        enContent={
          enProject ? (
            <MDXRemote
              source={enProject.content}
              components={projectMdxComponents}
            />
          ) : null
        }
        faContent={
          faProject ? (
            <MDXRemote
              source={faProject.content}
              components={projectMdxComponents}
            />
          ) : null
        }
      />
    </>
  );
}
