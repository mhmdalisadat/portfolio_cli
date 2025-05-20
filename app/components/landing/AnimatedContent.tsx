"use client";

import { motion } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa";
import { LandingData } from "@/app/services/landing";
import { useTranslation } from "react-i18next";

interface AnimatedContentProps {
  data: LandingData | null;
}

export const AnimatedContent = ({ data }: AnimatedContentProps) => {
  const { t, i18n } = useTranslation("common");

  // Function to get translated content
  const getTranslatedContent = (key: keyof LandingData) => {
    if (i18n.language === "fa") {
      switch (key) {
        case "heroTitle":
          return t("hero_title");
        case "heroDescription":
          return t("hero_description");
        case "description":
          return t("description");
        default:
          return data?.[key] || t(key);
      }
    }
    return data?.[key] || t(key);
  };

  return (
    <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center h-[90vh] text-gray-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-4">
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left w-full md:w-1/2"
        >
          <div className="flex ">
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#0077B5] text-6xl"
            >
              <FaLaptopCode />
            </motion.div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold"
          >
            {getTranslatedContent("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-xl"
          >
            {getTranslatedContent("heroDescription")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg text-[#0077B5] mt-4"
          >
            {getTranslatedContent("description")}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <motion.a
              href="#blog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-full font-medium hover:bg-[#0077B5]/90 transition-colors"
            >
              <span>{t("about_me")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden border-2 border-[#0077B5]/30">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: [1.1, 1, 1.05] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full bg-gradient-to-br from-black to-[#0077B5]/20 flex items-center justify-center"
            >
              <img
                src="/landing.jpg"
                alt="me"
                className="w-full h-full object-cover"
                title="me"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[#0077B5]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedContent;
