'use client';

import { projects } from "@/constants/projects";
import Project from "./Project";
import { motion } from "framer-motion";


export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-24 px-4 max-w-4xl mx-auto text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Projects
      </motion.h2>
      <motion.p
        className="text-lg mb-8 text-white/80 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Here are some of the projects I have worked on recently. Each project showcases different skills and technologies.
      </motion.p>
      <motion.div
        className="grid gap-8 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, idx) => (
          <Project key={project.name} info={project} index={idx} />
        ))}
      </motion.div>
    </motion.section>
  )
}