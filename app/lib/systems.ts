import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Locale,
  System,
  SystemMeta,
  SystemMetaFile,
} from "./system-types";

export type {
  Locale,
  System,
  SystemCategory,
  SystemMeta,
  SystemMetaFile,
  SystemSearchDocument,
  SystemStatus,
  TocHeading,
} from "./system-types";

export { SYSTEM_FILTER_CATEGORIES } from "./system-types";

const SYSTEMS_DIR = path.join(process.cwd(), "content", "systems");

type MdxFrontmatter = {
  title: string;
  description?: string;
};

type RawMetaFile = Partial<SystemMetaFile>;

function isSystemSlug(name: string): boolean {
  if (name.startsWith(".")) {
    return false;
  }
  const fullPath = path.join(SYSTEMS_DIR, name);
  return fs.statSync(fullPath).isDirectory();
}

function normalizeMetaFile(
  folderSlug: string,
  raw: RawMetaFile
): SystemMetaFile {
  return {
    slug: raw.slug?.trim() || folderSlug,
    title: raw.title,
    description: raw.description,
    status: raw.status ?? "active",
    version: raw.version ?? "1.0",
    createdAt: raw.createdAt ?? "1970-01-01",
    updatedAt: raw.updatedAt ?? raw.createdAt ?? "1970-01-01",
    tags: raw.tags ?? [],
    featured: raw.featured ?? false,
    relatedSystems: raw.relatedSystems ?? [],
    relatedProjects: raw.relatedProjects ?? [],
  };
}

function readMetaFile(folderSlug: string): SystemMetaFile {
  const metaPath = path.join(SYSTEMS_DIR, folderSlug, "meta.json");
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
  const filePath = path.join(SYSTEMS_DIR, folderSlug, `${lang}.mdx`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as MdxFrontmatter, content };
}

function buildSystem(folderSlug: string, lang: Locale): System | undefined {
  const mdx = parseMdxFile(folderSlug, lang);
  if (!mdx) {
    return undefined;
  }

  const metaPath = path.join(SYSTEMS_DIR, folderSlug, "meta.json");
  if (!fs.existsSync(metaPath)) {
    return undefined;
  }

  const meta = readMetaFile(folderSlug);

  return {
    ...meta,
    title: mdx.frontmatter.title || meta.title || folderSlug,
    description: mdx.frontmatter.description ?? meta.description,
    content: mdx.content,
  };
}

function sortSystems<T extends { updatedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

function listFolderSlugs(): string[] {
  if (!fs.existsSync(SYSTEMS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(SYSTEMS_DIR)
    .filter(isSystemSlug)
    .filter((folderSlug) =>
      fs.existsSync(path.join(SYSTEMS_DIR, folderSlug, "meta.json"))
    );
}

export function getAllSystemSlugs(): string[] {
  return listFolderSlugs().map((folderSlug) => readMetaFile(folderSlug).slug);
}

export function getAllSystems(lang: Locale): System[] {
  const systems = listFolderSlugs()
    .map((folderSlug) => buildSystem(folderSlug, lang))
    .filter((system): system is System => system !== undefined);

  return sortSystems(systems);
}

export function getSystemBySlug(
  slug: string,
  lang: Locale
): System | undefined {
  const folderSlug =
    listFolderSlugs().find((name) => readMetaFile(name).slug === slug) ?? slug;

  return buildSystem(folderSlug, lang);
}

function toSystemMeta(system: System): SystemMeta {
  const { content: _content, ...meta } = system;
  void _content;
  return meta;
}

export function getSystemsByLocale(): Record<Locale, SystemMeta[]> {
  const map = (lang: Locale): SystemMeta[] =>
    getAllSystems(lang).map(toSystemMeta);

  return { en: map("en"), fa: map("fa") };
}

export function getFeaturedSystems(lang: Locale, limit = 3): SystemMeta[] {
  return getAllSystems(lang)
    .filter((system) => system.featured)
    .slice(0, limit)
    .map(toSystemMeta);
}

export function getAdjacentSystems(slug: string, lang: Locale) {
  const systems = getAllSystems(lang);
  const index = systems.findIndex((system) => system.slug === slug);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: index > 0 ? toSystemMeta(systems[index - 1]) : undefined,
    next:
      index < systems.length - 1
        ? toSystemMeta(systems[index + 1])
        : undefined,
  };
}

export function resolveSystemTitle(slug: string, lang: Locale): string {
  const system = getSystemBySlug(slug, lang);
  return system?.title ?? slug;
}
