"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { ProjectMeta } from "@/app/lib/project-types";
import ProjectDeployCard from "./ProjectDeployCard";

type ProjectsSliderProps = {
  projects: ProjectMeta[];
  variant?: "home" | "page";
};

export default function ProjectsSlider({
  projects,
  variant = "home",
}: ProjectsSliderProps) {
  const { t, isPersian } = useAppLocale();
  const [index, setIndex] = useState(0);
  const count = projects.length;

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count]
  );

  if (count === 0) {
    return null;
  }

  const PrevIcon = isPersian ? ChevronRight : ChevronLeft;
  const NextIcon = isPersian ? ChevronLeft : ChevronRight;
  const project = projects[index];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: isPersian ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isPersian ? 24 : -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold) {
                go(1);
              } else if (info.offset.x > threshold) {
                go(-1);
              }
            }}
          >
            <ProjectDeployCard project={project} variant={variant} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t("projects_home.slider_prev")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce8ef]/20 text-[#dce8ef]/60 hover:border-[#00c9d3]/50 hover:text-[#00c9d3] transition-colors"
        >
          <PrevIcon className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {projects.map((item, dotIndex) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`${dotIndex + 1} / ${count}`}
              onClick={() => setIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                dotIndex === index
                  ? "w-6 bg-[#00c9d3]"
                  : "w-1.5 bg-[#dce8ef]/25 hover:bg-[#dce8ef]/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t("projects_home.slider_next")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce8ef]/20 text-[#dce8ef]/60 hover:border-[#00c9d3]/50 hover:text-[#00c9d3] transition-colors"
        >
          <NextIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
