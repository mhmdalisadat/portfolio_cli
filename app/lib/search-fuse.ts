import Fuse, { type IFuseOptions } from "fuse.js";
import type { Locale } from "./project-types";
import type { UnifiedSearchDocument } from "./search";

export const SEARCH_FUSE_OPTIONS: IFuseOptions<UnifiedSearchDocument> = {
  keys: [
    { name: "title", weight: 0.35 },
    { name: "description", weight: 0.15 },
    { name: "tags", weight: 0.2 },
    { name: "content", weight: 0.25 },
    { name: "slug", weight: 0.05 },
  ],
  threshold: 0.38,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function createSearchFuse(
  index: UnifiedSearchDocument[],
  locale: Locale
): Fuse<UnifiedSearchDocument> {
  return new Fuse(
    index.filter((doc) => doc.locale === locale),
    SEARCH_FUSE_OPTIONS
  );
}

export function runSearch(
  fuse: Fuse<UnifiedSearchDocument>,
  query: string,
  limit = 20
) {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }
  return fuse.search(trimmed).slice(0, limit);
}
