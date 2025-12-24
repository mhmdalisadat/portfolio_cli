"use client";

import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const AnimatedFooterContent = () => {
  const { t } = useTranslation("common");
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-center px-4"
    >
      {/* جمله تاثیرگذار */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full max-w-4xl mx-auto text-center"
      >
        <p
          className="text-md sm:text-lg md:text-xl lg:text-2xl font-extrabold leading-relaxed"
          style={{ color: "#00c9d3" }}
        >
          <span style={{ color: "#00c9d3" }}>
            <span className="text-[#dce8ef]">"</span>
            {t("poem")}
            <span className="text-[#dce8ef]">"</span>
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedFooterContent;
