import { test, mock, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService.ts';

describe('Gemini Service', () => {
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = mock.method(globalThis, 'fetch');
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getSolutionRecommendation', () => {
    test('successfully returns a recommendation', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ text: 'Test recommendation content' }),
      };

      fetchMock.mock.mockImplementationOnce(async () => mockResponse);

      const result = await getSolutionRecommendation('test input');

      assert.strictEqual(result, 'Test recommendation content');
      assert.strictEqual(fetchMock.mock.callCount(), 1);

      const call = fetchMock.mock.calls[0];
      assert.strictEqual(call.arguments[0], '/api/gemini');
      assert.deepStrictEqual(call.arguments[1], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getSolutionRecommendation',
          userInput: 'test input',
        }),
      });
    });

    test('handles API error', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({ error: 'API Error' }),
      };

      fetchMock.mock.mockImplementationOnce(async () => mockResponse);

      await assert.rejects(
        async () => {
          await getSolutionRecommendation('test input');
        },
        {
          name: 'Error',
          message: 'API Error',
        }
      );

      assert.strictEqual(fetchMock.mock.callCount(), 1);
    });

    test('handles network error', async () => {
        fetchMock.mock.mockImplementationOnce(async () => {
            throw new Error('Network Error');
        });

        await assert.rejects(
            async () => {
                await getSolutionRecommendation('test input');
            },
            {
                name: 'Error',
                message: 'Network Error',
            }
        );
    });
  });

  describe('generateLeadSummary', () => {
    test('successfully returns a lead summary', async () => {
      const mockFormData = { name: 'Test User', inquiry: 'Test Inquiry' };
      const mockResponseData = { summary: 'Test Summary' };

      const mockResponse = {
        ok: true,
        json: async () => mockResponseData,
      };

      fetchMock.mock.mockImplementationOnce(async () => mockResponse);

      const result = await generateLeadSummary(mockFormData);

      assert.deepStrictEqual(result, mockResponseData);
      assert.strictEqual(fetchMock.mock.callCount(), 1);

      const call = fetchMock.mock.calls[0];
      assert.strictEqual(call.arguments[0], '/api/gemini');
      assert.deepStrictEqual(call.arguments[1], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateLeadSummary',
          formData: mockFormData,
        }),
      });
    });

    test('handles API error', async () => {
      const mockFormData = { name: 'Test User' };
      const mockResponse = {
        ok: false,
        json: async () => ({ error: 'Failed to generate summary' }),
      };

      fetchMock.mock.mockImplementationOnce(async () => mockResponse);

      await assert.rejects(
        async () => {
          await generateLeadSummary(mockFormData);
        },
        {
          name: 'Error',
          message: 'Failed to generate summary',
        }
      );

      assert.strictEqual(fetchMock.mock.callCount(), 1);
    });

    test('handles network error', async () => {
        const mockFormData = { name: 'Test User' };
        fetchMock.mock.mockImplementationOnce(async () => {
            throw new Error('Network Error');
        });

        await assert.rejects(
            async () => {
                await generateLeadSummary(mockFormData);
            },
            {
                name: 'Error',
                message: 'Network Error',
            }
        );
    });
  });
});
