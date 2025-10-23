import { ProjectInfo } from './types';

export interface ValidationResult {
  isValid: boolean;
  errorType: string | null;
  errors?: string[];
}

/**
 * Validates a project data structure
 * Used in conjunction with decision tables for comprehensive testing
 */
export function validateProject(project: any): ValidationResult {
  const errors: string[] = [];
  let errorType: string | null = null;

  // Check if project exists
  if (!project) {
    return {
      isValid: false,
      errorType: 'NULL_PROJECT',
      errors: ['Project cannot be null or undefined']
    };
  }

  // Validate name
  if (!project.hasOwnProperty('name')) {
    errors.push('Project must have a name field');
    errorType = errorType || 'MISSING_NAME';
  } else if (typeof project.name !== 'string') {
    errors.push('Project name must be a string');
    errorType = errorType || 'INVALID_NAME_TYPE';
  } else if (project.name.trim() === '') {
    errors.push('Project name cannot be empty');
    errorType = errorType || 'EMPTY_NAME';
  }

  // Validate description
  if (!project.hasOwnProperty('description')) {
    errors.push('Project must have a description field');
    errorType = errorType || 'MISSING_DESCRIPTION';
  } else if (typeof project.description !== 'string') {
    errors.push('Project description must be a string');
    errorType = errorType || 'INVALID_DESCRIPTION_TYPE';
  } else if (project.description.trim() === '') {
    errors.push('Project description cannot be empty');
    errorType = errorType || 'EMPTY_DESCRIPTION';
  }

  // Validate image
  if (!project.hasOwnProperty('image')) {
    errors.push('Project must have an image field');
    errorType = errorType || 'MISSING_IMAGE';
  } else if (typeof project.image !== 'string') {
    errors.push('Project image must be a string');
    errorType = errorType || 'INVALID_IMAGE_TYPE';
  } else if (project.image.trim() === '') {
    errors.push('Project image cannot be empty');
    errorType = errorType || 'EMPTY_IMAGE';
  }

  // Validate tags (optional field)
  if (project.hasOwnProperty('tags')) {
    if (!Array.isArray(project.tags)) {
      errors.push('Project tags must be an array');
      errorType = errorType || 'INVALID_TAGS_TYPE';
    } else {
      // Validate each tag
      project.tags.forEach((tag: any, index: number) => {
        if (typeof tag !== 'string') {
          errors.push(`Tag at index ${index} must be a string`);
          errorType = errorType || 'INVALID_TAG_TYPE';
        } else if (tag.trim() === '') {
          errors.push(`Tag at index ${index} cannot be empty`);
          errorType = errorType || 'EMPTY_TAG';
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errorType,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * Validates an array of projects
 */
export function validateProjects(projects: any[]): ValidationResult {
  if (!Array.isArray(projects)) {
    return {
      isValid: false,
      errorType: 'INVALID_PROJECTS_TYPE',
      errors: ['Projects must be an array']
    };
  }

  const errors: string[] = [];
  let hasErrors = false;

  projects.forEach((project, index) => {
    const result = validateProject(project);
    if (!result.isValid) {
      hasErrors = true;
      errors.push(`Project at index ${index}: ${result.errors?.join(', ')}`);
    }
  });

  return {
    isValid: !hasErrors,
    errorType: hasErrors ? 'INVALID_PROJECTS' : null,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * Type guard to check if an object is a valid ProjectInfo
 */
export function isValidProjectInfo(obj: any): obj is ProjectInfo {
  const result = validateProject(obj);
  return result.isValid;
}