"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, X, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const AnimatedFooterContent = () => {
  const { t } = useTranslation("common");
  const socialLinks = [
    { icon: <Github />, url: "https://github.com", label: "GitHub" },
    {
      icon: <Linkedin className="text-[#0077B5]" />,
      url: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="text-[#e1306c]" />,
      url: "https://instagram.com",
      label: "Instagram",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 max-w-5xl"
    >
      {/* لایسنس */}
      <div className="text-sm text-center md:text-left">
        © {new Date().getFullYear()} MyApp. Licensed under MIT
      </div>

      {/* جمله تاثیرگذار */}
      <motion.div whileHover={{ scale: 1.05 }} className="text-center">
        <p className="text-lg font-extrabold" style={{ color: "#0077B5" }}>
          <span style={{ color: "#0077B5" }}>
            <span className="text-gray-400">
              "
            </span>
            {t("poem")}
            <span className="text-gray-400">
              "
            </span>
          </span>
        </p>
      </motion.div>

      {/* آیکون‌های شبکه‌های اجتماعی */}
      <div className="flex space-x-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: "#0077B5" }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl"
            aria-label={link.label}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedFooterContent;
