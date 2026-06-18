import type { Metadata } from "next";
import { getProjectsByLocale } from "@/app/lib/projects";
import ProjectsGridClient from "@/app/components/projects/ProjectsGridClient";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/app/lib/seo";

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
  "Production infrastructure and platform engineering projects — Docker, Kubernetes, GitOps, PostgreSQL HA, Redis, and Golang backend systems.";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/projects",
  keywords: [
    "DevOps projects",
    "Kubernetes",
    "GitOps",
    "infrastructure engineering",
    "Golang backend",
    "portfolio projects",
  ],
});

export const dynamic = "force-static";

export default function ProjectsPage() {
  const { en, fa } = getProjectsByLocale();

  return (
    <main
      className="min-h-screen py-10 sm:py-14 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
    >
      <JsonLd
        data={[
          collectionPageJsonLd({
            title: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            path: "/projects",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/projects" },
          ]),
        ]}
      />
      <ProjectsGridClient projectsEn={en ?? []} projectsFa={fa ?? []} variant="page" />
    </main>
  );
}
