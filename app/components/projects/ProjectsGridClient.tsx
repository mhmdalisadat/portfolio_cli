"use client";

import { useMemo } from "react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { ProjectMeta } from "@/app/lib/project-types";
import ProjectCard from "./ProjectCard";
import ProjectsHomePreview from "./ProjectsHomePreview";
import ProjectsSlider from "./ProjectsSlider";

type ProjectsGridClientProps = {
  projectsEn?: ProjectMeta[];
  projectsFa?: ProjectMeta[];
  showHeading?: boolean;
  variant?: "home" | "page";
};

function asProjectList(value: unknown): ProjectMeta[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is ProjectMeta =>
      item != null && typeof item === "object" && "slug" in item
  );
}

export default function ProjectsGridClient({
  projectsEn,
  projectsFa,
  showHeading = true,
  variant = "page",
}: ProjectsGridClientProps) {
  const { t, locale, isPersian } = useAppLocale();

  const en = asProjectList(projectsEn);
  const fa = asProjectList(projectsFa);

  const projects = useMemo((): ProjectMeta[] => {
    const localized = isPersian ? fa : en;
    if (localized.length > 0) {
      return localized;
    }
    return isPersian ? en : fa;
  }, [en, fa, isPersian]);

  const list = Array.isArray(projects) ? projects : [];
  const headingPrefix =
    variant === "home" ? "projects_home" : "projects_page";

  return (
    <div
      key={locale}
      className="w-full max-w-6xl mx-auto content-readable"
      dir={isPersian ? "rtl" : "ltr"}
    >
      {showHeading && (
        <div className="mb-6 sm:mb-8 lg:mb-10">
          {variant === "home" && (
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00c9d3]/70 mb-2">
              {t(`${headingPrefix}.eyebrow`)}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#00c9d3] tracking-tight">
            {t(`${headingPrefix}.title`)}
          </h2>
          <p className="text-sm sm:text-base text-[#dce8ef]/70 mt-1 sm:mt-2 font-mono leading-relaxed">
            {t(`${headingPrefix}.subtitle`)}
          </p>
        </div>
      )}

      {list.length === 0 ? (
        <p className="text-sm sm:text-base text-[#dce8ef]/60 font-mono">
          {t("projects_page.empty")}
        </p>
      ) : variant === "home" ? (
        <ProjectsHomePreview projects={list} />
      ) : (
        <>
          <div className="lg:hidden px-1">
            <ProjectsSlider projects={list} variant="page" />
          </div>

          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {list.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
