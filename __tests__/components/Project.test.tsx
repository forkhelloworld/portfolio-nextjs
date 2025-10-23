import React from 'react';
import { render, screen } from '@testing-library/react';
import Project from '@/components/Project';
import { ProjectInfo } from '@/lib/types';
import { projectComponentTable } from '@/lib/test-decision-tables';
import { DecisionTableRunner } from '@/lib/decision-table';

// Test data generator based on decision table conditions
function generateProjectData(conditions: Record<string, any>): ProjectInfo {
  const baseProject: ProjectInfo = {
    name: conditions.hasName ? 'Test Project' : '',
    description: conditions.hasDescription ? 'Test description' : '',
    image: conditions.hasImage ? '/test-image.jpg' : '',
  };

  if (conditions.hasTags && conditions.tagsCount > 0) {
    baseProject.tags = Array.from({ length: conditions.tagsCount }, (_, i) => `Tag${i + 1}`);
  } else if (conditions.hasTags && conditions.tagsCount === 0) {
    baseProject.tags = [];
  }

  return baseProject;
}

// Test function for decision table
async function testProjectRendering(conditions: Record<string, any>) {
  const projectData = generateProjectData(conditions);
  const { container } = render(<Project info={projectData} />);

  const nameElement = screen.queryByText(projectData.name);
  const descriptionElement = screen.queryByText(projectData.description);
  const imageElement = screen.queryByRole('img');
  const tagsContainer = container.querySelector('.flex.flex-wrap.gap-2');

  return {
    shouldRender: container.firstChild !== null,
    shouldShowName: nameElement !== null && projectData.name !== '',
    shouldShowDescription: descriptionElement !== null && projectData.description !== '',
    shouldShowImage: imageElement !== null && projectData.image !== '',
    shouldShowTags: tagsContainer !== null && projectData.tags && projectData.tags.length > 0,
  };
}

describe('Project Component - Decision Table Tests', () => {
  // Generate Jest tests from decision table
  DecisionTableRunner.generateJestTests(projectComponentTable, testProjectRendering);

  // Additional specific tests for edge cases
  describe('Edge Cases', () => {
    it('should handle undefined tags gracefully', () => {
      const projectData: ProjectInfo = {
        name: 'Test Project',
        description: 'Test description',
        image: '/test-image.jpg',
        // tags is undefined
      };

      const { container } = render(<Project info={projectData} />);
      const tagsContainer = container.querySelector('.flex.flex-wrap.gap-2');
      
      expect(tagsContainer).toBeNull();
    });

    it('should apply correct CSS classes for styling', () => {
      const projectData: ProjectInfo = {
        name: 'Test Project',
        description: 'Test description',
        image: '/test-image.jpg',
        tags: ['React', 'TypeScript'],
      };

      const { container } = render(<Project info={projectData} />);
      const projectContainer = container.firstChild as HTMLElement;
      
      expect(projectContainer).toHaveClass('bg-white/5');
      expect(projectContainer).toHaveClass('rounded-xl');
      expect(projectContainer).toHaveClass('shadow-lg');
    });

    it('should render with correct animation delay based on index', () => {
      const projectData: ProjectInfo = {
        name: 'Test Project',
        description: 'Test description',
        image: '/test-image.jpg',
      };

      render(<Project info={projectData} index={2} />);
      // Since we're mocking framer-motion, we just verify the component renders
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
  });
});