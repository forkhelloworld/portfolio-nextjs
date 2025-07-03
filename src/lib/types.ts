import { ReactNode } from 'react';

export interface ExperienceItem {
  key: string;
  title: string;
  icon: ReactNode;
  summary: string;
  details: ReactNode;
}

export interface ExperienceAccordionProps {
  item: ExperienceItem;
  open: boolean;
  onClick: () => void;
}

export interface ProjectInfo {
  name: string;
  description: string;
  image: string;
  tags?: string[];
}

export interface ProjectProps {
  info: ProjectInfo;
  index?: number;
} 