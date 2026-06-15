import { getFeaturedProjects, getProjectsByLocale } from "@/app/lib/projects";
import ProjectsGridClient from "./ProjectsGridClient";

export default function ProjectsSection() {
  const { en, fa } = getProjectsByLocale();
  const featuredEn = getFeaturedProjects("en", 3);
  const featuredFa = getFeaturedProjects("fa", 3);

  return (
    <section
      id="projects"
      className="min-h-0 lg:min-h-screen flex items-center py-10 sm:py-14 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
    >
      <ProjectsGridClient
        projectsEn={featuredEn}
        projectsFa={featuredFa}
        variant="home"
      />
    </section>
  );
}
