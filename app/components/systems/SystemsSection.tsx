import { getFeaturedSystems, getSystemsByLocale } from "@/app/lib/systems";
import SystemsGridClient from "./SystemsGridClient";

export default function SystemsSection() {
  const { en, fa } = getSystemsByLocale();
  const featuredEn = getFeaturedSystems("en", 3);
  const featuredFa = getFeaturedSystems("fa", 3);

  return (
    <section
      id="systems"
      className="min-h-0 lg:min-h-screen flex items-center py-10 sm:py-14 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
    >
      <SystemsGridClient
        systemsEn={featuredEn.length > 0 ? featuredEn : en.slice(0, 3)}
        systemsFa={featuredFa.length > 0 ? featuredFa : fa.slice(0, 3)}
        showHeading
        limit={3}
        variant="home"
      />
    </section>
  );
}
