"use client";

import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const AnimatedFooterContent = () => {
  const { t } = useTranslation("common");
  const socialLinks = [
    {
      icon: <Github className="text-[#00c9d3]" />,
      url: "https://github.com/mhmdalisadat",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="text-[#00c9d3]" />,
      url: "https://www.linkedin.com/in/ali-sadat-583b6a395",
      label: "LinkedIn",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container "
    >
 

      {/* جمله تاثیرگذار */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-center "
      >
        <p
          className="text-base sm:text-lg font-extrabold"
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
