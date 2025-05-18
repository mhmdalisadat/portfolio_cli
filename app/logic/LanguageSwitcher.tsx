"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

 const LanguageSwitcher = () => {
  const { i18n } = useTranslation("common");
  const router = useRouter();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    router.refresh();
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        onClick={toggleLanguage}
        defaultChecked
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={i18n.language === "fa"}
      />
      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#0077B5] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#0077B5] dark:peer-checked:bg-[#0077B5]"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {i18n.language === "fa" ? "فارسی" : "English"}
      </span>
    </label>
  );
}


export default LanguageSwitcher;
