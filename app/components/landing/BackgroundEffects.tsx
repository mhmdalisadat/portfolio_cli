"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const BackgroundEffects = () => {
  return (
    <>
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
    </>
  );
};
