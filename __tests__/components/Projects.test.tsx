import React from 'react';
import { render, screen } from '@testing-library/react';
import { projectsListTable } from '@/lib/test-decision-tables';
import { DecisionTableRunner } from '@/lib/decision-table';

// Import Projects component
import Projects from '@/components/Projects';

// Test function for decision table
async function testProjectsListRendering(conditions: Record<string, any>) {
  const { container } = render(<Projects />);

  const sectionElement = container.querySelector('section');
  const gridElement = container.querySelector('.grid');
  const projectElements = container.querySelectorAll('[class*="bg-white/5"]');
  const gridClasses = gridElement?.className || '';

  return {
    shouldRenderSection: sectionElement !== null,
    shouldRenderGrid: gridElement !== null,
    shouldRenderProjects: projectElements.length > 0,
    gridColumns: gridClasses.includes('sm:grid-cols-2') ? 'sm:grid-cols-2' : 'other'
  };
}

describe('Projects Component - Decision Table Tests', () => {
  // Generate Jest tests from decision table
  DecisionTableRunner.generateJestTests(projectsListTable, testProjectsListRendering);

  describe('Content and Structure Tests', () => {
    it('should render section title and description', () => {
      render(<Projects />);
      
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText(/Here are some of the projects I have worked on recently/)).toBeInTheDocument();
    });

    it('should render projects from the projects array', () => {
      render(<Projects />);
      
      // Check if the project from constants is rendered
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
      expect(screen.getByText('My personal website where i describe yourself')).toBeInTheDocument();
    });

    it('should apply correct grid layout classes', () => {
      const { container } = render(<Projects />);
      const gridElement = container.querySelector('.grid');
      
      expect(gridElement).toHaveClass('grid');
      expect(gridElement).toHaveClass('gap-8');
      expect(gridElement).toHaveClass('sm:grid-cols-2');
    });

    it('should apply correct section styling', () => {
      const { container } = render(<Projects />);
      const sectionElement = container.querySelector('section');
      
      expect(sectionElement).toHaveClass('py-24');
      expect(sectionElement).toHaveClass('px-4');
      expect(sectionElement).toHaveClass('max-w-4xl');
      expect(sectionElement).toHaveClass('mx-auto');
      expect(sectionElement).toHaveClass('text-white');
    });

    it('should render project tags', () => {
      render(<Projects />);
      
      // Check for technology tags from the project
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  describe('Animation and Interaction Tests', () => {
    it('should have proper section id for navigation', () => {
      const { container } = render(<Projects />);
      const sectionElement = container.querySelector('section');
      
      expect(sectionElement).toHaveAttribute('id', 'projects');
    });

    it('should render with framer-motion components (mocked)', () => {
      render(<Projects />);
      
      // Since we're mocking framer-motion, we just verify the content renders
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
  });

  describe('Project Data Structure Tests', () => {
    it('should render project with image', () => {
      const { container } = render(<Projects />);
      
      // Check if image is rendered
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('should render project with proper structure', () => {
      const { container } = render(<Projects />);
      
      // Check if project container exists
      const projectContainer = container.querySelector('[class*="bg-white/5"]');
      expect(projectContainer).toBeInTheDocument();
    });
  });
});