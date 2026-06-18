"use client";

import { useEffect, useState } from "react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { TocHeading } from "@/app/lib/system-types";

type TableOfContentsProps = {
  headings: TocHeading[];
};

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const { t, isPersian } = useAppLocale();
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    setActiveId("");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    for (const heading of headings) {
      const element = document.querySelector(
        `article.prose-system #${CSS.escape(heading.id)}`
      );
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const tocList = (
    <ul className="space-y-1">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector(
                `article.prose-system #${CSS.escape(heading.id)}`
              );
              target?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setMobileOpen(false);
            }}
            className={`block text-sm leading-relaxed transition-colors ${
              heading.level === 3 ? "ps-3" : ""
            } ${
              activeId === heading.id
                ? "text-[#00c9d3] font-medium"
                : "text-[#dce8ef]/60 hover:text-[#dce8ef]/85"
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="w-full flex items-center justify-between text-sm font-mono uppercase tracking-wider text-[#00c9d3] border border-[#dce8ef]/20 rounded-lg px-3 py-2.5"
        >
          {t("systems_page.toc")}
          <span className="text-[#dce8ef]/40">{mobileOpen ? "−" : "+"}</span>
        </button>
        {mobileOpen && (
          <nav
            className="mt-2 p-3 border border-[#dce8ef]/20 rounded-lg bg-[#0a2d3d]"
            dir={isPersian ? "rtl" : "ltr"}
          >
            {tocList}
          </nav>
        )}
      </div>

      <nav
        className="hidden lg:block sticky top-24"
        aria-label={t("systems_page.toc")}
        dir={isPersian ? "rtl" : "ltr"}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#00c9d3]/70 mb-3">
          {t("systems_page.toc")}
        </p>
        {tocList}
      </nav>
    </>
  );
}
