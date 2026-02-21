
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService';

// Mock global fetch
global.fetch = vi.fn();

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSolutionRecommendation', () => {
    it('successfully returns a recommendation', async () => {
      const mockResponse = { text: 'Test recommendation content' };

      // Mock successful fetch
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getSolutionRecommendation('test input');

      expect(result).toBe('Test recommendation content');
      expect(fetch).toHaveBeenCalledWith('/api/gemini', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          action: 'getSolutionRecommendation',
          userInput: 'test input'
        })
      }));
    });

    it('handles API error', async () => {
      // Mock failed fetch
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'API Error' }),
      } as Response);

      await expect(getSolutionRecommendation('test input')).rejects.toThrow('API Error');
    });

    it('handles network error', async () => {
        // Mock network error
        vi.mocked(fetch).mockRejectedValueOnce(new Error('Network Error'));

        await expect(getSolutionRecommendation('test input')).rejects.toThrow('Network Error');
    });
  });

  describe('generateLeadSummary', () => {
    it('successfully returns a lead summary', async () => {
      const mockFormData = {
        name: 'Test User',
        company: 'Test Co',
        email: 'test@example.com',
        sector: 'Test Sector',
        requirements: 'Test Requirements'
      };
      const mockResponseData = { summary: 'Test Summary' };

      // Mock successful fetch
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponseData,
      } as Response);

      const result = await generateLeadSummary(mockFormData);

      expect(result).toEqual(mockResponseData);
      expect(fetch).toHaveBeenCalledWith('/api/gemini', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          action: 'generateLeadSummary',
          formData: mockFormData
        })
      }));
    });

    it('handles API error', async () => {
      const mockFormData = {
        name: 'Test User',
        company: 'Test Co',
        email: 'test@example.com',
        sector: 'Test Sector',
        requirements: 'Test Requirements'
      };

      // Mock failed fetch
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Failed to generate summary' }),
      } as Response);

      await expect(generateLeadSummary(mockFormData)).rejects.toThrow('Failed to generate summary');
    });

    it('handles network error', async () => {
        const mockFormData = {
            name: 'Test User',
            company: 'Test Co',
            email: 'test@example.com',
            sector: 'Test Sector',
            requirements: 'Test Requirements'
        };

        // Mock network error
        vi.mocked(fetch).mockRejectedValueOnce(new Error('Network Error'));

        await expect(generateLeadSummary(mockFormData)).rejects.toThrow('Network Error');
    });
  });
});
