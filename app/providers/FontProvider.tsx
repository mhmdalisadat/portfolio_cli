"use client";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function FontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";

  useEffect(() => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      const body = document.body;

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
    }
  }, [isPersian]);

  return <>{children}</>;
}
