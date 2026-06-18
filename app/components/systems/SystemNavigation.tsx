"use client";

import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import type { SystemMeta } from "@/app/lib/system-types";
import SystemCard from "./SystemCard";

type SystemNavigationProps = {
  previous?: SystemMeta;
  next?: SystemMeta;
  relatedSystems: SystemMeta[];
};

export default function SystemNavigation({
  previous,
  next,
  relatedSystems,
}: SystemNavigationProps) {
  const { t, isPersian } = useAppLocale();

  return (
    <footer className="mt-12 sm:mt-16 pt-8 border-t border-[#dce8ef]/20 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previous ? (
          <NavLink
            direction="previous"
            system={previous}
            label={t("systems_page.previous")}
            isPersian={isPersian}
          />
        ) : (
          <div />
        )}
        {next ? (
          <NavLink
            direction="next"
            system={next}
            label={t("systems_page.next")}
            isPersian={isPersian}
          />
        ) : (
          <div />
        )}
      </div>

      {relatedSystems.length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#00c9d3]/70 mb-4">
            {t("systems_page.related_systems")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSystems.map((system) => (
              <SystemCard key={system.slug} system={system} />
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}

function NavLink({
  direction,
  system,
  label,
  isPersian,
}: {
  direction: "previous" | "next";
  system: SystemMeta;
  label: string;
  isPersian: boolean;
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/systems/${system.slug}`}
      className={`group block border border-[#dce8ef]/20 rounded-lg p-4 hover:border-[#00c9d3]/60 transition-colors bg-[#0a2d3d] ${
        isNext ? "sm:text-end" : ""
      }`}
      dir={isPersian ? "rtl" : "ltr"}
    >
      <span className="text-[10px] font-mono uppercase tracking-wider text-[#dce8ef]/50 block mb-1">
        {label}
      </span>
      <span className="text-base sm:text-lg text-[#dce8ef] font-normal group-hover:text-[#00c9d3] transition-colors">
        {isNext && !isPersian ? "→ " : ""}
        {system.title}
        {!isNext && !isPersian ? " ←" : ""}
        {isNext && isPersian ? " ←" : ""}
        {!isNext && isPersian ? " →" : ""}
      </span>
    </Link>
  );
}
