"use client";
import { motion } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa";
import { API_URL } from "../api";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LandingData {
  description: string;
  email: string;
  heroDescription: string;
  heroTitle: string;
  mobile: string;
}

const Landing = () => {
  const { t, i18n } = useTranslation("common");
  const [landingData, setLandingData] = useState<LandingData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/landing/`);
        const data = await response.json();
        setLandingData(data);
      } catch (error) {
        console.error("Error fetching landing data:", error);
      }
    };

    fetchData();
  }, []);

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
          return landingData?.[key] || t(key);
      }
    }
    return landingData?.[key] || t(key);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-screen-2xl rounded-3xl bg-black border-2 border-[#0077B5] overflow-hidden relative"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#0077B5]/20 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0077B5]/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center h-[90vh] text-white">
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
                className="mt-8 flex flex-col gap-4"
              >
                <motion.a
                  href={`mailto:${landingData?.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[#0077B5] text-white rounded-full font-medium text-lg text-center"
                >
                  {t("contact_me")}
                </motion.a>
                <motion.a
                  href={`tel:${landingData?.mobile}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-[#0077B5] text-white rounded-full font-medium text-lg text-center"
                >
                  {t("call_me")}
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
                  <div className="text-[#0077B5] text-opacity-80 text-center px-4">
                    <svg
                      className="w-24 h-24 mx-auto mb-4 opacity-60"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="text-lg">{t("add_portfolio_image")}</p>
                  </div>
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
      </motion.div>
    </div>
  );
};

export default Landing;
