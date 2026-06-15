import type { SearchDocument } from "./project-types";
import type { SystemSearchDocument } from "./system-types";
import { getAllSlugs, getProjectBySlug } from "./projects";
import { getAllSystemSlugs, getSystemBySlug } from "./systems";

export type UnifiedSearchDocument =
  | (SearchDocument & { type: "project" })
  | SystemSearchDocument;

export function buildSearchIndex(): UnifiedSearchDocument[] {
  const documents: UnifiedSearchDocument[] = [];

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
