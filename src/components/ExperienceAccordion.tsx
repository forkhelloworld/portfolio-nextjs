import type { ExperienceAccordionProps } from "@/lib/types";

export function ExperienceAccordion({ item, open, onClick }: ExperienceAccordionProps) {
  return (
    <li
      className={`bg-white/5 rounded-lg p-4 shadow-md transition-all duration-300 cursor-pointer hover:bg-cyan-900/30 ${open ? 'ring-2 ring-cyan-400' : ''}`}
      onClick={onClick}
      aria-expanded={open}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-cyan-300 flex items-center">{item.icon}{item.title}</span>
        <span className="text-white/70 text-sm">{item.summary}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        {open && item.details}
      </div>
    </li>
  );
}