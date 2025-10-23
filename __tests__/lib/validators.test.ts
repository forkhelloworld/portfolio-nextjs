import { validateProject, validateProjects, isValidProjectInfo } from '@/lib/validators';
import { ProjectInfo } from '@/lib/types';
import { dataValidationTable } from '@/lib/test-decision-tables';
import { DecisionTableRunner } from '@/lib/decision-table';

// Test data generator based on decision table conditions
function generateTestProject(conditions: Record<string, any>): any {
  const project: any = {};

  if (conditions.hasName) {
    project.name = conditions.nameIsString ? 'Test Project' : 123;
  }

  if (conditions.hasDescription) {
    project.description = conditions.descriptionIsString ? 'Test description' : 456;
  }

  if (conditions.hasImage) {
    project.image = conditions.imageIsString ? '/test-image.jpg' : 789;
  }

  if (conditions.tagsIsArray !== undefined) {
    project.tags = conditions.tagsIsArray ? ['React', 'TypeScript'] : 'not-an-array';
  }

  return project;
}

// Test function for decision table
async function testProjectValidation(conditions: Record<string, any>) {
  const testProject = generateTestProject(conditions);
  const result = validateProject(testProject);

  return {
    isValid: result.isValid,
    errorType: result.errorType
  };
}

describe('Project Validation - Decision Table Tests', () => {
  // Generate Jest tests from decision table
  DecisionTableRunner.generateJestTests(dataValidationTable, testProjectValidation);

  describe('Additional Validation Tests', () => {
    it('should validate a complete valid project', () => {
      const validProject: ProjectInfo = {
        name: 'Portfolio Website',
        description: 'My personal portfolio showcasing my projects',
        image: '/portfolio.jpg',
        tags: ['React', 'Next.js', 'TypeScript']
      };

      const result = validateProject(validProject);
      expect(result.isValid).toBe(true);
      expect(result.errorType).toBeNull();
      expect(result.errors).toBeUndefined();
    });

    it('should validate a minimal valid project (without tags)', () => {
      const validProject: ProjectInfo = {
        name: 'Simple Project',
        description: 'A simple project description',
        image: '/simple.jpg'
      };

      const result = validateProject(validProject);
      expect(result.isValid).toBe(true);
      expect(result.errorType).toBeNull();
    });

    it('should reject null/undefined project', () => {
      const result1 = validateProject(null);
      expect(result1.isValid).toBe(false);
      expect(result1.errorType).toBe('NULL_PROJECT');

      const result2 = validateProject(undefined);
      expect(result2.isValid).toBe(false);
      expect(result2.errorType).toBe('NULL_PROJECT');
    });

    it('should reject empty strings', () => {
      const projectWithEmptyName = {
        name: '',
        description: 'Valid description',
        image: '/valid.jpg'
      };

      const result = validateProject(projectWithEmptyName);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('EMPTY_NAME');
    });

    it('should validate individual tags in tags array', () => {
      const projectWithInvalidTags = {
        name: 'Test Project',
        description: 'Test description',
        image: '/test.jpg',
        tags: ['React', '', 123, 'TypeScript']
      };

      const result = validateProject(projectWithInvalidTags);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tag at index 1 cannot be empty');
      expect(result.errors).toContain('Tag at index 2 must be a string');
    });

    it('should handle empty tags array', () => {
      const projectWithEmptyTags = {
        name: 'Test Project',
        description: 'Test description',
        image: '/test.jpg',
        tags: []
      };

      const result = validateProject(projectWithEmptyTags);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Projects Array Validation', () => {
    it('should validate array of valid projects', () => {
      const validProjects: ProjectInfo[] = [
        {
          name: 'Project 1',
          description: 'Description 1',
          image: '/image1.jpg',
          tags: ['React']
        },
        {
          name: 'Project 2',
          description: 'Description 2',
          image: '/image2.jpg'
        }
      ];

      const result = validateProjects(validProjects);
      expect(result.isValid).toBe(true);
      expect(result.errorType).toBeNull();
    });

    it('should reject non-array input', () => {
      const result = validateProjects('not-an-array' as any);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('INVALID_PROJECTS_TYPE');
    });

    it('should identify invalid projects in array', () => {
      const mixedProjects = [
        {
          name: 'Valid Project',
          description: 'Valid description',
          image: '/valid.jpg'
        },
        {
          // Missing name
          description: 'Invalid project',
          image: '/invalid.jpg'
        }
      ];

      const result = validateProjects(mixedProjects);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('INVALID_PROJECTS');
      expect(result.errors?.[0]).toContain('Project at index 1');
    });

    it('should handle empty projects array', () => {
      const result = validateProjects([]);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Type Guard Tests', () => {
    it('should correctly identify valid ProjectInfo', () => {
      const validProject: ProjectInfo = {
        name: 'Test Project',
        description: 'Test description',
        image: '/test.jpg',
        tags: ['React']
      };

      expect(isValidProjectInfo(validProject)).toBe(true);
    });

    it('should correctly identify invalid ProjectInfo', () => {
      const invalidProject = {
        name: 'Test Project',
        // Missing description and image
        tags: ['React']
      };

      expect(isValidProjectInfo(invalidProject)).toBe(false);
    });

    it('should handle null/undefined in type guard', () => {
      expect(isValidProjectInfo(null)).toBe(false);
      expect(isValidProjectInfo(undefined)).toBe(false);
    });
  });
});