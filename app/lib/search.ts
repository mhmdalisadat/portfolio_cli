import type { Locale, SearchDocument } from "./project-types";
import type { SystemSearchDocument } from "./system-types";
import { getAllSlugs, getProjectBySlug } from "./projects";
import { getAllSystemSlugs, getSystemBySlug } from "./systems";
import enCommon from "../../public/locales/en/common.json";
import faCommon from "../../public/locales/fa/common.json";

export type PageSearchDocument = {
  type: "page";
  id: string;
  locale: Locale;
  title: string;
  description?: string;
  tags: string[];
  content: string;
  href: string;
};

export type UnifiedSearchDocument =
  | (SearchDocument & { type: "project" })
  | SystemSearchDocument
  | PageSearchDocument;

type LocaleBundle = typeof enCommon;

function flattenResumeStack(stack: LocaleBundle["resume"]["stack"]): string {
  return Object.values(stack).join(" ");
}

function buildPageDocuments(
  locale: Locale,
  bundle: LocaleBundle
): PageSearchDocument[] {
  const resumeContent = [
    bundle.resume.name,
    bundle.resume.role,
    bundle.resume.summary,
    bundle.resume.education_degree,
    flattenResumeStack(bundle.resume.stack),
    bundle.resume.persian,
    bundle.resume.english,
    bundle.resume.contact_cta,
  ].join(" ");

  return [
    {
      type: "page",
      id: "home",
      locale,
      title: bundle.hero_title,
      description: bundle.hero_description,
      tags: [bundle.home, bundle.description, bundle.poem],
      content: [
        bundle.hero_title,
        bundle.hero_description,
        bundle.description,
        bundle.poem,
      ].join(" "),
      href: "/#home",
    },
    {
      type: "page",
      id: "projects",
      locale,
      title: bundle.projects_home.title,
      description: bundle.projects_home.subtitle,
      tags: [bundle.projects, bundle.projects_home.eyebrow],
      content: [
        bundle.projects_home.title,
        bundle.projects_home.subtitle,
        bundle.projects_home.eyebrow,
        bundle.projects_page.title,
        bundle.projects_page.subtitle,
      ].join(" "),
      href: "/#projects",
    },
    {
      type: "page",
      id: "systems",
      locale,
      title: bundle.systems_home.title,
      description: bundle.systems_home.subtitle,
      tags: [bundle.systems, bundle.systems_home.eyebrow],
      content: [
        bundle.systems_home.title,
        bundle.systems_home.subtitle,
        bundle.systems_home.eyebrow,
        bundle.systems_page.title,
        bundle.systems_page.subtitle,
      ].join(" "),
      href: "/#systems",
    },
    {
      type: "page",
      id: "resume",
      locale,
      title: bundle.resume.name,
      description: bundle.resume.role,
      tags: [bundle.Resume, bundle.resume.eyebrow, "CV", "resume"],
      content: resumeContent,
      href: "/#Resume",
    },
  ];
}

export function buildSearchIndex(): UnifiedSearchDocument[] {
  const documents: UnifiedSearchDocument[] = [
    ...buildPageDocuments("en", enCommon),
    ...buildPageDocuments("fa", faCommon),
  ];

  for (const slug of getAllSlugs()) {
    for (const locale of ["en", "fa"] as const) {
      const project = getProjectBySlug(slug, locale);
      if (!project) {
        continue;
      }

      documents.push({
        type: "project",
        slug: project.slug,
        locale,
        title: project.title,
        description: project.description,
        tags: project.tags,
        featured: project.featured,
        createdAt: project.createdAt,
        status: project.status,
        github: project.github,
        content: project.content,
      });
    }
  }

  for (const slug of getAllSystemSlugs()) {
    for (const locale of ["en", "fa"] as const) {
      const system = getSystemBySlug(slug, locale);
      if (!system) {
        continue;
      }

      documents.push({
        type: "system",
        slug: system.slug,
        locale,
        title: system.title,
        description: system.description,
        tags: system.tags,
        featured: system.featured,
        status: system.status,
        version: system.version,
        createdAt: system.createdAt,
        updatedAt: system.updatedAt,
        content: system.content,
      });
    }
  }

  return documents;
}
