import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Locale,
  Project,
  ProjectMeta,
  ProjectMetaFile,
  ProjectStatus,
} from "./project-types";

export type {
  Locale,
  Project,
  ProjectMeta,
  ProjectMetaFile,
  ProjectStatus,
  SearchDocument,
} from "./project-types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

type MdxFrontmatter = {
  title: string;
  description?: string;
};

type RawMetaFile = Partial<ProjectMetaFile> & {
  stack?: string[];
  type?: string;
};

function isProjectSlug(name: string): boolean {
  if (name.startsWith(".")) {
    return false;
  }
  const fullPath = path.join(PROJECTS_DIR, name);
  return fs.statSync(fullPath).isDirectory();
}

function normalizeMetaFile(
  folderSlug: string,
  raw: RawMetaFile
): ProjectMetaFile {
  return {
    slug: raw.slug?.trim() || folderSlug,
    tags: raw.tags ?? raw.stack ?? [],
    image: raw.image ?? "/projects/placeholder.svg",
    featured: raw.featured ?? false,
    createdAt: raw.createdAt ?? "1970-01-01",
    status: raw.status ?? "completed",
    github: raw.github ?? "",
  };
}

function readMetaFile(folderSlug: string): ProjectMetaFile {
  const metaPath = path.join(PROJECTS_DIR, folderSlug, "meta.json");
  const raw = JSON.parse(fs.readFileSync(metaPath, "utf8")) as RawMetaFile;
  const meta = normalizeMetaFile(folderSlug, raw);

  if (meta.slug !== folderSlug) {
    console.warn(
      `meta.json slug "${meta.slug}" does not match folder "${folderSlug}". Using folder name.`
    );
    meta.slug = folderSlug;
  }

  return meta;
}

function parseMdxFile(
  folderSlug: string,
  lang: Locale
): { frontmatter: MdxFrontmatter; content: string } | undefined {
  const filePath = path.join(PROJECTS_DIR, folderSlug, `${lang}.mdx`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as MdxFrontmatter, content };
}

function buildProject(folderSlug: string, lang: Locale): Project | undefined {
  const mdx = parseMdxFile(folderSlug, lang);
  if (!mdx) {
    return undefined;
  }

  const metaPath = path.join(PROJECTS_DIR, folderSlug, "meta.json");
  if (!fs.existsSync(metaPath)) {
    return undefined;
  }

  const meta = readMetaFile(folderSlug);

  return {
    ...meta,
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
    content: mdx.content,
  };
}

function sortProjects<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter(isProjectSlug)
    .filter((folderSlug) =>
      fs.existsSync(path.join(PROJECTS_DIR, folderSlug, "meta.json"))
    )
    .map((folderSlug) => readMetaFile(folderSlug).slug);
}

export function getAllProjects(lang: Locale): Project[] {
  const folderSlugs = fs.existsSync(PROJECTS_DIR)
    ? fs
        .readdirSync(PROJECTS_DIR)
        .filter(isProjectSlug)
        .filter((folderSlug) =>
          fs.existsSync(path.join(PROJECTS_DIR, folderSlug, "meta.json"))
        )
    : [];

  const projects = folderSlugs
    .map((folderSlug) => buildProject(folderSlug, lang))
    .filter((project): project is Project => project !== undefined);

  return sortProjects(projects);
}

export function getProjectBySlug(
  slug: string,
  lang: Locale
): Project | undefined {
  const folderSlugs = fs.existsSync(PROJECTS_DIR)
    ? fs.readdirSync(PROJECTS_DIR).filter(isProjectSlug)
    : [];

  const folderSlug =
    folderSlugs.find((name) => readMetaFile(name).slug === slug) ?? slug;

  return buildProject(folderSlug, lang);
}

function toProjectMeta(project: Project): ProjectMeta {
  const { content: _content, ...meta } = project;
  void _content;
  return {
    ...meta,
    tags: meta.tags ?? [],
    github: meta.github ?? "",
    image: meta.image ?? "/projects/placeholder.svg",
  };
}

export function getProjectsByLocale(): Record<Locale, ProjectMeta[]> {
  const map = (lang: Locale): ProjectMeta[] =>
    getAllProjects(lang).map(toProjectMeta);

  return { en: map("en"), fa: map("fa") };
}

export function getFeaturedProjects(lang: Locale, limit = 3): ProjectMeta[] {
  const featured = getAllProjects(lang)
    .filter((project) => project.featured)
    .slice(0, limit)
    .map(toProjectMeta);

  if (featured.length > 0) {
    return featured;
  }

  return getAllProjects(lang).slice(0, limit).map(toProjectMeta);
}
