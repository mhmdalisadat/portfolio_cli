"use client";

import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiFramer } from "react-icons/si";
import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";
import { myProjects } from "../data/works";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Works() {
  const [index, setIndex] = useState(0);
  const project = myProjects[index];

  let demoImage = project.spotlight || project.texture || project.logo;

  const isVideo = demoImage && demoImage.endsWith(".mp4");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 py-10">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full max-w-[1200px]">
        {/* Demo Image/Video Card */}
        <div className="w-full lg:w-[560px] h-[320px] sm:h-[400px] lg:h-[560px] border-4 border-gray-400 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index + "-demo-img"}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="absolute inset-0 w-full h-full"
            >
              {isVideo ? (
                <video
                  src={demoImage}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={demoImage}
                  alt={project.title + " demo"}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info Card */}
        <div
          className="w-full lg:w-[560px] h-auto lg:h-[560px] border-4 border-[#0077B5] rounded-2xl shadow-2xl p-6 sm:p-10 relative text-white flex flex-col justify-between overflow-hidden"
          dir="ltr"
          style={{ textAlign: "left" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index + "-info-content"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex flex-col items-start flex-1 w-full"
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                style={project.logoStyle || {}}
              >
                <img
                  src={project.logo}
                  alt={project.title}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {project.title}
              </h2>

              <p className="mb-3 text-slate-200">{project.desc}</p>
              <p className="mb-6 text-slate-400">{project.subdesc}</p>

              <div className="flex gap-3 mb-6 flex-wrap">
                {project.tags &&
                  project.tags.map((tag) => (
                    <span key={tag.id} className="bg-slate-700 p-2 rounded-md">
                      <img
                        src={tag.path}
                        alt={tag.name}
                        className="w-6 h-6"
                        title={tag.name}
                      />
                    </span>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom actions */}
          <div className="flex items-center justify-between w-full pt-6 lg:absolute lg:left-0 lg:bottom-0 lg:px-10 lg:pb-8">
            <button
              className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
            >
              <FiArrowLeft size={28} />
            </button>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-200 hover:text-orange-400 transition"
            >
              Check Live Site <FiExternalLink />
            </a>
            <button
              className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition"
              onClick={() =>
                setIndex((i) => Math.min(i + 1, myProjects.length - 1))
              }
              disabled={index === myProjects.length - 1}
            >
              <FiArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-6 flex-wrap justify-center">
        {myProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 text-lg font-bold ${
              index === i
                ? "bg-slate-800 text-[#0077B5] border-gray-400 scale-110"
                : "bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
            }`}
            aria-label={`Go to project ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
