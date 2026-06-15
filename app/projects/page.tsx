import type { Metadata } from "next";
import { getProjectsByLocale } from "@/app/lib/projects";
import ProjectsGridClient from "@/app/components/projects/ProjectsGridClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Infrastructure and platform engineering projects",
};

export const dynamic = "force-static";

export default function ProjectsPage() {
  const { en, fa } = getProjectsByLocale();

  return (
    <main
      className="min-h-screen py-10 sm:py-14 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
    >
      <ProjectsGridClient projectsEn={en ?? []} projectsFa={fa ?? []} variant="page" />
    </main>
  );
}
