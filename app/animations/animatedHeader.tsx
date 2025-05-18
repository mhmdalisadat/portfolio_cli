"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const AnimatedHeader = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedHeader;
