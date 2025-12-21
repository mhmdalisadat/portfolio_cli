"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../logic/LanguageSwitcher";

const navLinks = [
  {
    id: 1,
    name: "home",
    href: "#home",
  },
  {
    id: 2,
    name: "about",
    href: "#about",
  },
];

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("common");

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu(); // بستن منو بعد از کلیک
    }
  };

  return (
    <>
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-[#dce8ef] hover:text-[#00c9d3] hover:bg-[#0c3649]/50 focus:outline-none"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">باز کردن منو</span>
          {isMenuOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c3649] flex flex-col pt-6 px-4 pb-8 overflow-y-auto text-right">
          {/* Close button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 left-4 p-2 rounded-full text-[#dce8ef] hover:bg-[#0c3649]/50 focus:outline-none"
            aria-label="بستن منو"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Title */}
          <div className="mt-8 mb-6">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={closeMenu}
            >
              <Image
                src="/sadot.svg"
                alt="Logo"
                width={120}
                height={70}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="px-3 py-2 text-base font-medium text-[#dce8ef] hover:text-[#00c9d3] transition-all duration-300"
              >
                {t(link.name)}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="https://github.com/yourusername"
              className="flex items-center gap-1 text-[#dce8ef] hover:text-[#00c9d3] px-3 py-2 text-base font-medium transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={30} />
            </Link>
            <Link
              href="https://linkedin.com/in/yourusername"
              className="flex items-center gap-1 text-[#00c9d3] hover:text-[#dce8ef] px-3 py-2 text-base font-medium transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={30} />
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="mt-8">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
