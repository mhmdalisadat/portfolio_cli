"use client";

import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { ProjectMeta } from "@/app/lib/project-types";
import ProjectDeployCard from "./ProjectDeployCard";
import ProjectsSlider from "./ProjectsSlider";

type ProjectsHomePreviewProps = {
  projects: ProjectMeta[];
};

export default function ProjectsHomePreview({
  projects,
}: ProjectsHomePreviewProps) {
  const { t, isPersian } = useAppLocale();

  return (
    <div dir={isPersian ? "rtl" : "ltr"} className="content-readable">
      <div className="border border-[#dce8ef]/15 rounded-xl overflow-hidden bg-[#0a2d3d]/50 shadow-[inset_0_1px_0_0_rgba(0,201,211,0.08)]">
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
        </div>

        <div className="p-3 sm:p-4 lg:p-5">
          <div className="lg:hidden">
            <ProjectsSlider projects={projects} variant="home" />
          </div>

          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
            {projects.map((project) => (
              <ProjectDeployCard
                key={project.slug}
                project={project}
                variant="home"
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
