"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { normalizeLocale } from "@/app/lib/locale";

export default function FontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation("common");

  useEffect(() => {
    const applyLocale = (language: string) => {
      const locale = normalizeLocale(language);
      const isPersian = locale === "fa";
      const html = document.documentElement;
      const body = document.body;

      html.lang = locale;
      html.dir = isPersian ? "rtl" : "ltr";

      if (isPersian) {
        html.classList.add("font-modam");
        html.classList.remove("font-museo");
        body.classList.add("font-modam");
        body.classList.remove("font-museo");
        body.style.fontFamily = "var(--font-modam)";
      } else {
        html.classList.add("font-museo");
        html.classList.remove("font-modam");
        body.classList.add("font-museo");
        body.classList.remove("font-modam");
        body.style.fontFamily = "var(--font-museo)";
      }
    };

    applyLocale(i18n.resolvedLanguage ?? i18n.language);

    const onLanguageChanged = (language: string) => {
      applyLocale(language);
    };

    i18n.on("languageChanged", onLanguageChanged);

    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n]);

  return <>{children}</>;
}
