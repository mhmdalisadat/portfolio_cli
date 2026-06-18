"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { ProjectMeta } from "@/app/lib/project-types";
import TechStackIcons from "./TechStackIcons";

type ProjectCardProps = {
  project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { isPersian } = useAppLocale();
  const imageSrc = project.image ?? "/projects/placeholder.svg";

  return (
    <Link
      href={`/projects/${project.slug}`}
      dir={isPersian ? "rtl" : "ltr"}
      className="group flex flex-col h-full rounded-xl overflow-hidden bg-[#0a2d3d] border border-[#dce8ef]/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-[#00c9d3]/70 hover:shadow-[0_16px_48px_rgba(0,201,211,0.18)] hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative aspect-[16/9] sm:aspect-video bg-[#0c3649] overflow-hidden shrink-0">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d3d]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-[#00c9d3]/0 group-hover:ring-[#00c9d3]/25 transition-all duration-300" />
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2.5 min-w-0">
        <h3 className="text-lg sm:text-xl font-semibold text-[#dce8ef] group-hover:text-[#00c9d3] transition-colors line-clamp-2">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-sm sm:text-base text-[#dce8ef]/75 leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>
        )}

        <div className="mt-auto pt-1">
          <TechStackIcons tags={project.tags ?? []} size="sm" />
        </div>
      </div>
    </Link>
  );
}
