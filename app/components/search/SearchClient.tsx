"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import type { UnifiedSearchDocument } from "@/app/lib/search";

type SearchClientProps = {
  index: UnifiedSearchDocument[];
};

export default function SearchClient({ index }: SearchClientProps) {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";
  const locale = isPersian ? "fa" : "en";
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(
        index.filter((doc) => doc.locale === locale),
        {
          keys: [
            { name: "title", weight: 0.35 },
            { name: "description", weight: 0.15 },
            { name: "tags", weight: 0.2 },
            { name: "content", weight: 0.25 },
            { name: "slug", weight: 0.05 },
          ],
          threshold: 0.4,
          includeScore: true,
        }
      ),
    [index, locale]
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return fuse.search(query.trim()).slice(0, 12);
  }, [fuse, query]);

  return (
    <main
      className="min-h-screen py-10 sm:py-14 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-light text-[#00c9d3] mb-2">
          {t("search_page.title")}
        </h1>
        <p className="text-xs sm:text-sm text-[#dce8ef]/60 font-mono mb-6">
          {t("search_page.subtitle")}
        </p>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_page.placeholder")}
          className="w-full rounded-lg border border-[#dce8ef]/20 bg-[#0a2d3d] px-4 py-3 text-sm text-[#dce8ef] placeholder:text-[#dce8ef]/40 focus:border-[#00c9d3]/60 focus:outline-none"
          autoFocus
        />

        <ul className="mt-6 space-y-3">
          {query.trim() && results.length === 0 && (
            <li className="text-sm text-[#dce8ef]/50 font-mono">
              {t("search_page.no_results")}
            </li>
          )}
          {results.map(({ item }) => (
            <li key={`${item.type}-${item.slug}-${item.locale}`}>
              <Link
                href={
                  item.type === "system"
                    ? `/systems/${item.slug}`
                    : `/projects/${item.slug}`
                }
                className="block rounded-lg border border-[#dce8ef]/20 bg-[#0a2d3d] p-4 hover:border-[#00c9d3]/60 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase text-[#00c9d3]/70">
                    {item.type === "system"
                      ? t("search_page.type_system")
                      : t("search_page.type_project")}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#dce8ef]/40">
                    {item.status}
                  </span>
                </div>
                <h2 className="text-base font-medium text-[#dce8ef]">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-xs text-[#dce8ef]/60 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <p className="text-[10px] font-mono text-[#dce8ef]/40 mt-2">
                  {item.tags.join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
