"use client";

import { I18nextProvider } from "react-i18next";
import i18nInstance from "../i18n";
import { ReactNode } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
