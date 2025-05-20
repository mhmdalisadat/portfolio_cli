"use client";

import Link from "next/link";
import { CodeXml, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../logic/LanguageSwitcher";
import { MobileMenu } from "./";

const navLinks = [
  {
    id: 1,
    name: 'home',
    href: '#home',
  },
  {
    id: 2,
    name: 'about',
    href: '#about',
  },
  {
    id: 3,
    name: 'projects',
    href: '#work',
  },
  {
    id: 4,
    name: 'contact',
    href: '#contact',
  },
];

const HeaderNavigation = () => {
  const { t } = useTranslation("common");

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            className="px-3 py-2 text-base font-medium text-gray-400 hover:text-[#0077B5] transition-all duration-300 hover:scale-105"
          >
            {t(link.name)}
          </a>
        ))}
      </nav>

      <div className="hidden lg:flex items-center">
        <div className="flex items-center gap-1">
          <Link
            href="https://github.com/mhmdalisadat"
            className="flex items-center gap-1 text-gray-400 hover:text-[#0077B5] px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={30} />
          </Link>
          <Link
            href="https://linkedin.com/in/mhmdalisadat"
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