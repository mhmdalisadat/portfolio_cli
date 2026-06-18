import type { Metadata } from "next";
import Resume from "../components/resume";
import JsonLd from "@/app/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  profilePageJsonLd,
} from "@/app/lib/seo";

const PAGE_TITLE = "Resume";
const PAGE_DESCRIPTION =
  "Resume of Ali Sadat — Software Engineer specializing in Golang backend, DevOps, Kubernetes, Docker, and infrastructure automation.";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/resume",
  keywords: [
    "Ali Sadat resume",
    "Golang developer CV",
    "DevOps engineer resume",
    "software engineer portfolio",
  ],
});

export const dynamic = "force-static";

export default function ResumePage() {
  return (
    <main style={{ backgroundColor: "#0c3649" }}>
      <JsonLd
        data={[
          profilePageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/resume" },
          ]),
        ]}
      />
      <Resume />
    </main>
  );
}
