
import { test, mock, afterEach } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation } from './geminiService.ts';

// Mock the global fetch function
const fetchMock = mock.method(global, 'fetch');

afterEach(() => {
  fetchMock.mock.resetCalls();
});

test('getSolutionRecommendation successfully returns a recommendation', async () => {
  const mockResponse = {
    text: 'Test recommendation content'
  };

  fetchMock.mock.mockImplementationOnce(async () => {
    return {
      ok: true,
      json: async () => mockResponse
    } as Response;
  });

  const result = await getSolutionRecommendation('test input');

  assert.strictEqual(result, 'Test recommendation content');
  assert.strictEqual(fetchMock.mock.callCount(), 1);
});

test('getSolutionRecommendation handles API error', async () => {
  const errorResponse = { error: 'API Error' };

  fetchMock.mock.mockImplementationOnce(async () => {
    return {
      ok: false,
      json: async () => errorResponse
    } as Response;
  });

  await assert.rejects(
    async () => {
      await getSolutionRecommendation('test input');
    },
    {
      name: 'Error',
      message: 'API Error'
    }
  );

  assert.strictEqual(fetchMock.mock.callCount(), 1);
});
