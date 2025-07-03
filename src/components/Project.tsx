import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectProps } from "../lib/types";

export default function Project({ info, index = 0 }: ProjectProps) {
  return (
   <motion.div
     initial={{ opacity: 0, y: 40 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, amount: 0.2 }}
     transition={{ duration: 0.6, delay: index * 0.15 }}
     className="bg-white/5 rounded-xl shadow-lg p-5 flex flex-col gap-4 border border-white/10 hover:scale-[1.03] transition-transform duration-200"
   >
    <Image alt={info.name} 
    width={400} 
    height={300} 
    src={info.image}
    className="rounded-xl border-t w-full object-cover aspect-video"/>
    <h2 className="text-xl font-semibold text-cyan-300 mt-2">{info.name}</h2>
    <p className="text-white/80 mb-2">{info.description}</p>
    {info.tags && info.tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-auto">
        {info.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-cyan-900/60 text-cyan-200 text-xs font-medium rounded-full border border-cyan-700/40 shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    )}
   </motion.div>
  );
}