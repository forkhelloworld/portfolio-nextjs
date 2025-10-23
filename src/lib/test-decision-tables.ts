import { DecisionTable } from './decision-table';

/**
 * Decision Table 1: Project Component Rendering
 * Tests different combinations of project data and expected rendering behavior
 */
export const projectComponentTable: DecisionTable = {
  name: 'Project Component Rendering Tests',
  description: 'Tests Project component rendering with different data combinations',
  conditions: ['hasName', 'hasDescription', 'hasImage', 'hasTags', 'tagsCount'],
  actions: ['shouldRender', 'shouldShowName', 'shouldShowDescription', 'shouldShowImage', 'shouldShowTags'],
  rules: [
    {
      id: 'R1',
      description: 'Complete project data with tags',
      conditions: {
        hasName: true,
        hasDescription: true,
        hasImage: true,
        hasTags: true,
        tagsCount: 3
      },
      expectedActions: {
        shouldRender: true,
        shouldShowName: true,
        shouldShowDescription: true,
        shouldShowImage: true,
        shouldShowTags: true
      }
    },
    {
      id: 'R2',
      description: 'Project without tags',
      conditions: {
        hasName: true,
        hasDescription: true,
        hasImage: true,
        hasTags: false,
        tagsCount: 0
      },
      expectedActions: {
        shouldRender: true,
        shouldShowName: true,
        shouldShowDescription: true,
        shouldShowImage: true,
        shouldShowTags: false
      }
    },
    {
      id: 'R3',
      description: 'Project with empty tags array',
      conditions: {
        hasName: true,
        hasDescription: true,
        hasImage: true,
        hasTags: true,
        tagsCount: 0
      },
      expectedActions: {
        shouldRender: true,
        shouldShowName: true,
        shouldShowDescription: true,
        shouldShowImage: true,
        shouldShowTags: false
      }
    },
    {
      id: 'R4',
      description: 'Minimal project data',
      conditions: {
        hasName: true,
        hasDescription: true,
        hasImage: true,
        hasTags: false,
        tagsCount: 0
      },
      expectedActions: {
        shouldRender: true,
        shouldShowName: true,
        shouldShowDescription: true,
        shouldShowImage: true,
        shouldShowTags: false
      }
    }
  ]
};

/**
 * Decision Table 2: Projects List Rendering
 * Tests Projects component with different project arrays
 */
export const projectsListTable: DecisionTable = {
  name: 'Projects List Rendering Tests',
  description: 'Tests Projects component with different project collections',
  conditions: ['projectCount', 'hasValidProjects', 'allProjectsHaveRequiredFields'],
  actions: ['shouldRenderSection', 'shouldRenderGrid', 'shouldRenderProjects', 'gridColumns'],
  rules: [
    {
      id: 'R1',
      description: 'Single valid project',
      conditions: {
        projectCount: 1,
        hasValidProjects: true,
        allProjectsHaveRequiredFields: true
      },
      expectedActions: {
        shouldRenderSection: true,
        shouldRenderGrid: true,
        shouldRenderProjects: true,
        gridColumns: 'sm:grid-cols-2'
      }
    },
    {
      id: 'R2',
      description: 'Multiple valid projects',
      conditions: {
        projectCount: 3,
        hasValidProjects: true,
        allProjectsHaveRequiredFields: true
      },
      expectedActions: {
        shouldRenderSection: true,
        shouldRenderGrid: true,
        shouldRenderProjects: true,
        gridColumns: 'sm:grid-cols-2'
      }
    },
    {
      id: 'R3',
      description: 'Empty projects array',
      conditions: {
        projectCount: 0,
        hasValidProjects: false,
        allProjectsHaveRequiredFields: false
      },
      expectedActions: {
        shouldRenderSection: true,
        shouldRenderGrid: true,
        shouldRenderProjects: true,
        gridColumns: 'sm:grid-cols-2'
      }
    }
  ]
};

/**
 * Decision Table 3: Hero Section Text Carousel
 * Tests carousel behavior with different states
 */
export const heroCarouselTable: DecisionTable = {
  name: 'Hero Section Carousel Tests',
  description: 'Tests text carousel behavior in different states',
  conditions: ['currentIndex', 'totalTexts', 'isFirstText', 'isLastText'],
  actions: ['shouldShowText', 'nextIndex', 'shouldLoop'],
  rules: [
    {
      id: 'R1',
      description: 'First text in carousel',
      conditions: {
        currentIndex: 0,
        totalTexts: 5,
        isFirstText: true,
        isLastText: false
      },
      expectedActions: {
        shouldShowText: true,
        nextIndex: 1,
        shouldLoop: false
      }
    },
    {
      id: 'R2',
      description: 'Middle text in carousel',
      conditions: {
        currentIndex: 2,
        totalTexts: 5,
        isFirstText: false,
        isLastText: false
      },
      expectedActions: {
        shouldShowText: true,
        nextIndex: 3,
        shouldLoop: false
      }
    },
    {
      id: 'R3',
      description: 'Last text in carousel - should loop',
      conditions: {
        currentIndex: 4,
        totalTexts: 5,
        isFirstText: false,
        isLastText: true
      },
      expectedActions: {
        shouldShowText: true,
        nextIndex: 0,
        shouldLoop: true
      }
    }
  ]
};

/**
 * Decision Table 4: Data Validation
 * Tests project data structure validation
 */
export const dataValidationTable: DecisionTable = {
  name: 'Project Data Validation Tests',
  description: 'Tests validation of project data structure',
  conditions: ['hasName', 'nameIsString', 'hasDescription', 'descriptionIsString', 'hasImage', 'imageIsString', 'tagsIsArray'],
  actions: ['isValid', 'errorType'],
  rules: [
    {
      id: 'R1',
      description: 'Valid complete project',
      conditions: {
        hasName: true,
        nameIsString: true,
        hasDescription: true,
        descriptionIsString: true,
        hasImage: true,
        imageIsString: true,
        tagsIsArray: true
      },
      expectedActions: {
        isValid: true,
        errorType: null
      }
    },
    {
      id: 'R2',
      description: 'Missing name field',
      conditions: {
        hasName: false,
        nameIsString: false,
        hasDescription: true,
        descriptionIsString: true,
        hasImage: true,
        imageIsString: true,
        tagsIsArray: true
      },
      expectedActions: {
        isValid: false,
        errorType: 'MISSING_NAME'
      }
    },
    {
      id: 'R3',
      description: 'Invalid name type',
      conditions: {
        hasName: true,
        nameIsString: false,
        hasDescription: true,
        descriptionIsString: true,
        hasImage: true,
        imageIsString: true,
        tagsIsArray: true
      },
      expectedActions: {
        isValid: false,
        errorType: 'INVALID_NAME_TYPE'
      }
    },
    {
      id: 'R4',
      description: 'Missing description',
      conditions: {
        hasName: true,
        nameIsString: true,
        hasDescription: false,
        descriptionIsString: false,
        hasImage: true,
        imageIsString: true,
        tagsIsArray: true
      },
      expectedActions: {
        isValid: false,
        errorType: 'MISSING_DESCRIPTION'
      }
    },
    {
      id: 'R5',
      description: 'Invalid tags type',
      conditions: {
        hasName: true,
        nameIsString: true,
        hasDescription: true,
        descriptionIsString: true,
        hasImage: true,
        imageIsString: true,
        tagsIsArray: false
      },
      expectedActions: {
        isValid: false,
        errorType: 'INVALID_TAGS_TYPE'
      }
    }
  ]
};