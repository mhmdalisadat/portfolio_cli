"use client";

import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { SystemMeta } from "@/app/lib/system-types";

type SystemCardProps = {
  system: SystemMeta;
};

export default function SystemCard({ system }: SystemCardProps) {
  const { t, isPersian } = useAppLocale();
  const statusKey = `systems_page.status_${system.status}`;

  return (
    <Link
      href={`/systems/${system.slug}`}
      dir={isPersian ? "rtl" : "ltr"}
      className="group flex flex-col h-full border border-[#dce8ef]/20 rounded-lg sm:rounded-xl bg-[#0a2d3d] hover:border-[#00c9d3]/60 transition-colors duration-200"
    >
      <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-5 gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#dce8ef]/50">
            v{system.version}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00c9d3] border border-[#00c9d3]/30 rounded px-1.5 py-0.5">
            {t(statusKey)}
          </span>
        </div>

        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#dce8ef] group-hover:text-[#00c9d3] transition-colors leading-snug">
          {system.title}
        </h3>

        {system.description && (
          <p className="text-sm sm:text-base text-[#dce8ef]/75 leading-relaxed line-clamp-3 flex-1">
            {system.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {system.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-[#dce8ef]/50 border border-[#dce8ef]/15 rounded px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#dce8ef]/10">
          <span className="text-[10px] font-mono text-[#dce8ef]/50">
            {t("systems_page.updated")} {system.updatedAt}
          </span>
          <span className="text-[10px] font-mono text-[#dce8ef]/50 group-hover:text-[#00c9d3] transition-colors">
            {isPersian ? "←" : "→"}
          </span>
        </div>
      </div>
    </Link>
  );
}
