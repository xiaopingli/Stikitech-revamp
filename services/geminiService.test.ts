import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSolutionRecommendation } from './geminiService';

// Mock global fetch
global.fetch = vi.fn();

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getSolutionRecommendation successfully returns a recommendation', async () => {
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

  it('getSolutionRecommendation handles API error', async () => {
    // Mock failed fetch
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'API Error' }),
    } as Response);

    await expect(getSolutionRecommendation('test input')).rejects.toThrow('API Error');
  });
});
