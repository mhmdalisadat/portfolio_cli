import Landing from "./components/landing";
import ProjectsSection from "./components/projects/ProjectsSection";
import SystemsSection from "./components/systems/SystemsSection";
import Resume from "./components/resume/Resume";

// Enable static generation for better performance
// Note: Using auto instead of force-static to allow client components to work properly
export const dynamic = "auto";
export const revalidate = 3600; // Revalidate every hour

const Home = () => {
  return (
    <div>
      <section id="home">
        <Landing />
        <ProjectsSection />
        <SystemsSection />
        <Resume />
      </section>
    </div>
  );
};

export default Home;
