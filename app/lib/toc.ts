import type { TocHeading } from "./system-types";

export function slugify(text: string, fallbackIndex: number): string {
  const slug = text
    .trim()
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `section-${fallbackIndex}`;
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();

  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\s*#+\s*$/, "").trim();
    const base = slugify(text, headings.length);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count > 0 ? `${base}-${count}` : base;

    headings.push({ id, text, level });
  }

  return headings;
}

export function createHeadingIdMap(content: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const heading of extractHeadings(content)) {
    map.set(heading.text, heading.id);
  }
  return map;
}
