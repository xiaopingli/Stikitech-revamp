import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSolutionRecommendation } from './geminiService';

// Mock global fetch
global.fetch = vi.fn();

describe('geminiService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getSolutionRecommendation successfully returns a recommendation', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ text: 'Test recommendation content' }),
    };
    (global.fetch as any).mockResolvedValue(mockResponse);

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
    const mockResponse = {
      ok: false,
      json: async () => ({ error: 'API Error' }),
    };
    (global.fetch as any).mockResolvedValue(mockResponse);

    await expect(getSolutionRecommendation('test input')).rejects.toThrow('API Error');

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
