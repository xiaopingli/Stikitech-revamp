import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LeadForm from './LeadForm';
import * as geminiService from '../services/geminiService';

// Mock the geminiService module with explicit extension
vi.mock('../services/geminiService', () => ({
  generateLeadSummary: vi.fn(),
}));

describe('LeadForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the form correctly', () => {
    render(<LeadForm />);
    expect(screen.getByText(/Solution Inquiry/i)).toBeInTheDocument();
  });

  it('handles form submission failure correctly', async () => {
    const user = userEvent.setup();

    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock generateLeadSummary to reject
    const error = new Error('Submission Failed');

    // We need to access the mocked function. Since we mocked the module,
    // importing it gives us the mocked version.
    vi.mocked(geminiService.generateLeadSummary).mockRejectedValue(error);

    render(<LeadForm />);

    // Fill out the form
    const nameInput = screen.getByLabelText(/Contact Name/i);
    await user.type(nameInput, 'John Doe');

    await user.type(screen.getByLabelText(/Company Name/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/Business Email/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/Industry Sector/i), 'Commercial/Retail');
    await user.type(screen.getByLabelText(/Project Scope/i), 'Need cameras');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Request Technical Quotation/i });
    await user.click(submitButton);

    // Verify console.error was called
    await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    // Verify form returns to idle state (button text changes back)
    expect(screen.getByRole('button', { name: /Request Technical Quotation/i })).toBeInTheDocument();
  });
});
