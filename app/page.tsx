import Landing from "./components/landing";
import ProjectsSection from "./components/projects/ProjectsSection";
import SystemsSection from "./components/systems/SystemsSection";
import Resume from "./components/resume";
import JsonLd from "./components/seo/JsonLd";
import { webPageJsonLd, SITE_CONFIG } from "./lib/seo";

export const dynamic = "auto";
export const revalidate = 3600;

const Home = () => {
  return (
    <main id="home">
      <JsonLd
        data={webPageJsonLd({
          title: SITE_CONFIG.title,
          description: SITE_CONFIG.defaultDescription,
          path: "/",
        })}
      />
      <Landing />
      <Resume />
      <ProjectsSection />
      <SystemsSection />
    </main>
  );
};

export default Home;
