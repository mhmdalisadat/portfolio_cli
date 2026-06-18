"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { Locale, ProjectMeta } from "@/app/lib/project-types";
import TechStackIcons from "./TechStackIcons";

type ProjectDetailClientProps = {
  projectsByLocale: Partial<Record<Locale, ProjectMeta>>;
  enContent: React.ReactNode;
  faContent: React.ReactNode;
};

export default function ProjectDetailClient({
  projectsByLocale,
  enContent,
  faContent,
}: ProjectDetailClientProps) {
  const { t, locale, isPersian } = useAppLocale();

  const meta = useMemo((): ProjectMeta | undefined => {
    const current =
      projectsByLocale[locale] ?? projectsByLocale[isPersian ? "en" : "fa"];
    if (!current) {
      return undefined;
    }
    return {
      ...current,
      tags: current.tags ?? [],
      github: current.github ?? "",
      image: current.image ?? "/projects/placeholder.svg",
    };
  }, [projectsByLocale, locale, isPersian]);

  if (!meta) {
    return null;
  }

  const hasGithub = meta.github.trim().length > 0;

  return (
    <main
      className="min-h-screen py-8 sm:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 content-readable"
      style={{ backgroundColor: "#0c3649" }}
      dir={isPersian ? "rtl" : "ltr"}
    >
      <article className="w-full max-w-3xl mx-auto">
        <Link
          href="/#projects"
          className="text-[10px] sm:text-xs font-mono text-[#dce8ef]/50 hover:text-[#00c9d3] transition-colors mb-6 sm:mb-8 inline-block"
        >
          {isPersian ? "→" : "←"} {t("projects_page.back")}
        </Link>

        <div className="relative aspect-[16/9] sm:aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-[#dce8ef]/20 mb-6 sm:mb-8">
          <Image
            src={meta.image}
            alt={meta.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 896px"
          />
        </div>

        <header className="mb-6 sm:mb-8 border-b border-[#dce8ef]/20 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#00c9d3] tracking-tight mb-2 sm:mb-3 leading-snug">
            {meta.title}
          </h1>

          {meta.description && (
            <p className="text-sm sm:text-base lg:text-lg text-[#dce8ef]/85 leading-relaxed mb-4">
              {meta.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <TechStackIcons tags={meta.tags} size="md" />

            {hasGithub && (
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-mono text-[#0c3649] bg-[#00c9d3] hover:bg-[#00c9d3]/90 px-3 sm:px-4 py-2 rounded-lg transition-colors shrink-0"
              >
                <Github className="h-4 w-4" />
                {t("projects_page.view_github")}
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
          </div>
        </header>

        <div className="prose-project max-w-none" key={locale}>
          {isPersian && faContent ? faContent : enContent}
        </div>
      </article>
    </main>
  );
}
