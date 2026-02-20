
import { test, mock, before, afterEach } from 'node:test';
import assert from 'node:assert';
// GlobalRegistrator is now handled in setup file
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

// Mock the geminiService module BEFORE importing the component
const getSolutionRecommendationMock = mock.fn();

mock.module('../services/geminiService.ts', {
  namedExports: {
    getSolutionRecommendation: getSolutionRecommendationMock
  }
});

// Import the component dynamically to ensure mock is applied
const { default: AISolutionArchitect } = await import('./AISolutionArchitect.tsx');

afterEach(() => {
  cleanup();
  getSolutionRecommendationMock.mock.resetCalls();
});

test('AISolutionArchitect: handleAsk does not trigger loading when input is empty', async () => {
  render(<AISolutionArchitect />);

  const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
  const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);

  // Verify initial state
  assert.strictEqual(textarea.value, '');

  // Click the button with empty input
  fireEvent.click(button);

  // Verify loading state is NOT triggered
  // If loading, the button text changes to "Architecting Solution..."
  // We expect it to remain "Generate Technical Recommendation"
  const buttonAfterClick = screen.getByRole('button');
  assert.match(buttonAfterClick.textContent || '', /Generate Technical Recommendation/);

  // Verify service was NOT called
  assert.strictEqual(getSolutionRecommendationMock.mock.callCount(), 0);
});

test('AISolutionArchitect: handleAsk triggers loading when input is provided', async () => {
   render(<AISolutionArchitect />);

   const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
   const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);

   // Enter text
   fireEvent.change(textarea, { target: { value: 'Test input' } });

   // Mock success response
   getSolutionRecommendationMock.mock.mockImplementationOnce(async () => 'Test Recommendation');

   // Click button
   fireEvent.click(button);

   // Verify service WAS called
   assert.strictEqual(getSolutionRecommendationMock.mock.callCount(), 1);
});
