"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { ProjectMeta } from "@/app/lib/project-types";
import TechStackIcons from "./TechStackIcons";

type ProjectDeployCardProps = {
  project: ProjectMeta;
  variant?: "home" | "page";
};

export default function ProjectDeployCard({
  project,
  variant = "home",
}: ProjectDeployCardProps) {
  const { t, isPersian } = useAppLocale();
  const imageSrc = project.image ?? "/projects/placeholder.svg";
  const deployPath = `${t("projects_home.deploy_prefix")}/${project.slug}`;
  const isHome = variant === "home";

  return (
    <Link
      href={`/projects/${project.slug}`}
      dir={isPersian ? "rtl" : "ltr"}
      className="group/card flex flex-col h-full rounded-xl overflow-hidden bg-[#0a2d3d] border border-[#dce8ef]/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-[#00c9d3]/70 hover:shadow-[0_12px_40px_rgba(0,201,211,0.15)] transition-all duration-300"
    >
      {isHome && (
        <div className="px-3 py-1.5 border-b border-[#dce8ef]/10 bg-[#0c3649]/80 font-mono text-[10px] truncate">
          <span className="text-[#00c9d3]/70">drwx</span>{" "}
          <span className="text-[#dce8ef]/40">{deployPath}</span>
        </div>
      )}

      <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden bg-[#0c3649]">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 1024px) 90vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d3d] via-[#0a2d3d]/20 to-transparent opacity-90" />
        <div className="absolute inset-0 ring-1 ring-inset ring-[#00c9d3]/0 group-hover/card:ring-[#00c9d3]/30 transition-all duration-300" />
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2.5">
        <h3 className="text-lg sm:text-xl font-semibold text-[#dce8ef] group-hover/card:text-[#00c9d3] transition-colors leading-snug line-clamp-2">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-sm sm:text-base text-[#dce8ef]/75 leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <TechStackIcons tags={project.tags ?? []} size="sm" />
        </div>

        <span className="text-[10px] font-mono text-[#00c9d3]/50 group-hover/card:text-[#00c9d3] transition-colors pt-1">
          <span className="text-[#dce8ef]/30">{isPersian ? "" : "$ "}</span>
          {t("projects_home.open_cmd")} {project.slug}
          <span className="ms-1">{isPersian ? "←" : "→"}</span>
        </span>
      </div>
    </Link>
  );
}
