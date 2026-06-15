"use client";

import { getTagIcon } from "@/app/lib/stack-icons";

type TechStackIconsProps = {
  tags?: string[];
  size?: "sm" | "md";
};

const sizeMap = {
  sm: 20,
  md: 24,
} as const;

export default function TechStackIcons({
  tags = [],
  size = "sm",
}: TechStackIconsProps) {
  const iconSize = sizeMap[size];
  const safeTags = tags ?? [];

  if (safeTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      {safeTags.map((tag) => {
        const icon = getTagIcon(tag);

        return icon ? (
          <svg
            key={tag}
            role="img"
            aria-label={tag}
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            xmlns="http://www.w3.org/2000/svg"
            fill={`#${icon.hex}`}
            className="opacity-85"
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span
            key={tag}
            aria-label={tag}
            className="inline-flex items-center justify-center rounded border border-[#00c9d3]/30 bg-[#0c3649] font-mono text-[#00c9d3] opacity-85"
            style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.38 }}
          >
            {tag.slice(0, 2).toUpperCase()}
          </span>
        );
      })}
    </div>
  );
}
