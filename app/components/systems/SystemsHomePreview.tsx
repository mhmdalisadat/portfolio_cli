"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SystemMeta } from "@/app/lib/system-types";

type SystemsHomePreviewProps = {
  systems: SystemMeta[];
};

export default function SystemsHomePreview({
  systems,
}: SystemsHomePreviewProps) {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";

  return (
    <div dir={isPersian ? "rtl" : "ltr"}>
      <div className="relative border border-[#dce8ef]/15 rounded-lg overflow-hidden bg-[#0a2d3d]/40">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-[#dce8ef]/15 bg-[#0c3649]/60">
          <span className="h-2 w-2 rounded-full bg-[#00c9d3]/60" />
          <span className="text-[10px] font-mono text-[#dce8ef]/50 tracking-wider">
            {t("systems_home.index_path")}
          </span>
        </div>

        <ol className="relative">
          {systems.map((system, index) => (
            <SystemIndexEntry
              key={system.slug}
              system={system}
              index={index + 1}
              isLast={index === systems.length - 1}
            />
          ))}
        </ol>
      </div>

      <Link
        href="/systems"
        className="group mt-5 sm:mt-6 flex items-center justify-between gap-4 border border-[#dce8ef]/15 border-dashed rounded-lg px-4 py-3 sm:py-3.5 bg-transparent hover:border-[#00c9d3]/40 hover:bg-[#00c9d3]/5 transition-all duration-200"
      >
        <div className="min-w-0">
          <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-[#00c9d3]/60 mb-0.5">
            {t("systems_home.explore_label")}
          </span>
          <span className="text-sm sm:text-base font-mono text-[#dce8ef]/80 group-hover:text-[#00c9d3] transition-colors">
            {t("systems_home.explore_cta")}
          </span>
        </div>
        <span className="shrink-0 text-lg font-mono text-[#00c9d3]/50 group-hover:text-[#00c9d3] transition-colors">
          {isPersian ? "←" : "→"}
        </span>
      </Link>
    </div>
  );
}

function SystemIndexEntry({
  system,
  index,
  isLast,
}: {
  system: SystemMeta;
  index: number;
  isLast: boolean;
}) {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";
  const [expanded, setExpanded] = useState(false);
  const statusKey = `systems_page.status_${system.status}`;
  const refId = `sys/${String(index).padStart(2, "0")}`;

  return (
    <li className="relative">
      {!isLast && (
        <span
          className="absolute top-10 bottom-0 w-px bg-[#00c9d3]/15 start-6 sm:start-7"
          aria-hidden
        />
      )}

      <div className="border-b border-[#dce8ef]/10 last:border-b-0">
        <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5">
          <div className="relative z-10 flex flex-col items-center shrink-0 pt-0.5">
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-[#00c9d3]/40 bg-[#0c3649] text-[9px] sm:text-[10px] font-mono text-[#00c9d3]">
              {String(index).padStart(2, "0")}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
              <span className="text-[10px] font-mono text-[#dce8ef]/35">
                {refId}
              </span>
              <span className="text-[10px] font-mono text-[#00c9d3]/70">
                v{system.version}
              </span>
              <span className="text-[10px] font-mono uppercase text-[#dce8ef]/40">
                {t(statusKey)}
              </span>
            </div>

            <Link
              href={`/systems/${system.slug}`}
              className="group/title block"
            >
              <h3 className="text-sm sm:text-base lg:text-lg font-medium text-[#dce8ef] group-hover/title:text-[#00c9d3] transition-colors leading-snug mb-1.5">
                {system.title}
              </h3>
            </Link>

            <p
              className={`text-xs sm:text-sm text-[#dce8ef]/55 leading-relaxed font-light ${
                expanded ? "" : "line-clamp-2 lg:line-clamp-none"
              }`}
            >
              {system.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
              {system.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-[#dce8ef]/40 before:content-['#']"
                >
                  {tag}
                </span>
              ))}
              <span className="text-[10px] font-mono text-[#dce8ef]/30 hidden sm:inline">
                · {system.updatedAt}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3 lg:hidden">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-[10px] font-mono text-[#dce8ef]/45 hover:text-[#00c9d3] transition-colors"
              >
                {expanded
                  ? t("systems_home.collapse")
                  : t("systems_home.expand")}
              </button>
              <Link
                href={`/systems/${system.slug}`}
                className="text-[10px] font-mono text-[#00c9d3]/70 hover:text-[#00c9d3] transition-colors"
              >
                {t("systems_home.read")} {isPersian ? "←" : "→"}
              </Link>
            </div>

            <Link
              href={`/systems/${system.slug}`}
              className="hidden lg:inline-flex mt-3 text-[10px] font-mono text-[#dce8ef]/40 hover:text-[#00c9d3] transition-colors items-center gap-1"
            >
              {t("systems_home.read")}
              <span>{isPersian ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
