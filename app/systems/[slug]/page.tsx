import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAdjacentSystems,
  getAllSystemSlugs,
  getSystemBySlug,
  type Locale,
} from "@/app/lib/systems";
import { getProjectBySlug } from "@/app/lib/projects";
import { extractHeadings } from "@/app/lib/toc";
import { estimateReadingTime } from "@/app/lib/reading-time";
import SystemDetailClient from "@/app/components/systems/SystemDetailClient";
import { createSystemMdxComponents } from "@/app/components/systems/mdx-components";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  shouldNoIndexSystemStatus,
} from "@/app/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getSystemMeta(lang: Locale, slug: string) {
  const system = getSystemBySlug(slug, lang);
  if (!system) {
    return undefined;
  }

  const { content: _content, ...meta } = system;
  void _content;
  return meta;
}

function resolveRelatedSystems(slug: string, lang: Locale) {
  const system = getSystemBySlug(slug, lang);
  if (!system) {
    return [];
  }

  return system.relatedSystems
    .map((relatedSlug) => {
      const related = getSystemBySlug(relatedSlug, lang);
      return related
        ? { slug: related.slug, title: related.title }
        : { slug: relatedSlug, title: relatedSlug };
    })
    .filter((item) => item.slug !== slug);
}

function resolveRelatedProjects(slug: string, lang: Locale) {
  const system = getSystemBySlug(slug, lang);
  if (!system) {
    return [];
  }

  return system.relatedProjects.map((projectSlug) => {
    const project = getProjectBySlug(projectSlug, lang);
    return {
      slug: projectSlug,
      title: project?.title ?? projectSlug,
    };
  });
}

function resolveRelatedSystemCards(slug: string, lang: Locale) {
  const system = getSystemBySlug(slug, lang);
  if (!system) {
    return [];
  }

  return system.relatedSystems
    .map((relatedSlug) => getSystemMeta(lang, relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);
}

function localeBundle(slug: string, lang: Locale) {
  const system = getSystemBySlug(slug, lang);
  const { previous, next } = getAdjacentSystems(slug, lang);

  return {
    headings: system ? extractHeadings(system.content) : [],
    readingTime: system ? estimateReadingTime(system.content) : 1,
    relatedSystems: resolveRelatedSystems(slug, lang),
    relatedProjects: resolveRelatedProjects(slug, lang),
    previous,
    next,
    relatedSystemCards: resolveRelatedSystemCards(slug, lang),
  };
}

export async function generateStaticParams() {
  return getAllSystemSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const system =
    getSystemBySlug(slug, "en") ?? getSystemBySlug(slug, "fa");

  if (!system) {
    return { title: "System not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: system.title,
    description:
      system.description ??
      `Systems thinking artifact: ${system.title} — frameworks and mental models by Ali Sadat.`,
    path: `/systems/${slug}`,
    image: `/systems/${slug}/opengraph-image`,
    type: "article",
    publishedTime: system.createdAt,
    modifiedTime: system.updatedAt,
    keywords: [...system.tags, "systems thinking", "mental models", "frameworks"],
    noIndex: shouldNoIndexSystemStatus(system.status),
  });
}

export const dynamic = "force-static";

export default async function SystemDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const enSystem = getSystemBySlug(slug, "en");
  const faSystem = getSystemBySlug(slug, "fa");

  if (!enSystem && !faSystem) {
    notFound();
  }

  const system = enSystem ?? faSystem;
  if (!system) {
    notFound();
  }

  const enBundle = localeBundle(slug, "en");
  const faBundle = localeBundle(slug, "fa");

  const enMeta = getSystemMeta("en", slug);
  const faMeta = getSystemMeta("fa", slug);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: system.title,
            description:
              system.description ??
              `Systems thinking artifact: ${system.title}`,
            path: `/systems/${slug}`,
            datePublished: system.createdAt,
            dateModified: system.updatedAt,
            keywords: system.tags,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Systems", path: "/systems" },
            { name: system.title, path: `/systems/${slug}` },
          ]),
        ]}
      />
      <SystemDetailClient
        systemsByLocale={{
          ...(enMeta ? { en: enMeta } : {}),
          ...(faMeta ? { fa: faMeta } : {}),
        }}
        headingsByLocale={{
          ...(enSystem ? { en: enBundle.headings } : {}),
          ...(faSystem ? { fa: faBundle.headings } : {}),
        }}
        readingTimeByLocale={{
          ...(enSystem ? { en: enBundle.readingTime } : {}),
          ...(faSystem ? { fa: faBundle.readingTime } : {}),
        }}
        relatedSystemsByLocale={{
          en: enBundle.relatedSystems,
          fa: faBundle.relatedSystems,
        }}
        relatedProjectsByLocale={{
          en: enBundle.relatedProjects,
          fa: faBundle.relatedProjects,
        }}
        previousByLocale={{
          ...(enBundle.previous ? { en: enBundle.previous } : {}),
          ...(faBundle.previous ? { fa: faBundle.previous } : {}),
        }}
        nextByLocale={{
          ...(enBundle.next ? { en: enBundle.next } : {}),
          ...(faBundle.next ? { fa: faBundle.next } : {}),
        }}
        relatedSystemCardsByLocale={{
          en: enBundle.relatedSystemCards,
          fa: faBundle.relatedSystemCards,
        }}
        enContent={
          enSystem ? (
            <MDXRemote
              source={enSystem.content}
              components={createSystemMdxComponents(enSystem.content)}
            />
          ) : null
        }
        faContent={
          faSystem ? (
            <MDXRemote
              source={faSystem.content}
              components={createSystemMdxComponents(faSystem.content)}
            />
          ) : null
        }
      />
    </>
  );
}
