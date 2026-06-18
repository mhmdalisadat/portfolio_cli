"use client";

import { useTranslation } from "react-i18next";
import { normalizeLocale, type AppLocale } from "@/app/lib/locale";

export function useAppLocale() {
  const { t, i18n } = useTranslation("common");
  const locale: AppLocale = normalizeLocale(
    i18n.resolvedLanguage ?? i18n.language
  );
  const isPersian = locale === "fa";

  return { t, i18n, locale, isPersian };
}
