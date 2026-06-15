import type { Metadata } from "next";
import { getSystemsByLocale } from "@/app/lib/systems";
import SystemsGridClient from "@/app/components/systems/SystemsGridClient";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Mental models, decision frameworks, operating systems, and systems-thinking artifacts",
};

export const dynamic = "force-static";

export default function SystemsPage() {
  const { en, fa } = getSystemsByLocale();

  return (
    <main
      className="min-h-screen py-10 sm:py-14 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
    >
      <SystemsGridClient systemsEn={en} systemsFa={fa} />
    </main>
  );
}
