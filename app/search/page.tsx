import type { Metadata } from "next";
import { buildSearchIndex } from "@/app/lib/search";
import SearchClient from "@/app/components/search/SearchClient";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search projects, systems, pages, tags, and engineering content.",
  path: "/search",
  noIndex: true,
});

export const dynamic = "force-static";

export default function SearchPage() {
  const index = buildSearchIndex();
  return (
    <main style={{ backgroundColor: "#0c3649" }}>
      <SearchClient index={index} />
    </main>
  );
}
