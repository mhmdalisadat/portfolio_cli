"use client";

import { useAppLocale } from "@/app/hooks/useAppLocale";
import { normalizeLocale } from "@/app/lib/locale";

const LanguageSwitcher = () => {
  const { i18n, isPersian } = useAppLocale();

  const toggleLanguage = () => {
    const current = normalizeLocale(i18n.resolvedLanguage ?? i18n.language);
    const newLang = current === "fa" ? "en" : "fa";
    void i18n.changeLanguage(newLang);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        onChange={toggleLanguage}
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isPersian}
      />
      <div className="relative w-9 h-5 bg-[#dce8ef] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00c9d3] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#dce8ef] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#0c3649] after:border-[#dce8ef] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00c9d3]"></div>
      <span className="ms-3 text-sm font-medium text-[#dce8ef]">
        {isPersian ? "فارسی" : "English"}
      </span>
    </label>
  );
};

export default LanguageSwitcher;
