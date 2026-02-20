import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService';

describe('geminiService', () => {
  beforeEach(() => {
    // Mock global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getSolutionRecommendation successfully returns a recommendation', async () => {
    const mockResponse = {
      text: 'Test recommendation content'
    };

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getSolutionRecommendation('test input');

    expect(result).toBe('Test recommendation content');
    expect(global.fetch).toHaveBeenCalledWith('/api/gemini', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        action: 'getSolutionRecommendation',
        userInput: 'test input',
      }),
    }));
  });

  it('getSolutionRecommendation handles API error', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'API Error' }),
    });

    await expect(getSolutionRecommendation('test input')).rejects.toThrow('API Error');
  });

  it('generateLeadSummary successfully returns summary', async () => {
    const mockResponse = { summary: 'test summary' };
    const formData = { name: 'test' };

    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
    });

    const result = await generateLeadSummary(formData);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('/api/gemini', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
            action: 'generateLeadSummary',
            formData
        })
    }));
  });
});
