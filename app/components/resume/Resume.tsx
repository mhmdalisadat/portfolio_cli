"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Phone,
  User,
  GraduationCap,
  Code,
  FolderOpen,
  Languages,
} from "lucide-react";

export default function Resume() {
  const { t, i18n } = useTranslation("common");
  const isPersian = i18n.language === "fa";
  const textAlign = isPersian ? "text-right" : "text-left";
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="about"
      className="min-h-screen flex items-center justify-center py-4 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-8"
      style={{ backgroundColor: "#0c3649" }}
      dir={isPersian ? "rtl" : "ltr"}
    >
      {/* A4 Paper Container */}
      <div
        className={`w-full max-w-[210mm] rounded-lg lg:rounded-2xl lg:[aspect-ratio:210/297] lg:min-h-[297mm] lg:max-h-[297mm] p-3 sm:p-4 lg:p-[20mm] ${textAlign}`}
        style={{
          backgroundColor: "#0c3649",
          border: "2px solid #00c9d3",
          boxShadow: prefersReducedMotion
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 201, 211, 0.1)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.98)",
          transition: prefersReducedMotion
            ? "opacity 0.6s ease-in"
            : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <div className="h-full flex flex-col">
          {/* 1. Identity */}
          <section className="mb-6 sm:mb-8 lg:mb-12">
            <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight"
                style={{ color: "#00c9d3" }}
              >
                {t("resume.name")}
              </h1>
              <div className="flex-shrink-0">
                <Image
                  src="/sadot.svg"
                  alt="Logo"
                  width={60}
                  height={60}
                  priority
                  quality={90}
                  className="h-auto w-auto sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-4">
              <p
                className="text-sm sm:text-base lg:text-lg font-normal inline"
                style={{ color: "#dce8ef" }}
              >
                {t("resume.role")}
              </p>
              <span className="mx-2" style={{ color: "#00c9d3" }}>
                •
              </span>
              <p
                className="text-sm sm:text-base lg:text-lg font-normal inline"
                style={{ color: "#dce8ef" }}
              >
                {t("resume.intro")}
              </p>
            </div>
            <p
              className="text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl"
              style={{ color: "#dce8ef" }}
            >
              {t("resume.summary")}
            </p>
          </section>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 flex-1">
            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {/* 2. Education */}
              <section
                className="border-t pt-4 sm:pt-6 lg:pt-8"
                style={{ borderColor: "#dce8ef" }}
              >
                <h2
                  className="text-xs lg:text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2"
                  style={{ color: "#00c9d3", letterSpacing: "0.1em" }}
                >
                  <GraduationCap className="h-3 w-3 lg:h-4 lg:w-4" />
                  {t("resume.education_title")}
                </h2>
                <p
                  className="text-sm lg:text-base leading-relaxed"
                  style={{ color: "#dce8ef" }}
                >
                  {t("resume.education_degree")}
                </p>
              </section>

              {/* 3. Technical Focus */}
              <section
                className="border-t pt-4 sm:pt-6 lg:pt-8"
                style={{ borderColor: "#dce8ef" }}
              >
                <h2
                  className="text-xs lg:text-sm font-medium uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2"
                  style={{ color: "#00c9d3", letterSpacing: "0.1em" }}
                >
                  <Code className="h-3 w-3 lg:h-4 lg:w-4" />
                  {t("resume.technical_focus_title")}
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p
                      className="text-xs lg:text-sm font-medium mb-2"
                      style={{ color: "#00c9d3" }}
                    >
                      {t("resume.infrastructure")}
                    </p>
                    <p
                      className="text-sm lg:text-base leading-relaxed"
                      style={{ color: "#dce8ef" }}
                    >
                      {t("resume.infrastructure_tools")}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs lg:text-sm font-medium mb-2"
                      style={{ color: "#00c9d3" }}
                    >
                      {t("resume.programming")}
                    </p>
                    <p
                      className="text-sm lg:text-base leading-relaxed"
                      style={{ color: "#dce8ef" }}
                    >
                      {t("resume.programming_tools")}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs lg:text-sm font-medium mb-2"
                      style={{ color: "#00c9d3" }}
                    >
                      {t("resume.databases")}
                    </p>
                    <p
                      className="text-sm lg:text-base leading-relaxed"
                      style={{ color: "#dce8ef" }}
                    >
                      {t("resume.databases_tools")}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs lg:text-sm font-medium mb-2"
                      style={{ color: "#00c9d3" }}
                    >
                      {t("resume.networking")}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-xs lg:text-sm font-medium mb-2"
                      style={{ color: "#00c9d3" }}
                    >
                      {t("resume.operating_systems")}
                    </p>
                    <p
                      className="text-sm lg:text-base leading-relaxed"
                      style={{ color: "#dce8ef" }}
                    >
                      {t("resume.operating_systems_tools")}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {/* 4. Projects */}
              <section
                className="border-t pt-4 sm:pt-6 lg:pt-8"
                style={{ borderColor: "#dce8ef" }}
              >
                <h2
                  className="text-xs lg:text-sm font-medium uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-2"
                  style={{ color: "#00c9d3", letterSpacing: "0.1em" }}
                >
                  <FolderOpen className="h-3 w-3 lg:h-4 lg:w-4" />
                  {t("resume.projects_title")}
                </h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://my.isatispooya.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm lg:text-base leading-relaxed block transition-colors duration-200"
                      style={{ color: "#dce8ef" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00c9d3";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#dce8ef";
                      }}
                    >
                      {t("resume.project_1")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://isatiscrowd.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm lg:text-base leading-relaxed block transition-colors duration-200"
                      style={{ color: "#dce8ef" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00c9d3";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#dce8ef";
                      }}
                    >
                      {t("resume.project_2")}
                    </a>
                  </li>
                  <li>
                    <p
                      className="text-sm lg:text-base leading-relaxed"
                      style={{ color: "#dce8ef" }}
                    >
                      {t("resume.project_3")}
                    </p>
                  </li>
                  <li>
                    <p
                      className="text-sm lg:text-base leading-relaxed"
                      style={{ color: "#dce8ef" }}
                    >
                      {t("resume.project_4")}
                    </p>
                  </li>
                  <li>
                    <a
                      href="https://github.com/mhmdalisadat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm lg:text-base leading-relaxed block transition-colors duration-200 font-medium"
                      style={{ color: "#00c9d3" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#dce8ef";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#00c9d3";
                      }}
                    >
                      {t("resume.more")}
                    </a>
                  </li>
                </ul>
              </section>

              {/* 5. Language */}
              <section
                className="border-t pt-4 sm:pt-6 lg:pt-8"
                style={{ borderColor: "#dce8ef" }}
              >
                <h2
                  className="text-xs lg:text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2"
                  style={{ color: "#00c9d3", letterSpacing: "0.1em" }}
                >
                  <Languages className="h-3 w-3 lg:h-4 lg:w-4" />
                  {t("resume.language_title")}
                </h2>
                <div className="space-y-2">
                  <p
                    className="text-sm lg:text-base leading-relaxed"
                    style={{ color: "#dce8ef" }}
                  >
                    {t("resume.persian")}
                  </p>
                  <p
                    className="text-sm lg:text-base leading-relaxed"
                    style={{ color: "#dce8ef" }}
                  >
                    {t("resume.english")}
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* 6. Contact - Bottom Section */}
          <section
            className="mt-auto pt-6 sm:pt-8 lg:pt-12 border-t"
            style={{ borderColor: "#00c9d3" }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <p
                className="text-sm sm:text-base lg:text-lg font-medium"
                style={{ color: "#00c9d3" }}
              >
                {t("resume.contact_cta")}
              </p>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <a
                  href="mailto:se.alisadat@gmail.com"
                  className="transition-transform duration-200 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    style={{ color: "#00c9d3" }}
                  />
                </a>
                <a
                  href="tel:+989140707704"
                  className="transition-transform duration-200 hover:scale-110"
                  aria-label="Phone"
                >
                  <Phone
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    style={{ color: "#00c9d3" }}
                  />
                </a>
                <a
                  href="https://github.com/mhmdalisadat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    style={{ color: "#00c9d3" }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/ali-sadat-583b6a395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    style={{ color: "#00c9d3" }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/mhmd.ali.sadat?igsh=aWozemwwNGJrY3k5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram
                    className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    style={{ color: "#00c9d3" }}
                  />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
