import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import LeadForm from './LeadForm';
import { generateLeadSummary } from '../services/geminiService';

// Mock the service
vi.mock('../services/geminiService', () => ({
  generateLeadSummary: vi.fn(),
}));

describe('LeadForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits the form successfully', async () => {
    // Mock successful response
    (generateLeadSummary as any).mockResolvedValue({ success: true });

    render(<LeadForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Contact Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/Business Email/i), { target: { value: 'john@acme.com' } });
    fireEvent.change(screen.getByLabelText(/Industry Sector/i), { target: { value: 'Commercial/Retail' } });
    fireEvent.change(screen.getByLabelText(/Project Scope/i), { target: { value: 'Need 50 cameras' } });

    // Submit
    const submitButton = screen.getByRole('button', { name: /Request Technical Quotation/i });
    fireEvent.click(submitButton);

    // Check loading state
    expect(screen.getByText(/Processing Technical Lead/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Verify service call
    expect(generateLeadSummary).toHaveBeenCalledWith({
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'john@acme.com',
      sector: 'Commercial/Retail',
      requirements: 'Need 50 cameras'
    });

    // Wait for success message (timeout > 1500ms)
    await waitFor(() => {
      expect(screen.getByText(/Request Received/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('handles submission error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock error response
    (generateLeadSummary as any).mockRejectedValue(new Error('API Error'));

    render(<LeadForm />);

    // Fill in minimal required fields
    fireEvent.change(screen.getByLabelText(/Contact Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Tech Inc' } });
    fireEvent.change(screen.getByLabelText(/Business Email/i), { target: { value: 'jane@tech.inc' } });
    fireEvent.change(screen.getByLabelText(/Industry Sector/i), { target: { value: 'Data Centers' } });
    fireEvent.change(screen.getByLabelText(/Project Scope/i), { target: { value: 'Server cooling' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Request Technical Quotation/i }));

    // Check loading state initially
    expect(screen.getByText(/Processing Technical Lead/i)).toBeInTheDocument();

    // Wait for error handling (status reset to idle)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Request Technical Quotation/i })).toBeInTheDocument();
      expect(screen.queryByText(/Processing Technical Lead/i)).not.toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
  });
});
