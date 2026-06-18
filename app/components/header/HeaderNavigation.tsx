"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import LanguageSwitcher from "../../logic/LanguageSwitcher";
import SearchTrigger from "../search/SearchTrigger";
import { MobileMenu } from "./";

const navLinks = [
  {
    id: 1,
    name: "home",
    href: "#home",
  },
  {
    id: 2,
    name: "projects",
    href: "#projects",
  },
  {
    id: 5,
    name: "systems",
    href: "#systems",
  },
  {
    id: 3,
    name: "Resume",
    href: "#Resume",
  },
];

const HeaderNavigation = () => {
  const { t, locale } = useAppLocale();

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-start items-center gap-8">
      <Link
        href="/"
        className="flex-shrink-0 transition-transform hover:scale-105 duration-300"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/sadot.svg"
            alt="Logo"
            width={120}
            height={70}
            className="h-auto"
          />
        </div>
      </Link>

      <nav className="hidden lg:flex items-center gap-6" key={locale}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            className="px-3 py-2 text-base font-medium text-[#dce8ef] hover:text-[#00c9d3] transition-all duration-300 hover:scale-105"
          >
            {t(link.name)}
          </a>
        ))}
      </nav>

      <SearchTrigger className="shrink-0" />

      <div className="hidden lg:flex items-center">
        <div className="flex items-center gap-1">
          <Link
            href="https://github.com/mhmdalisadat"
            className="flex items-center gap-1 text-[#dce8ef] hover:text-[#00c9d3] px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={30} />
          </Link>
          <Link
            href="https://linkedin.com/in/ali-sadat-583b6a395"
            className="flex items-center gap-1 text-[#00c9d3] hover:text-[#dce8ef] px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105"
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
