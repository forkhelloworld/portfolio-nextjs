import { SOCIAL_GITHUB, SOCIAL_LINKEDIN, SOCIAL_EMAIL, SOCIAL_TELEGRAM } from "../constants/socialLinks";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-16 bg-black/40 text-white/80 border-t border-white/10 text-center text-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
        <span>
          Designed & developed by Serhii Sliusarskyi
        </span>
        <span className="flex gap-4 justify-center">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Resume</a>
          <a href={SOCIAL_GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
          <a href={SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          <a href={`mailto:${SOCIAL_EMAIL}`} className="hover:text-cyan-400 transition-colors">Email</a>
          <a href={SOCIAL_TELEGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Telegram</a>
        </span>
      </div>
    </footer>
  );
} 