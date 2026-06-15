"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ProjectMeta } from "@/app/lib/project-types";
import TechStackIcons from "./TechStackIcons";

type ProjectsMobileListProps = {
  projects: ProjectMeta[];
};

export default function ProjectsMobileList({
  projects,
}: ProjectsMobileListProps) {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";
  const [selected, setSelected] = useState<ProjectMeta | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close]);

  const Chevron = isPersian ? ChevronLeft : ChevronRight;
  const statusKey = selected
    ? `projects_page.status_${selected.status.replace(/-/g, "_")}`
    : "";

  return (
    <>
      <p className="text-[11px] font-mono text-[#dce8ef]/45 mb-3">
        {t("projects_page.mobile_hint")}
      </p>

      <ul className="flex flex-col gap-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#dce8ef]/15 bg-[#0a2d3d] active:bg-[#0d3344] active:border-[#00c9d3]/40 transition-colors text-start"
            >
              <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-[#dce8ef]/10">
                <Image
                  src={project.image ?? "/projects/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-[#dce8ef] truncate mb-0.5">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-[11px] text-[#dce8ef]/55 line-clamp-1 mb-1.5">
                    {project.description}
                  </p>
                )}
                <TechStackIcons tags={project.tags ?? []} size="sm" />
              </div>

              <Chevron className="h-5 w-5 shrink-0 text-[#00c9d3]/60" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <>
            <motion.button
              type="button"
              aria-label={t("projects_page.close")}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed inset-x-0 bottom-0 z-[70] max-h-[88vh] overflow-y-auto rounded-t-2xl border-t border-[#00c9d3]/30 bg-[#0a2d3d] shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              dir={isPersian ? "rtl" : "ltr"}
            >
              <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-[#0a2d3d]">
                <div className="h-1 w-10 rounded-full bg-[#dce8ef]/25" />
              </div>

              <button
                type="button"
                onClick={close}
                className="absolute top-3 end-3 p-2 rounded-full text-[#dce8ef]/60 hover:text-[#00c9d3] hover:bg-[#0c3649]/80 transition-colors"
                aria-label={t("projects_page.close")}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="px-4 pb-6 pt-1 safe-area-pb">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#dce8ef]/15 mb-4">
                  <Image
                    src={selected.image ?? "/projects/placeholder.svg"}
                    alt={selected.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase text-[#00c9d3] border border-[#00c9d3]/30 rounded px-2 py-0.5">
                    {t(statusKey)}
                  </span>
                  <span className="text-[10px] font-mono text-[#dce8ef]/45">
                    {selected.createdAt}
                  </span>
                </div>

                <h2 className="text-lg font-medium text-[#00c9d3] mb-2 leading-snug">
                  {selected.title}
                </h2>

                {selected.description && (
                  <p className="text-sm text-[#dce8ef]/75 leading-relaxed mb-4">
                    {selected.description}
                  </p>
                )}

                <div className="mb-6">
                  <TechStackIcons tags={selected.tags ?? []} size="md" />
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/projects/${selected.slug}`}
                    className="w-full text-center py-3 rounded-xl bg-[#00c9d3] text-[#0c3649] text-sm font-medium active:opacity-90 transition-opacity"
                    onClick={close}
                  >
                    {t("projects_page.open_project")}
                  </Link>

                  {selected.github?.trim() && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#00c9d3]/40 text-[#00c9d3] text-sm font-mono active:bg-[#00c9d3]/10 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      {t("projects_page.view_github")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
