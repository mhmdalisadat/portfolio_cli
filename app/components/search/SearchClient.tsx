"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, FolderKanban, Network } from "lucide-react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { UnifiedSearchDocument } from "@/app/lib/search";
import { createSearchFuse, runSearch } from "@/app/lib/search-fuse";

type SearchClientProps = {
  index: UnifiedSearchDocument[];
};

function getDocumentHref(item: UnifiedSearchDocument): string {
  if (item.type === "page") {
    return item.href;
  }
  if (item.type === "system") {
    return `/systems/${item.slug}`;
  }
  return `/projects/${item.slug}`;
}

function getDocumentKey(item: UnifiedSearchDocument): string {
  if (item.type === "page") {
    return `page-${item.id}-${item.locale}`;
  }
  return `${item.type}-${item.slug}-${item.locale}`;
}

export default function SearchClient({ index }: SearchClientProps) {
  const { t, locale, isPersian } = useAppLocale();
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => createSearchFuse(index, locale), [index, locale]);

  const results = useMemo(() => runSearch(fuse, query, 24), [fuse, query]);

  const groupedResults = useMemo(() => {
    const groups = [
      { key: "page" as const, label: t("search_modal.group_pages"), items: [] as UnifiedSearchDocument[] },
      { key: "project" as const, label: t("search_modal.group_projects"), items: [] as UnifiedSearchDocument[] },
      { key: "system" as const, label: t("search_modal.group_systems"), items: [] as UnifiedSearchDocument[] },
    ];

    for (const { item } of results) {
      const group = groups.find((entry) => entry.key === item.type);
      group?.items.push(item);
    }

    return groups.filter((group) => group.items.length > 0);
  }, [results, t]);

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

        <div className="mt-6 space-y-5">
          {query.trim() && results.length === 0 && (
            <p className="text-sm text-[#dce8ef]/50 font-mono">
              {t("search_page.no_results")}
            </p>
          )}

          {groupedResults.map((group) => (
            <section key={group.key}>
              <h2 className="mb-2 px-1 text-[10px] font-mono uppercase tracking-wider text-[#dce8ef]/35">
                {group.label}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={getDocumentKey(item)}>
                    <Link
                      href={getDocumentHref(item)}
                      className="flex items-start gap-3 rounded-lg border border-[#dce8ef]/20 bg-[#0a2d3d] p-4 hover:border-[#00c9d3]/60 transition-colors"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0c3649] text-[#dce8ef]/60">
                        {item.type === "page" && <FileText size={16} />}
                        {item.type === "project" && <FolderKanban size={16} />}
                        {item.type === "system" && <Network size={16} />}
                      </span>
                      <span className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase text-[#00c9d3]/70">
                            {t(`search_modal.type_${item.type}`)}
                          </span>
                          {item.type === "system" && (
                            <span className="text-[10px] font-mono uppercase text-[#dce8ef]/40">
                              {item.status}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-medium text-[#dce8ef]">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-[#dce8ef]/60 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {item.tags.length > 0 && (
                          <p className="text-[10px] font-mono text-[#dce8ef]/40 mt-2">
                            {item.tags.join(" · ")}
                          </p>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
