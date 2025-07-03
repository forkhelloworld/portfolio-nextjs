'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const carouselTexts = [
    "I'm a full-stack JavaScript developer who loves turning ideas into real, working applications.",
    "I enjoy building projects for the web — from interactive user interfaces to complete backend systems.",
    "My main focus is creating apps that are easy to use and solve real problems.",
    "I'm always curious, always learning, and always exploring new ways to build cool stuff.",
    "Let's create something amazing together!"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-[100vh] text-center gap-6 px-4"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
        Hi, I'm Serhii Sliusarskyi
      </h1>
      <div className="h-[4.5rem] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {carouselTexts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <a href="#projects" className="mt-4 inline-block px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-colors text-lg">
        View Projects
      </a>
    </motion.section>
  )
}