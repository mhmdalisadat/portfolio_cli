"use client";

import { useMemo, useState } from "react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import Fuse from "fuse.js";
import type { SystemMeta } from "@/app/lib/system-types";
import { SYSTEM_FILTER_CATEGORIES } from "@/app/lib/system-types";
import SystemCard from "./SystemCard";
import SystemsHomePreview from "./SystemsHomePreview";

type SystemsGridClientProps = {
  systemsEn?: SystemMeta[];
  systemsFa?: SystemMeta[];
  showHeading?: boolean;
  limit?: number;
  variant?: "home" | "page";
};

function asSystemList(value: unknown): SystemMeta[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is SystemMeta =>
      item != null && typeof item === "object" && "slug" in item
  );
}

export default function SystemsGridClient({
  systemsEn,
  systemsFa,
  showHeading = true,
  limit,
  variant = "page",
}: SystemsGridClientProps) {
  const { t, locale, isPersian } = useAppLocale();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const en = asSystemList(systemsEn);
  const fa = asSystemList(systemsFa);

  const systems = useMemo((): SystemMeta[] => {
    const localized = isPersian ? fa : en;
    if (localized.length > 0) {
      return localized;
    }
    return isPersian ? en : fa;
  }, [en, fa, isPersian]);

  const fuse = useMemo(
    () =>
      new Fuse(systems, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "description", weight: 0.25 },
          { name: "tags", weight: 0.25 },
          { name: "slug", weight: 0.1 },
        ],
        threshold: 0.4,
      }),
    [systems]
  );

  const filtered = useMemo(() => {
    let list = systems;

    if (activeFilter !== "All") {
      list = list.filter((system) =>
        system.tags.some(
          (tag) => tag.toLowerCase() === activeFilter.toLowerCase()
        )
      );
    }

    if (query.trim()) {
      list = fuse.search(query.trim()).map((result) => result.item);
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  }, [systems, activeFilter, query, fuse, limit]);

  const showSearchAndFilters = !limit;
  const isHomePreview = variant === "home" || Boolean(limit);

  const headingPrefix = variant === "home" ? "systems_home" : "systems_page";

  return (
    <div
      key={locale}
      className="w-full max-w-6xl mx-auto content-readable"
      dir={isPersian ? "rtl" : "ltr"}
    >
      {showHeading && (
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00c9d3]/70 mb-2">
            {t(`${headingPrefix}.eyebrow`)}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#00c9d3] tracking-tight mb-2">
            {t(`${headingPrefix}.title`)}
          </h2>
          <p className="text-sm sm:text-base text-[#dce8ef]/70 max-w-2xl leading-relaxed font-mono">
            {t(`${headingPrefix}.subtitle`)}
          </p>
        </div>
      )}

      {showSearchAndFilters && (
        <div className="mb-6 sm:mb-8 space-y-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("systems_page.search_placeholder")}
            className="w-full max-w-md rounded-lg border border-[#dce8ef]/20 bg-[#0a2d3d] px-4 py-2.5 text-base text-[#dce8ef] placeholder:text-[#dce8ef]/40 focus:border-[#00c9d3]/60 focus:outline-none font-mono"
          />

          <div className="flex flex-wrap gap-2">
            <FilterChip
              label={t("systems_page.filter_all")}
              active={activeFilter === "All"}
              onClick={() => setActiveFilter("All")}
            />
            {SYSTEM_FILTER_CATEGORIES.map((category) => (
              <FilterChip
                key={category}
                label={category}
                active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
              />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm sm:text-base text-[#dce8ef]/60 font-mono">
          {t("systems_page.empty")}
        </p>
      ) : isHomePreview ? (
        <SystemsHomePreview systems={filtered} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {filtered.map((system) => (
            <SystemCard key={system.slug} system={system} />
          ))}
        </div>
      )}

    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs sm:text-sm font-mono px-2.5 py-1 rounded border transition-colors ${
        active
          ? "border-[#00c9d3]/50 text-[#00c9d3] bg-[#00c9d3]/5"
          : "border-[#dce8ef]/20 text-[#dce8ef]/50 hover:border-[#00c9d3]/40 hover:text-[#dce8ef]/70"
      }`}
    >
      {label}
    </button>
  );
}
