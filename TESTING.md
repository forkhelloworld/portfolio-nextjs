# Automated Testing with Decision Tables

This project implements comprehensive automated testing using **Decision Tables** methodology. Decision tables provide a systematic approach to test all combinations of conditions and expected outcomes.

## 🎯 Overview

The testing framework combines:
- **Decision Tables** for systematic test case generation
- **Jest** as the testing framework
- **React Testing Library** for component testing
- **TypeScript** for type-safe test development

## 📊 Decision Tables Implementation

### What are Decision Tables?

Decision tables are a structured way to represent complex business logic and test scenarios. They consist of:
- **Conditions**: Input parameters or states
- **Actions**: Expected outcomes or behaviors
- **Rules**: Combinations of conditions and their corresponding actions

### Our Decision Table Framework

Located in `src/lib/decision-table.ts`, our framework provides:

```typescript
interface DecisionTable {
  name: string;
  description: string;
  conditions: string[];
  actions: string[];
  rules: DecisionTableRule[];
}
```

## 🧪 Test Categories

### 1. Component Tests (`__tests__/components/`)

#### Project Component Tests
- **Decision Table**: `projectComponentTable`
- **Tests**: Different combinations of project data (name, description, image, tags)
- **Rules**: 4 comprehensive test rules covering all scenarios

#### Projects List Tests
- **Decision Table**: `projectsListTable`
- **Tests**: Various project array configurations
- **Rules**: Empty arrays, single projects, multiple projects

#### Hero Section Tests
- **Decision Table**: `heroCarouselTable`
- **Tests**: Carousel text rotation logic
- **Rules**: First text, middle text, last text (with looping)

### 2. Data Validation Tests (`__tests__/lib/validators.test.ts`)

#### Project Data Validation
- **Decision Table**: `dataValidationTable`
- **Tests**: Project structure validation with 5 comprehensive rules
- **Coverage**: Missing fields, invalid types, edge cases

### 3. Integration Tests (`__tests__/integration/`)

#### Page Navigation Tests
- **Decision Table**: `navigationDecisionTable`
- **Tests**: Full page rendering and navigation flows
- **Coverage**: User journeys, accessibility, responsive design

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Targeted Test Commands

```bash
# Run only component tests
npm run test:components

# Run only integration tests
npm run test:integration

# Run only validation tests
npm run test:validators

# Run decision table specific tests
npm run test:decision-tables
```

## 📈 Coverage Goals

Our testing framework aims for:
- **70%** minimum coverage across all metrics
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)
- Next.js integration
- TypeScript support
- Path mapping for `@/` imports
- Coverage thresholds
- Custom test patterns

### Setup (`jest.setup.js`)
- Testing Library DOM matchers
- Framer Motion mocking
- Next.js Image component mocking
- Intersection Observer polyfill

## 📋 Decision Tables Summary

| Table Name | Purpose | Rules | Coverage |
|------------|---------|-------|----------|
| `projectComponentTable` | Project component rendering | 4 | Complete project data combinations |
| `projectsListTable` | Projects list behavior | 3 | Array handling scenarios |
| `heroCarouselTable` | Carousel logic | 3 | Text rotation states |
| `dataValidationTable` | Data structure validation | 5 | Field validation scenarios |
| `navigationDecisionTable` | Page navigation | 2 | User flow testing |

## 🎨 Benefits of Decision Table Testing

### 1. **Systematic Coverage**
- Ensures all condition combinations are tested
- Reduces chance of missing edge cases
- Provides clear test documentation

### 2. **Maintainability**
- Easy to add new test scenarios
- Clear separation of test logic and data
- Reusable test framework

### 3. **Business Logic Clarity**
- Tests serve as living documentation
- Clear mapping between requirements and tests
- Easy stakeholder review

### 4. **Quality Assurance**
- Comprehensive edge case coverage
- Consistent test structure
- Automated test generation

## 🔍 Test Examples

### Component Test with Decision Table

```typescript
// Decision table rule
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
}

// Generated test
DecisionTableRunner.generateJestTests(projectComponentTable, testProjectRendering);
```

### Data Validation with Decision Table

```typescript
// Validation rule
{
  id: 'R2',
  description: 'Missing name field',
  conditions: {
    hasName: false,
    nameIsString: false,
    // ... other conditions
  },
  expectedActions: {
    isValid: false,
    errorType: 'MISSING_NAME'
  }
}
```

## 🚀 Future Enhancements

1. **Visual Regression Testing**: Add screenshot comparison tests
2. **Performance Testing**: Add performance benchmarks using decision tables
3. **E2E Testing**: Extend decision tables to Playwright/Cypress tests
4. **API Testing**: Apply decision tables to API endpoint testing
5. **Accessibility Testing**: Systematic a11y testing with decision tables

## 📚 Resources

- [Decision Tables in Software Testing](https://en.wikipedia.org/wiki/Decision_table)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

This testing framework demonstrates how decision tables can systematically improve test coverage and maintainability in modern React applications.