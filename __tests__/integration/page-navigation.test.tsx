import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import { DecisionTable, DecisionTableRunner } from '@/lib/decision-table';

// Decision table for page navigation tests
const navigationDecisionTable: DecisionTable = {
  name: 'Page Navigation Integration Tests',
  description: 'Tests navigation behavior and user interactions on the main page',
  conditions: ['hasHeroSection', 'hasProjectsSection', 'hasExperienceSection', 'hasViewProjectsButton'],
  actions: ['shouldRenderPage', 'shouldAllowNavigation', 'shouldScrollToProjects'],
  rules: [
    {
      id: 'R1',
      description: 'Complete page with all sections',
      conditions: {
        hasHeroSection: true,
        hasProjectsSection: true,
        hasExperienceSection: true,
        hasViewProjectsButton: true
      },
      expectedActions: {
        shouldRenderPage: true,
        shouldAllowNavigation: true,
        shouldScrollToProjects: true
      }
    },
    {
      id: 'R2',
      description: 'Page structure validation',
      conditions: {
        hasHeroSection: true,
        hasProjectsSection: true,
        hasExperienceSection: true,
        hasViewProjectsButton: true
      },
      expectedActions: {
        shouldRenderPage: true,
        shouldAllowNavigation: true,
        shouldScrollToProjects: true
      }
    }
  ]
};

// Test function for navigation decision table
async function testPageNavigation(conditions: Record<string, any>) {
  const { container } = render(<Home />);

  // Check if sections exist
  const heroSection = container.querySelector('section'); // First section should be hero
  const projectsSection = container.querySelector('#projects');
  const experienceSection = container.querySelector('section'); // Experience section
  const viewProjectsButton = screen.queryByRole('link', { name: /view projects/i });

  return {
    shouldRenderPage: container.firstChild !== null,
    shouldAllowNavigation: projectsSection !== null && viewProjectsButton !== null,
    shouldScrollToProjects: viewProjectsButton?.getAttribute('href') === '#projects'
  };
}

describe('Page Navigation Integration Tests', () => {
  // Generate Jest tests from decision table
  DecisionTableRunner.generateJestTests(navigationDecisionTable, testPageNavigation);

  describe('Full Page Integration', () => {
    it('should render all main sections', () => {
      render(<Home />);

      // Check for main sections
      expect(screen.getByText('Hi, I\'m Serhii Sliusarskyi')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      
      // Check for navigation elements
      const viewProjectsButton = screen.getByRole('link', { name: /view projects/i });
      expect(viewProjectsButton).toBeInTheDocument();
      expect(viewProjectsButton).toHaveAttribute('href', '#projects');
    });

    it('should have proper page structure and hierarchy', () => {
      const { container } = render(<Home />);
      
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      
      // Check if main contains the expected child components
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should handle scroll navigation to projects section', () => {
      render(<Home />);
      
      const viewProjectsButton = screen.getByRole('link', { name: /view projects/i });
      const projectsSection = screen.getByText('Projects').closest('section');
      
      expect(viewProjectsButton).toHaveAttribute('href', '#projects');
      expect(projectsSection).toHaveAttribute('id', 'projects');
    });
  });

  describe('User Flow Tests', () => {
    it('should complete the full user journey from hero to projects', () => {
      render(<Home />);

      // 1. User sees the hero section
      expect(screen.getByText('Hi, I\'m Serhii Sliusarskyi')).toBeInTheDocument();
      
      // 2. User sees the carousel text
      expect(screen.getByText(/I'm a full-stack JavaScript developer/)).toBeInTheDocument();
      
      // 3. User can click "View Projects" button
      const viewProjectsButton = screen.getByRole('link', { name: /view projects/i });
      expect(viewProjectsButton).toBeInTheDocument();
      
      // 4. Projects section exists and is accessible
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText(/Here are some of the projects I have worked on recently/)).toBeInTheDocument();
    });

    it('should display project information correctly', () => {
      render(<Home />);
      
      // Navigate to projects section
      const projectsSection = screen.getByText('Projects').closest('section');
      expect(projectsSection).toBeInTheDocument();
      
      // Check if projects are displayed (at least the portfolio project)
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
      expect(screen.getByText('My personal website where i describe yourself')).toBeInTheDocument();
    });

    it('should show project tags and technologies', () => {
      render(<Home />);
      
      // Check for technology tags
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  describe('Responsive Design Tests', () => {
    it('should apply responsive classes for different screen sizes', () => {
      const { container } = render(<Home />);
      
      // Check for responsive grid classes
      const projectsGrid = container.querySelector('.grid');
      expect(projectsGrid).toHaveClass('sm:grid-cols-2');
      
      // Check for responsive text classes
      const heading = screen.getByText('Hi, I\'m Serhii Sliusarskyi');
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'md:text-6xl');
    });

    it('should have proper spacing and layout classes', () => {
      const { container } = render(<Home />);
      
      // Check main layout
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      
      // Check sections have proper spacing
      const projectsSection = container.querySelector('#projects');
      expect(projectsSection).toHaveClass('py-24', 'px-4', 'max-w-4xl', 'mx-auto');
    });
  });

  describe('Accessibility Tests', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />);
      
      // Main heading should be h1
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Hi, I\'m Serhii Sliusarskyi');
      
      // Section headings should be h2
      const projectsHeading = screen.getByRole('heading', { level: 2, name: 'Projects' });
      expect(projectsHeading).toBeInTheDocument();
    });

    it('should have accessible navigation links', () => {
      render(<Home />);
      
      const viewProjectsButton = screen.getByRole('link', { name: /view projects/i });
      expect(viewProjectsButton).toHaveAttribute('href', '#projects');
      
      // Should be keyboard accessible (has proper role)
      expect(viewProjectsButton).toHaveAttribute('href');
    });

    it('should have proper image alt attributes', () => {
      render(<Home />);
      
      // Check if images have alt text (mocked, but structure should be there)
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });
});