'use client';

import { useState } from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaTools } from 'react-icons/fa';
import { SiRedux, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiExpress } from 'react-icons/si';
import { ExperienceAccordion } from './ExperienceAccordion';
import type { ExperienceItem } from '@/lib/types';

const experienceData: ExperienceItem[] = [
  {
    key: 'frontend',
    title: 'Frontend Development',
    icon: <FaReact className="inline mr-2 text-cyan-300" size={24} />,
    summary: 'React, Next.js, TypeScript, Tailwind CSS, Redux',
    details: (
      <div className="pl-2 pt-2 text-white/90">
        <div className="flex flex-wrap gap-3 mb-2">
          <FaReact title="React" className="text-cyan-400" size={22} />
          <SiRedux title="Redux" className="text-purple-400" size={22} />
          <SiTypescript title="TypeScript" className="text-blue-400" size={22} />
          <SiTailwindcss title="Tailwind CSS" className="text-sky-400" size={22} />
        </div>
        <ul className="list-disc ml-5 text-sm">
          <li>Built responsive UIs with React and Next.js</li>
          <li>State management with Redux</li>
          <li>Styled with Tailwind CSS for rapid prototyping</li>
          <li>Type safety and scalability with TypeScript</li>
        </ul>
      </div>
    ),
  },
  {
    key: 'backend',
    title: 'Backend Development',
    icon: <FaNodeJs className="inline mr-2 text-green-400" size={24} />,
    summary: 'Node.js, Express, REST APIs, PostgreSQL, MongoDB, Sequelize',
    details: (
      <div className="pl-2 pt-2 text-white/90">
        <div className="flex flex-wrap gap-3 mb-2">
          <FaNodeJs title="Node.js" className="text-green-400" size={22} />
          <SiExpress title="Express" className="text-gray-300" size={22} />
          <SiPostgresql title="PostgreSQL" className="text-blue-500" size={22} />
          <SiMongodb title="MongoDB" className="text-green-600" size={22} />
          <FaDatabase title="Sequelize" className="text-yellow-400" size={22} />
        </div>
        <ul className="list-disc ml-5 text-sm">
          <li>Developed RESTful APIs with Node.js and Express</li>
          <li>Database design and management (PostgreSQL, MongoDB)</li>
          <li>ORM experience with Sequelize</li>
          <li>Authentication, validation, and error handling</li>
        </ul>
      </div>
    ),
  },
  {
    key: 'other',
    title: 'Other Skills',
    icon: <FaTools className="inline mr-2 text-orange-300" size={24} />,
    summary: 'Git, Docker, Agile, UI/UX, Postman',
    details: (
      <div className="pl-2 pt-2 text-white/90">
        <div className="flex flex-wrap gap-3 mb-2">
          <FaTools title="General Tools" className="text-orange-300" size={22} />
          <SiDocker title="Docker" className="text-blue-400" size={22} />
        </div>
        <ul className="list-disc ml-5 text-sm">
          <li>Version control with Git</li>
          <li>Containerization with Docker</li>
          <li>Agile methodologies for team collaboration</li>
          <li>UI/UX design principles</li>
          <li>API testing with Postman</li>
        </ul>
      </div>
    ),
  },
];

export default function Experience() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="exp" className="py-24 px-4 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-400">Experience</h2>
      <p className="text-lg mb-8 text-white/80">
        I am a web developer with experience in building modern, responsive web applications. My background includes working with various technologies and collaborating on diverse projects.
      </p>
      <ul className="space-y-4 text-left">
        {experienceData.map((item) => (
          <ExperienceAccordion
            key={item.key}
            item={item}
            open={openKey === item.key}
            onClick={() => setOpenKey(openKey === item.key ? null : item.key)}
          />
        ))}
      </ul>
    </section>
  );
}