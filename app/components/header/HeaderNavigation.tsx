"use client";

import Link from "next/link";
import { CodeXml, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../logic/LanguageSwitcher";
import { MobileMenu } from "./";

const HeaderNavigation = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-center items-center gap-8">
      <Link
        href="/"
        className="flex-shrink-0 transition-transform hover:scale-105 duration-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl flex items-center gap-2 font-bold text-color transition-colors ">
            {t("name")}
            <sub className="text-sm font-normal mt-5 text-gray-600">
              <CodeXml />
            </sub>
          </span>
        </div>
      </Link>

      <nav className="hidden lg:flex items-center gap-6">
        <Link
          href="/about"
          className="px-3 py-2 text-base font-medium text-gray-400 hover:text-[#0077B5] transition-all duration-300 hover:scale-105"
        >
          {t("about")}
        </Link>

        <Link
          href="/projects"
          className="px-3 py-2 text-base font-medium text-gray-400 hover:text-[#0077B5] transition-all duration-300 hover:scale-105"
        >
          {t("projects")}
        </Link>

        <Link
          href="/contact"
          className="px-3 py-2 text-base font-medium text-gray-400 hover:text-[#0077B5] transition-all duration-300 hover:scale-105"
        >
          {t("contact")}
        </Link>
      </nav>

      <div className="hidden lg:flex items-center">
        <div className="flex items-center gap-1">
          <Link
            href="https://github.com/yourusername"
            className="flex items-center gap-1 text-gray-400 hover:text-[#0077B5] px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={30} />
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            className="flex items-center gap-1 text-[#0077B5] hover:text-gray-300 px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={30} />
          </Link>
        </div>
      </div>

      <LanguageSwitcher />
      <MobileMenu />
    </div>
  );
};

export default HeaderNavigation;
