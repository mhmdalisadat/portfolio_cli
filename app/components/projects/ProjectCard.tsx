"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { ProjectMeta } from "@/app/lib/project-types";
import TechStackIcons from "./TechStackIcons";

type ProjectCardProps = {
  project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";
  const imageSrc = project.image ?? "/projects/placeholder.svg";

  return (
    <Link
      href={`/projects/${project.slug}`}
      dir={isPersian ? "rtl" : "ltr"}
      className="group flex flex-col h-full border border-[#dce8ef]/20 rounded-lg sm:rounded-xl overflow-hidden bg-[#0a2d3d] hover:border-[#00c9d3]/60 transition-colors duration-200"
    >
      <div className="relative aspect-[16/9] sm:aspect-video bg-[#0c3649] border-b border-[#dce8ef]/10 shrink-0">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-5 gap-2 sm:gap-3 min-w-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-medium text-[#dce8ef] group-hover:text-[#00c9d3] transition-colors line-clamp-2">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-xs sm:text-sm text-[#dce8ef]/70 leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>
        )}

        <div className="mt-auto pt-1">
          <TechStackIcons tags={project.tags ?? []} size="sm" />
        </div>

        <span className="text-[10px] sm:text-xs font-mono text-[#dce8ef]/50 group-hover:text-[#00c9d3] transition-colors truncate">
          → {t("projects_page.view_detail")}
        </span>
      </div>
    </Link>
  );
}
