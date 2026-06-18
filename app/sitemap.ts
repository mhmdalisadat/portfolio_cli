import type { MetadataRoute } from "next";
import { getAllSlugs, getProjectBySlug } from "./lib/projects";
import { getAllSystemSlugs, getSystemBySlug } from "./lib/systems";
import { absoluteUrl } from "./lib/seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

function staticRoute(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"] = "monthly"
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: SitemapEntry[] = [
    staticRoute("/", 1, "weekly"),
    staticRoute("/projects", 0.9, "weekly"),
    staticRoute("/systems", 0.9, "weekly"),
    staticRoute("/resume", 0.8, "monthly"),
  ];

  for (const slug of getAllSlugs()) {
    const project =
      getProjectBySlug(slug, "en") ?? getProjectBySlug(slug, "fa");
    if (!project || project.status === "archived") {
      continue;
    }

    routes.push({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: new Date(project.createdAt),
      changeFrequency: "monthly",
      priority: project.featured ? 0.85 : 0.7,
    });
  }

  for (const slug of getAllSystemSlugs()) {
    const system =
      getSystemBySlug(slug, "en") ?? getSystemBySlug(slug, "fa");
    if (!system || system.status === "draft" || system.status === "archived") {
      continue;
    }

    routes.push({
      url: absoluteUrl(`/systems/${slug}`),
      lastModified: new Date(system.updatedAt),
      changeFrequency: "monthly",
      priority: system.featured ? 0.85 : 0.7,
    });
  }

  return routes;
}
