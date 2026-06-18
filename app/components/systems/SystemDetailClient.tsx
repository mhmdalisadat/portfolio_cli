"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { Locale, SystemMeta, TocHeading } from "@/app/lib/system-types";
import TableOfContents from "./TableOfContents";
import KnowledgeGraphSidebar from "./KnowledgeGraphSidebar";
import SystemNavigation from "./SystemNavigation";

type SystemDetailClientProps = {
  systemsByLocale: Partial<Record<Locale, SystemMeta>>;
  headingsByLocale: Partial<Record<Locale, TocHeading[]>>;
  readingTimeByLocale: Partial<Record<Locale, number>>;
  enContent: React.ReactNode;
  faContent: React.ReactNode;
  relatedSystemsByLocale: Partial<
    Record<Locale, { slug: string; title: string }[]>
  >;
  relatedProjectsByLocale: Partial<
    Record<Locale, { slug: string; title: string }[]>
  >;
  previousByLocale: Partial<Record<Locale, SystemMeta | undefined>>;
  nextByLocale: Partial<Record<Locale, SystemMeta | undefined>>;
  relatedSystemCardsByLocale: Partial<Record<Locale, SystemMeta[]>>;
};

export default function SystemDetailClient({
  systemsByLocale,
  headingsByLocale,
  readingTimeByLocale,
  enContent,
  faContent,
  relatedSystemsByLocale,
  relatedProjectsByLocale,
  previousByLocale,
  nextByLocale,
  relatedSystemCardsByLocale,
}: SystemDetailClientProps) {
  const { t, locale, isPersian } = useAppLocale();

  const meta = useMemo((): SystemMeta | undefined => {
    const current =
      systemsByLocale[locale] ?? systemsByLocale[isPersian ? "en" : "fa"];
    return current ?? undefined;
  }, [systemsByLocale, locale, isPersian]);

  const headings =
    headingsByLocale[locale] ??
    headingsByLocale[isPersian ? "en" : "fa"] ??
    [];
  const readingTime =
    readingTimeByLocale[locale] ??
    readingTimeByLocale[isPersian ? "en" : "fa"] ??
    1;
  const relatedSystems =
    relatedSystemsByLocale[locale] ??
    relatedSystemsByLocale[isPersian ? "en" : "fa"] ??
    [];
  const relatedProjects =
    relatedProjectsByLocale[locale] ??
    relatedProjectsByLocale[isPersian ? "en" : "fa"] ??
    [];
  const previous =
    previousByLocale[locale] ?? previousByLocale[isPersian ? "en" : "fa"];
  const next = nextByLocale[locale] ?? nextByLocale[isPersian ? "en" : "fa"];
  const relatedSystemCards =
    relatedSystemCardsByLocale[locale] ??
    relatedSystemCardsByLocale[isPersian ? "en" : "fa"] ??
    [];

  if (!meta) {
    return null;
  }

  const statusKey = `systems_page.status_${meta.status}`;
  const showFa = isPersian && faContent;

  return (
    <main
      className="min-h-screen py-8 sm:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 content-readable"
      style={{ backgroundColor: "#0c3649" }}
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-7xl mx-auto">
        <Link
          href="/systems"
          className="text-[10px] sm:text-xs font-mono text-[#dce8ef]/50 hover:text-[#00c9d3] transition-colors mb-6 sm:mb-8 inline-block"
        >
          {isPersian ? "→" : "←"} {t("systems_page.back")}
        </Link>

        <header className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#dce8ef]/20 max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00c9d3]/70 mb-3">
            {t("systems_page.artifact")}
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#00c9d3] tracking-tight mb-2 sm:mb-3 leading-snug">
            {meta.title}
          </h1>

          {meta.description && (
            <p className="text-sm sm:text-base lg:text-lg text-[#dce8ef]/85 leading-relaxed mb-3 sm:mb-4 max-w-2xl">
              {meta.description}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm font-mono text-[#dce8ef]/55 mb-4">
            <span>
              <span className="text-[#00c9d3]">{t("systems_page.status")}:</span>{" "}
              {t(statusKey)}
            </span>
            <span>
              <span className="text-[#00c9d3]">{t("systems_page.version")}:</span>{" "}
              v{meta.version}
            </span>
            <span>
              <span className="text-[#00c9d3]">{t("systems_page.created")}:</span>{" "}
              {meta.createdAt}
            </span>
            <span>
              <span className="text-[#00c9d3]">{t("systems_page.updated")}:</span>{" "}
              {meta.updatedAt}
            </span>
            <span>
              <span className="text-[#00c9d3]">{t("systems_page.reading_time")}:</span>{" "}
              {readingTime} {t("systems_page.min_read")}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-[#dce8ef]/60 border border-[#dce8ef]/20 rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] xl:grid-cols-[200px_minmax(0,68ch)_220px] gap-6 lg:gap-8 xl:gap-10">
          <div className="hidden lg:block">
            <TableOfContents key={locale} headings={headings} />
          </div>

          <div className="min-w-0">
            <div className="lg:hidden">
              <TableOfContents key={locale} headings={headings} />
            </div>

            <article className="prose-system" key={locale}>
              {showFa && faContent ? faContent : enContent}
            </article>

            <div className="xl:hidden mt-8 space-y-6">
              <MobileGraphSection
                title={t("systems_page.related_systems")}
                links={relatedSystems.map((item) => ({
                  href: `/systems/${item.slug}`,
                  title: item.title,
                }))}
              />
              <MobileGraphSection
                title={t("systems_page.related_projects")}
                links={relatedProjects.map((item) => ({
                  href: `/projects/${item.slug}`,
                  title: item.title,
                }))}
              />
            </div>

            <SystemNavigation
              previous={previous}
              next={next}
              relatedSystems={relatedSystemCards}
            />
          </div>

          <div className="hidden xl:block">
            <KnowledgeGraphSidebar
              relatedSystems={relatedSystems}
              relatedProjects={relatedProjects}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function MobileGraphSection({
  title,
  links,
}: {
  title: string;
  links: { href: string; title: string }[];
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="border border-[#dce8ef]/20 rounded-lg p-4 bg-[#0a2d3d]">
      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#00c9d3]/70 mb-3">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs sm:text-sm text-[#dce8ef]/70 hover:text-[#00c9d3] transition-colors"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
