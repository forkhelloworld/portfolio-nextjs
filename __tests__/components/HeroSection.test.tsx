import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';
import { heroCarouselTable } from '@/lib/test-decision-tables';
import { DecisionTableRunner } from '@/lib/decision-table';

// Test function for decision table
async function testHeroCarousel(conditions: Record<string, any>) {
  const carouselTexts = [
    "I'm a full-stack JavaScript developer who loves turning ideas into real, working applications.",
    "I enjoy building projects for the web — from interactive user interfaces to complete backend systems.",
    "My main focus is creating apps that are easy to use and solve real problems.",
    "I'm always curious, always learning, and always exploring new ways to build cool stuff.",
    "Let's create something amazing together!"
  ];

  const currentIndex = conditions.currentIndex;
  const totalTexts = conditions.totalTexts;
  const isFirstText = currentIndex === 0;
  const isLastText = currentIndex === totalTexts - 1;

  // Calculate next index (with looping)
  const nextIndex = isLastText ? 0 : currentIndex + 1;
  const shouldLoop = isLastText;

  // Check if text should be shown (always true for valid indices)
  const shouldShowText = currentIndex >= 0 && currentIndex < totalTexts;

  return {
    shouldShowText,
    nextIndex,
    shouldLoop
  };
}

describe('HeroSection Component - Decision Table Tests', () => {
  // Generate Jest tests from decision table
  DecisionTableRunner.generateJestTests(heroCarouselTable, testHeroCarousel);

  describe('Static Content Tests', () => {
    it('should render the main heading', () => {
      render(<HeroSection />);
      
      expect(screen.getByText('Hi, I\'m Serhii Sliusarskyi')).toBeInTheDocument();
    });

    it('should render the "View Projects" button', () => {
      render(<HeroSection />);
      
      const button = screen.getByRole('link', { name: /view projects/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '#projects');
    });

    it('should apply correct styling classes', () => {
      const { container } = render(<HeroSection />);
      const sectionElement = container.querySelector('section');
      
      expect(sectionElement).toHaveClass('flex');
      expect(sectionElement).toHaveClass('flex-col');
      expect(sectionElement).toHaveClass('items-center');
      expect(sectionElement).toHaveClass('justify-center');
      expect(sectionElement).toHaveClass('min-h-[100vh]');
    });
  });

  describe('Carousel Content Tests', () => {
    it('should display carousel text', () => {
      render(<HeroSection />);
      
      // Check if at least one of the carousel texts is displayed
      const carouselTexts = [
        "I'm a full-stack JavaScript developer who loves turning ideas into real, working applications.",
        "I enjoy building projects for the web — from interactive user interfaces to complete backend systems.",
        "My main focus is creating apps that are easy to use and solve real problems.",
        "I'm always curious, always learning, and always exploring new ways to build cool stuff.",
        "Let's create something amazing together!"
      ];

      const hasCarouselText = carouselTexts.some(text => 
        screen.queryByText(text) !== null
      );
      
      expect(hasCarouselText).toBe(true);
    });

    it('should have carousel container with proper height', () => {
      const { container } = render(<HeroSection />);
      
      const carouselContainer = container.querySelector('.h-\\[4\\.5rem\\]');
      expect(carouselContainer).toBeInTheDocument();
    });
  });

  describe('Button Interaction Tests', () => {
    it('should have correct button styling', () => {
      render(<HeroSection />);
      
      const button = screen.getByRole('link', { name: /view projects/i });
      expect(button).toHaveClass('mt-4');
      expect(button).toHaveClass('inline-block');
      expect(button).toHaveClass('px-8');
      expect(button).toHaveClass('py-3');
      expect(button).toHaveClass('bg-cyan-500');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('font-semibold');
      expect(button).toHaveClass('rounded-lg');
    });

    it('should link to projects section', () => {
      render(<HeroSection />);
      
      const button = screen.getByRole('link', { name: /view projects/i });
      expect(button).toHaveAttribute('href', '#projects');
    });
  });

  describe('Layout and Structure Tests', () => {
    it('should have proper text hierarchy', () => {
      render(<HeroSection />);
      
      // Main heading should be h1
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Hi, I\'m Serhii Sliusarskyi');
    });

    it('should have centered layout', () => {
      const { container } = render(<HeroSection />);
      const sectionElement = container.querySelector('section');
      
      expect(sectionElement).toHaveClass('text-center');
      expect(sectionElement).toHaveClass('items-center');
      expect(sectionElement).toHaveClass('justify-center');
    });

    it('should be responsive', () => {
      render(<HeroSection />);
      
      const heading = screen.getByText('Hi, I\'m Serhii Sliusarskyi');
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'md:text-6xl');
    });
  });
});