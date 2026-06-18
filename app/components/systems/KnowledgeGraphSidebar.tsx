"use client";

import Link from "next/link";
import { useAppLocale } from "@/app/hooks/useAppLocale";

type GraphLink = {
  slug: string;
  title: string;
};

type KnowledgeGraphSidebarProps = {
  relatedSystems: GraphLink[];
  relatedProjects: GraphLink[];
};

export default function KnowledgeGraphSidebar({
  relatedSystems,
  relatedProjects,
}: KnowledgeGraphSidebarProps) {
  const { t, isPersian } = useAppLocale();

  if (relatedSystems.length === 0 && relatedProjects.length === 0) {
    return null;
  }

  return (
    <aside
      className="hidden xl:block sticky top-24 space-y-6"
      dir={isPersian ? "rtl" : "ltr"}
    >
      {relatedSystems.length > 0 && (
        <GraphSection
          title={t("systems_page.related_systems")}
          links={relatedSystems.map((item) => ({
            href: `/systems/${item.slug}`,
            title: item.title,
          }))}
        />
      )}

      {relatedProjects.length > 0 && (
        <GraphSection
          title={t("systems_page.related_projects")}
          links={relatedProjects.map((item) => ({
            href: `/projects/${item.slug}`,
            title: item.title,
          }))}
        />
      )}
    </aside>
  );
}

function GraphSection({
  title,
  links,
}: {
  title: string;
  links: { href: string; title: string }[];
}) {
  return (
    <div className="border border-[#dce8ef]/20 rounded-lg p-4 bg-[#0a2d3d]">
      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#00c9d3]/70 mb-3">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm sm:text-base text-[#dce8ef]/70 hover:text-[#00c9d3] transition-colors leading-relaxed block before:content-['·'] before:me-1.5 before:text-[#00c9d3]/40"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
