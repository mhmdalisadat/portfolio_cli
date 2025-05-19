"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import { AnimatedContent } from "./AnimatedContent";
import { BackgroundEffects } from "./BackgroundEffects";
import { LandingData } from "@/app/services/landing";

interface LandingClientProps {
  data: LandingData | null;
}

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-screen-2xl rounded-3xl bg-black border-2 border-[#0077B5] overflow-hidden relative"
    >
      {children}
    </motion.div>
  );
};

export const LandingClient = ({ data }: LandingClientProps) => {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 " />
      <div className="w-full flex items-center justify-center">
        <MotionWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <BackgroundEffects />
            <AnimatedContent data={data} />
          </Suspense>
        </MotionWrapper>
      </div>
    </div>
  );
};
