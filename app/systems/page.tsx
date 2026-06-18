import type { Metadata } from "next";
import { getSystemsByLocale } from "@/app/lib/systems";
import SystemsGridClient from "@/app/components/systems/SystemsGridClient";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/app/lib/seo";

const PAGE_TITLE = "Systems";
const PAGE_DESCRIPTION =
  "Mental models, decision frameworks, operating systems, and systems-thinking artifacts for engineering, infrastructure, and decision making.";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/systems",
  keywords: [
    "systems thinking",
    "mental models",
    "decision frameworks",
    "operating models",
    "engineering philosophy",
  ],
});

export const dynamic = "force-static";

export default function SystemsPage() {
  const { en, fa } = getSystemsByLocale();

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
            path: "/systems",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/systems" },
          ]),
        ]}
      />
      <SystemsGridClient systemsEn={en} systemsFa={fa} />
    </main>
  );
}
