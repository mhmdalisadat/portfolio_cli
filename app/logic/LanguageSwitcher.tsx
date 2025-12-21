"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import i18nInstance from "../i18n";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation("common");
  const router = useRouter();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa";
    i18nInstance.changeLanguage(newLang);
    router.refresh();
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        onChange={toggleLanguage}
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={i18n.language === "fa"}
      />
      <div className="relative w-9 h-5 bg-[#dce8ef] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00c9d3] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#dce8ef] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#0c3649] after:border-[#dce8ef] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00c9d3]"></div>
      <span className="ms-3 text-sm font-medium text-[#dce8ef]">
        {i18n.language === "fa" ? "فارسی" : "English"}
      </span>
    </label>
  );
};

export default LanguageSwitcher;
