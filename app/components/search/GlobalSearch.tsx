"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  CornerDownLeft,
  FileText,
  FolderKanban,
  Network,
  Search,
  X,
} from "lucide-react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { UnifiedSearchDocument } from "@/app/lib/search";
import { createSearchFuse, runSearch } from "@/app/lib/search-fuse";

type GlobalSearchProps = {
  index: UnifiedSearchDocument[];
  isOpen: boolean;
  onClose: () => void;
};

type SearchGroup = {
  key: "page" | "project" | "system";
  label: string;
  items: UnifiedSearchDocument[];
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

export default function GlobalSearch({
  index,
  isOpen,
  onClose,
}: GlobalSearchProps) {
  const router = useRouter();
  const { t, locale, isPersian } = useAppLocale();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(() => createSearchFuse(index, locale), [index, locale]);

  const flatResults = useMemo(
    () => runSearch(fuse, query, 24).map((result) => result.item),
    [fuse, query]
  );

  const groupedResults = useMemo((): SearchGroup[] => {
    const groups: SearchGroup[] = [
      { key: "page", label: t("search_modal.group_pages"), items: [] },
      { key: "project", label: t("search_modal.group_projects"), items: [] },
      { key: "system", label: t("search_modal.group_systems"), items: [] },
    ];

    for (const item of flatResults) {
      const group = groups.find((entry) => entry.key === item.type);
      group?.items.push(item);
    }

    return groups.filter((group) => group.items.length > 0);
  }, [flatResults, t]);

  const navigateTo = useCallback(
    (href: string) => {
      onClose();
      setQuery("");
      setActiveIndex(0);

      if (href.startsWith("/#")) {
        const hash = href.slice(1);
        if (window.location.pathname === "/") {
          window.history.replaceState(null, "", href);
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      router.push(href);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (!flatResults.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % flatResults.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex(
          (current) => (current - 1 + flatResults.length) % flatResults.length
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const item = flatResults[activeIndex];
        if (item) {
          navigateTo(getDocumentHref(item));
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, flatResults, isOpen, navigateTo, onClose]);

  useEffect(() => {
    const activeElement = listRef.current?.querySelector(
      `[data-search-index="${activeIndex}"]`
    );
    activeElement?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[10vh] sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          dir={isPersian ? "rtl" : "ltr"}
        >
          <button
            type="button"
            aria-label={t("search_modal.close")}
            className="absolute inset-0 bg-[#02151f]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("search_modal.title")}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#dce8ef]/15 bg-[#0a2d3d] shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-[#dce8ef]/10 px-4 py-3">
              <Search size={18} className="shrink-0 text-[#00c9d3]" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("search_modal.placeholder")}
                className="w-full bg-transparent text-sm text-[#dce8ef] placeholder:text-[#dce8ef]/40 focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-[#dce8ef]/50 transition-colors hover:bg-[#0c3649] hover:text-[#dce8ef]"
                aria-label={t("search_modal.close")}
              >
                <X size={18} />
              </button>
            </div>

            <div ref={listRef} className="max-h-[min(60vh,32rem)] overflow-y-auto p-2">
              {!query.trim() && (
                <p className="px-3 py-8 text-center text-sm text-[#dce8ef]/45 font-mono">
                  {t("search_modal.hint")}
                </p>
              )}

              {query.trim() && flatResults.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-[#dce8ef]/50 font-mono">
                  {t("search_modal.no_results")}
                </p>
              )}

              {groupedResults.map((group) => (
                <div key={group.key} className="mb-2 last:mb-0">
                  <p className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#dce8ef]/35">
                    {group.label}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      runningIndex += 1;
                      const itemIndex = runningIndex;
                      const isActive = itemIndex === activeIndex;
                      const href = getDocumentHref(item);

                      return (
                        <li key={getDocumentKey(item)}>
                          <button
                            type="button"
                            data-search-index={itemIndex}
                            onClick={() => navigateTo(href)}
                            onMouseEnter={() => setActiveIndex(itemIndex)}
                            className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-start transition-colors ${
                              isActive
                                ? "bg-[#00c9d3]/12 border border-[#00c9d3]/30"
                                : "border border-transparent hover:bg-[#0c3649]/70"
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                isActive
                                  ? "bg-[#00c9d3]/20 text-[#00c9d3]"
                                  : "bg-[#0c3649] text-[#dce8ef]/60"
                              }`}
                            >
                              {item.type === "page" && <FileText size={16} />}
                              {item.type === "project" && (
                                <FolderKanban size={16} />
                              )}
                              {item.type === "system" && <Network size={16} />}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="text-sm font-medium text-[#dce8ef]">
                                  {item.title}
                                </span>
                                <span className="rounded border border-[#dce8ef]/10 px-1.5 py-0.5 text-[10px] font-mono uppercase text-[#00c9d3]/70">
                                  {t(`search_modal.type_${item.type}`)}
                                </span>
                              </span>
                              {item.description && (
                                <span className="block text-xs text-[#dce8ef]/55 line-clamp-2">
                                  {item.description}
                                </span>
                              )}
                              {item.tags.length > 0 && (
                                <span className="mt-1.5 block text-[10px] font-mono text-[#dce8ef]/35 line-clamp-1">
                                  {item.tags.slice(0, 6).join(" · ")}
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dce8ef]/10 px-4 py-2.5 text-[10px] font-mono text-[#dce8ef]/35">
              <span>{t("search_modal.footer_scope")}</span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <ArrowUp size={12} />
                  <ArrowDown size={12} />
                  {t("search_modal.footer_navigate")}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CornerDownLeft size={12} />
                  {t("search_modal.footer_open")}
                </span>
                <Link
                  href="/search"
                  onClick={onClose}
                  className="text-[#00c9d3]/70 hover:text-[#00c9d3]"
                >
                  {t("search_modal.full_page")}
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
