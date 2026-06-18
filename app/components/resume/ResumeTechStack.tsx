"use client";

import {
  Activity,
  Box,
  Code2,
  Database,
  MessageSquare,
  Monitor,
  Server,
  type LucideIcon,
} from "lucide-react";
import { getTagIcon } from "@/app/lib/stack-icons";
import {
  RESUME_STACK_ITEMS,
  RESUME_STACK_SECTIONS,
  type ResumeStackSection,
} from "./resume-stack";

const SECTION_ICONS: Record<ResumeStackSection, LucideIcon> = {
  languages: Code2,
  containers: Box,
  databases: Database,
  messaging: MessageSquare,
  monitoring: Activity,
  operating_systems: Monitor,
  infrastructure: Server,
};

type ResumeTechStackProps = {
  label: (key: ResumeStackSection) => string;
};

function TechChip({ name }: { name: string }) {
  const icon = getTagIcon(name);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#dce8ef]/14 bg-[#0c3649]/55 px-2 py-1 text-xs sm:text-[13px] text-[#dce8ef]/88">
      {icon ? (
        <svg
          role="img"
          aria-hidden
          viewBox="0 0 24 24"
          width={14}
          height={14}
          xmlns="http://www.w3.org/2000/svg"
          fill={`#${icon.hex}`}
          className="shrink-0"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm bg-[#00c9d3]/15 font-mono text-[8px] font-medium text-[#00c9d3]"
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span>{name}</span>
    </span>
  );
}

export default function ResumeTechStack({ label }: ResumeTechStackProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
      {RESUME_STACK_SECTIONS.map((key) => {
        const SectionIcon = SECTION_ICONS[key];
        const items = RESUME_STACK_ITEMS[key];

        return (
          <div
            key={key}
            className={`rounded-lg border border-[#dce8ef]/12 bg-[#0c3649]/25 p-3 sm:p-3.5 ${
              key === "infrastructure" ? "sm:col-span-2" : ""
            }`}
          >
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#00c9d3]/10 text-[#00c9d3]">
                <SectionIcon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <h3 className="text-sm font-medium text-[#00c9d3]/90">
                {label(key)}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {items.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
