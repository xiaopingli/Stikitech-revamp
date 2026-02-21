import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import AISolutionArchitect from './AISolutionArchitect';
import { getSolutionRecommendation } from '../services/geminiService';

// Mock the geminiService
vi.mock('../services/geminiService', () => ({
  getSolutionRecommendation: vi.fn(),
}));

describe('AISolutionArchitect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    render(<AISolutionArchitect />);

    expect(screen.getByText(/StikiAI Solution Architect/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Technical Recommendation/i })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<AISolutionArchitect />);

    const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    expect(textarea).toHaveValue('Test input');
  });

  it('calls getSolutionRecommendation and displays response on success', async () => {
    const mockResponse = 'Here is a recommended solution.';
    vi.mocked(getSolutionRecommendation).mockResolvedValue(mockResponse);

    render(<AISolutionArchitect />);

    const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
    fireEvent.click(button);

    expect(getSolutionRecommendation).toHaveBeenCalledWith('Test input');

    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', async () => {
    // Return a promise that doesn't resolve immediately
    vi.mocked(getSolutionRecommendation).mockReturnValue(new Promise(() => {}));

    render(<AISolutionArchitect />);

    const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
    fireEvent.click(button);

    expect(screen.getByText(/Architecting Solution.../i)).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('displays error message when API call fails', async () => {
    vi.mocked(getSolutionRecommendation).mockRejectedValue(new Error('API Error'));

    render(<AISolutionArchitect />);

    const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);
    fireEvent.change(textarea, { target: { value: 'Test input' } });

    const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Expert connection interrupted/i)).toBeInTheDocument();
    });
  });

  it('does not call API if input is empty', () => {
    render(<AISolutionArchitect />);

    const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
    fireEvent.click(button);

    expect(getSolutionRecommendation).not.toHaveBeenCalled();
  });

  it('does not call API if input is only whitespace', () => {
    render(<AISolutionArchitect />);

    const textarea = screen.getByPlaceholderText(/e.g. 'I need a 500-camera system/i);
    fireEvent.change(textarea, { target: { value: '   ' } });

    const button = screen.getByRole('button', { name: /Generate Technical Recommendation/i });
    fireEvent.click(button);

    expect(getSolutionRecommendation).not.toHaveBeenCalled();
  });
});
