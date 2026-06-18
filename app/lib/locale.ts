export type AppLocale = "en" | "fa";

export function normalizeLocale(language?: string): AppLocale {
  if (!language) {
    return "en";
  }

  const base = language.toLowerCase().split("-")[0];
  return base === "fa" ? "fa" : "en";
}

export function isPersianLocale(language?: string): boolean {
  return normalizeLocale(language) === "fa";
}
