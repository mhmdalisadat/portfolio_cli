import type { Metadata } from "next";
import { buildSearchIndex } from "@/app/lib/search";
import SearchClient from "@/app/components/search/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search projects and systems",
};

export const dynamic = "force-static";

export default function SearchPage() {
  const index = buildSearchIndex();
  return <SearchClient index={index} />;
}
