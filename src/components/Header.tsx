'use client';

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { SOCIAL_GITHUB, SOCIAL_LINKEDIN, SOCIAL_EMAIL, SOCIAL_TELEGRAM } from "../constants/socialLinks";

export default function Header() {
  return (
    <header className="fixed bg-black/40 p-4 w-full backdrop-blur-md z-20 top-0 border-b border-white/10 shadow-lg">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <span className="text-xl font-bold tracking-wide text-white select-none">Serhii</span>
        <nav className="flex gap-8 text-white/90 text-base font-medium">
          <Link href="#about" className="hover:text-cyan-400 transition-colors">About</Link>
          <Link href="#exp" className="hover:text-cyan-400 transition-colors">Experience</Link>
          <Link href="#projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Resume</a>
        </nav>
        <nav className="text-2xl flex gap-4 text-white/80">
          <a href={SOCIAL_GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-cyan-400 transition-colors"><FaGithub/></a>
          <a href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors"><FaLinkedin /></a>
          <a href={`mailto:${SOCIAL_EMAIL}`} aria-label="Email" className="hover:text-cyan-400 transition-colors"><MdEmail /></a>
          <a href={SOCIAL_TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-cyan-400 transition-colors"><FaTelegramPlane /></a>
        </nav>
      </div>
    </header>
  )
}
