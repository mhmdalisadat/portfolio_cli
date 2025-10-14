"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Monitor, Code, Settings, Palette } from "lucide-react";
import Image from "next/image";

interface BlogUIProps {
  data: any;
}

const BlogUI = React.memo(({ data }: BlogUIProps) => {
  const { t } = useTranslation("common");

  if (!data || !data[0]) return null;

  const profileData = data[0];

  const stats = [
    {
      value: `${profileData.experience}`,
      label: t("about_page.stats.experience"),
    },
    {
      value: `${profileData.clientsServed}`,
      label: t("about_page.stats.clients"),
    },
    {
      value: `${profileData.projectsCompleted}`,
      label: t("about_page.stats.projects"),
    },
  ];

  const positions = [
    {
      title: t("about_page.positions.frontend.title"),
      description: t("about_page.positions.frontend.description"),
    },
    {
      title: t("about_page.positions.backend.title"),
      description: t("about_page.positions.backend.description"),
    },
    {
      title: t("about_page.positions.devops.title"),
      description: t("about_page.positions.devops.description"),
    },
    {
      title: t("about_page.positions.automation.title"),
      description: t("about_page.positions.automation.description"),
    },
  ];

  const positionIcons = [
    Monitor, // Frontend Engineer
    Code, // Backend Developer
    Settings, // DevOps Engineer
    Palette, // Full Stack Developer
  ];

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#0077B5] mb-6">
            {t("about_page.title")}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("about_page.description")}
          </p>
        </motion.div>

        {/* Statistics Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center gap-16 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="text-center relative"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Area with Image and Position Cards */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Column - Positions */}
            <div className="space-y-8">
              {positions.slice(0, 2).map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, x: -50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.2 },
                  }}
                  className="p-6"
                >
                  <div className="flex items-start mb-4">
                    <div>
                      <h3 className="text-lg text-left font-semibold text-white mb-2">
                        {position.title}
                      </h3>
                      <p className="text-gray-400 text-right text-sm leading-relaxed">
                        {position.description}
                      </p>
                    </div>
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: "#0077B5" }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.0 + index * 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {React.createElement(positionIcons[index], {
                        className: "w-6 h-6 text-white",
                      })}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-80 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                      "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                      "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  >
                    <Image
                      src="/me.png"
                      alt={profileData.name}
                      width={320}
                      height={320}
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Positions */}
            <div className="space-y-8">
              {positions.slice(2, 4).map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.0 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: -10,
                    transition: { duration: 0.2 },
                  }}
                  className="p-6"
                >
                  <div className="flex items-start mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: "#0077B5" }}
                      whileHover={{
                        scale: 1.1,
                        rotate: -5,
                        transition: { duration: 0.2 },
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.2 + index * 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {React.createElement(positionIcons[index + 2], {
                        className: "w-6 h-6 text-white",
                      })}
                    </motion.div>
                    <div className="mr-4">
                      <h3 className="text-lg text-right  font-semibold text-white mb-2">
                        {position.title}
                      </h3>
                      <p className="text-gray-400 text-right text-sm leading-relaxed">
                        {position.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BlogUI;
