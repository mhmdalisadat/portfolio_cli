"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ProjectMeta } from "@/app/lib/project-types";
import TechStackIcons from "./TechStackIcons";

type ProjectsHomePreviewProps = {
  projects: ProjectMeta[];
};

export default function ProjectsHomePreview({
  projects,
}: ProjectsHomePreviewProps) {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";

  return (
    <div dir={isPersian ? "rtl" : "ltr"}>
      <div className="border border-[#dce8ef]/15 rounded-lg overflow-hidden bg-[#0a2d3d]/50 shadow-[inset_0_1px_0_0_rgba(0,201,211,0.06)]">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-[#dce8ef]/15 bg-[#0c3649]/80">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#dce8ef]/45 truncate">
            {t("projects_home.terminal_user")}
          </span>
        </div>

        <div className="px-3 sm:px-4 py-3 border-b border-[#dce8ef]/10 bg-[#0c3649]/30">
          <p className="text-[11px] sm:text-xs font-mono text-[#00c9d3]/80">
            <span className="text-[#dce8ef]/40">{isPersian ? "" : "$ "}</span>
            {t("projects_home.terminal_cmd")}
          </p>
          <p className="text-[10px] font-mono text-[#dce8ef]/35 mt-1 lg:hidden">
            {t("projects_home.scroll_hint")}
          </p>
        </div>

        <div className="p-3 sm:p-4 lg:p-5">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:overflow-visible lg:snap-none lg:pb-0 lg:mx-0 lg:px-0">
            {projects.map((project, index) => (
              <DeployCard
                key={project.slug}
                project={project}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/projects"
        className="group mt-5 sm:mt-6 flex items-center justify-between gap-4 border border-[#dce8ef]/15 border-dashed rounded-lg px-4 py-3 sm:py-3.5 hover:border-[#00c9d3]/40 hover:bg-[#00c9d3]/5 transition-all duration-200"
      >
        <div className="min-w-0">
          <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-[#00c9d3]/60 mb-0.5">
            {t("projects_home.explore_label")}
          </span>
          <span className="text-sm sm:text-base font-mono text-[#dce8ef]/80 group-hover:text-[#00c9d3] transition-colors">
            {t("projects_home.explore_cta")}
          </span>
        </div>
        <span className="shrink-0 text-lg font-mono text-[#00c9d3]/50 group-hover:text-[#00c9d3] transition-colors">
          {isPersian ? "←" : "→"}
        </span>
      </Link>
    </div>
  );
}

function DeployCard({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const { t } = useTranslation("common");
  const [expanded, setExpanded] = useState(false);
  const statusKey = `projects_page.status_${project.status.replace(/-/g, "_")}`;
  const imageSrc = project.image ?? "/projects/placeholder.svg";
  const deployPath = `${t("projects_home.deploy_prefix")}/${project.slug}`;

  return (
    <article className="snap-center shrink-0 w-[min(88vw,320px)] lg:w-auto flex flex-col border border-[#dce8ef]/15 rounded-lg overflow-hidden bg-[#0c3649]/50 hover:border-[#00c9d3]/40 transition-colors group/card">
      <div className="px-3 py-2 border-b border-[#dce8ef]/10 bg-[#0a2d3d]/60 font-mono text-[10px] flex items-center justify-between gap-2">
        <span className="text-[#dce8ef]/40 truncate">
          <span className="text-[#00c9d3]/60">drwx</span> {deployPath}
        </span>
        <span className="shrink-0 text-[#dce8ef]/35">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-[#0c3649] border-b border-[#dce8ef]/10">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover opacity-75 group-hover/card:opacity-100 transition-opacity"
            sizes="(max-width: 1024px) 88vw, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c3649]/90 via-transparent to-transparent" />
          <span className="absolute bottom-2 start-2 text-[10px] font-mono uppercase text-[#00c9d3] border border-[#00c9d3]/30 bg-[#0c3649]/80 rounded px-1.5 py-0.5">
            {t(statusKey)}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-3 gap-2">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-sm font-medium text-[#dce8ef] group-hover/card:text-[#00c9d3] transition-colors leading-snug line-clamp-2">
            {project.title}
          </h3>
        </Link>

        {project.description && (
          <p
            className={`text-[11px] sm:text-xs text-[#dce8ef]/55 leading-relaxed ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {project.description}
          </p>
        )}

        <div className="mt-auto pt-1">
          <TechStackIcons tags={project.tags ?? []} size="sm" />
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#dce8ef]/10">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[10px] font-mono text-[#00c9d3]/70 hover:text-[#00c9d3] transition-colors truncate"
          >
            <span className="text-[#dce8ef]/35">$ </span>
            {t("projects_home.open_cmd")} {project.slug}
          </Link>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="lg:hidden shrink-0 text-[10px] font-mono text-[#dce8ef]/40 hover:text-[#00c9d3]"
          >
            {expanded
              ? t("projects_home.collapse")
              : t("projects_home.expand")}
          </button>
        </div>

        <span className="hidden sm:block text-[10px] font-mono text-[#dce8ef]/30">
          {project.createdAt}
        </span>
      </div>
    </article>
  );
}
