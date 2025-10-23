import '@testing-library/jest-dom'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    a: 'a',
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Ensure timers are available
global.setInterval = global.setInterval || jest.fn()
global.clearInterval = global.clearInterval || jest.fn()
global.setTimeout = global.setTimeout || jest.fn()
global.clearTimeout = global.clearTimeout || jest.fn()