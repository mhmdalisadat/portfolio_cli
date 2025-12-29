"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useTranslation } from "react-i18next";

export const AnimatedContent = () => {
  const { t, i18n } = useTranslation("common");
  const shouldReduceMotion = useReducedMotion();

  // Get translated content
  const getTranslatedContent = (key: string) => {
    if (i18n.language === "fa") {
      switch (key) {
        case "heroTitle":
          return t("heroTitle");
        case "heroDescription":
          return t("heroDescription");
        case "description":
          return t("description");
        default:
          return t(key);
      }
    }
    return t(key);
  };

  // Animation variants for the floating shape
  // Purpose: Represents transformation, growth, and continuous evolution
  const morphVariants = {
    initial: {
      borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
      rotate: 0,
      scale: 1,
    },
    animate: shouldReduceMotion
      ? {}
      : {
          borderRadius: [
            "40% 60% 60% 40% / 60% 30% 70% 40%",
            "60% 40% 40% 60% / 40% 60% 40% 60%",
            "50% 50% 50% 50% / 55% 45% 55% 45%",
            "40% 60% 60% 40% / 60% 30% 70% 40%",
          ],
          rotate: [0, 90, 180, 360],
          scale: [1, 1.05, 1, 0.98, 1],
          y: [0, -20, 0],
        },
  };

  const morphTransition = {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Hero Section - Full Viewport Height */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl mx-auto flex items-center justify-center relative"
          style={{ overflow: "visible" }}
        >
          {/* Animated Abstract Shape - The Single Meaningful Element */}
          {/* Represents: Continuous transformation and growth */}
          <motion.div
            className="relative"
            style={{
              width: "clamp(280px, 40vw, 500px)",
              aspectRatio: "1",
              overflow: "visible",
            }}
            initial="initial"
            animate="animate"
          >
            {/* Outer Glow Layer 1 - #dce8ef */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, 
                  rgba(220, 232, 239, 0.6) 0%, 
                  rgba(220, 232, 239, 0.4) 30%,
                  rgba(220, 232, 239, 0.25) 50%, 
                  transparent 70%)`,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Outer Glow Layer 2 - #dce8ef */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: `radial-gradient(circle, 
                  rgba(220, 232, 239, 0.5) 0%, 
                  rgba(220, 232, 239, 0.35) 40%,
                  rgba(220, 232, 239, 0.2) 60%, 
                  transparent 80%)`,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.25,
              }}
            />

            {/* Main morphing shape - #dce8ef */}
            <motion.div
              variants={morphVariants}
              transition={morphTransition}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(220, 232, 239, 0.9) 0%, 
                  rgba(220, 232, 239, 0.85) 30%,
                  rgba(220, 232, 239, 0.88) 60%,
                  rgba(220, 232, 239, 0.85) 100%)`,
                backdropFilter: "blur(40px)",
                boxShadow: `
                  0 0 100px rgba(220, 232, 239, 0.7),
                  0 0 150px rgba(220, 232, 239, 0.5),
                  0 0 200px rgba(220, 232, 239, 0.4),
                  0 0 250px rgba(220, 232, 239, 0.2),
                  inset 0 0 80px rgba(220, 232, 239, 0.4),
                  inset 0 0 140px rgba(220, 232, 239, 0.3)
                `,
              }}
            />

            {/* Inner Glow Layer 1 - #dce8ef */}
            <motion.div
              className="absolute inset-[15%] rounded-full blur-2xl"
              style={{
                background: `radial-gradient(circle, 
                  rgba(220, 232, 239, 0.6) 0%, 
                  rgba(220, 232, 239, 0.4) 40%,
                  rgba(220, 232, 239, 0.25) 60%, 
                  transparent 80%)`,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Inner Glow Layer 2 - #dce8ef */}
            <motion.div
              className="absolute inset-[25%] rounded-full blur-xl"
              style={{
                background: `radial-gradient(circle, 
                  rgba(220, 232, 239, 0.55) 0%, 
                  rgba(220, 232, 239, 0.4) 50%, 
                  transparent 70%)`,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Additional Bright Center Core - #dce8ef */}
            <motion.div
              className="absolute inset-[30%] rounded-full blur-lg"
              style={{
                background: `radial-gradient(circle, 
                  rgba(220, 232, 239, 0.5) 0%, 
                  rgba(220, 232, 239, 0.35) 50%, 
                  transparent 70%)`,
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.75,
              }}
            />

            {/* Text Content Overlay - On blob but can overflow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center"
              style={{
                width: "max(100%, clamp(400px, 60vw, 700px))",
                overflow: "visible",
              }}
            >
              {/* Subheadline */}
              <motion.p
                variants={textVariants}
                className="text-base md:text-xl lg:text-2xl text-[#0c3649]/90 mb-2 md:mb-3 font-medium w-full"
              >
                {getTranslatedContent("hero_title") || "Hi! i'm Ali"}
              </motion.p>

              {/* Second Headline */}
              <motion.h2
                variants={textVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0c3649] leading-tight tracking-tight mb-4 md:mb-6 w-full whitespace-nowrap"
              >
                {getTranslatedContent("description") || "Software Engineer."}
              </motion.h2>

              {/* Primary CTA Button */}
              <motion.div variants={textVariants} className="pt-2">
                <motion.a
                  href="#Resume"
                  className="inline-block px-6 py-3 md:px-8 md:py-4 bg-[#00c9d3] text-[#0c3649] font-medium rounded-full text-base md:text-lg lg:text-xl transition-all hover:bg-[#00c9d3]/90 hover:shadow-lg hover:shadow-[#00c9d3]/30 focus:outline-none focus:ring-2 focus:ring-[#00c9d3] focus:ring-offset-2 focus:ring-offset-[#0c3649]"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                >
                  {t("Resume_me") || "View Work"}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Subtle */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.p
            className="text-sm text-[#dce8ef]/60 font-light"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.4, 0.8, 0.4],
                  }
            }
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            scroll down
          </motion.p>
          <motion.div
            className="w-5 h-8 border border-[#dce8ef]/40 rounded-full flex items-start justify-center p-1.5"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 4, 0],
                  }
            }
            transition={{
              duration: 0.75,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1 h-2 bg-[#dce8ef]/60 rounded-full"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, 8, 0],
                      opacity: [0.6, 1, 0.6],
                    }
              }
              transition={{
                duration: 0.75,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default AnimatedContent;
