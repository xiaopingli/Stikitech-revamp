
import { test, mock } from 'node:test';
import assert from 'node:assert';

// Mock global.fetch
const fetchMock = mock.fn();
global.fetch = fetchMock;

// Import the service
const { getSolutionRecommendation } = await import('./geminiService.ts');

test('getSolutionRecommendation successfully returns a recommendation', async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({ text: 'Test recommendation content' })
  };

  fetchMock.mock.mockImplementationOnce(async () => mockResponse);

  const result = await getSolutionRecommendation('test input');

  assert.strictEqual(result, 'Test recommendation content');
  assert.strictEqual(fetchMock.mock.callCount(), 1);
  const args = fetchMock.mock.calls[0].arguments;
  assert.strictEqual(args[0], '/api/gemini');
  const body = JSON.parse(args[1].body);
  assert.strictEqual(body.userInput, 'test input');
});

test('getSolutionRecommendation handles API error', async () => {
  const mockResponse = {
    ok: false,
    json: async () => ({ error: 'API Error' })
  };

  fetchMock.mock.mockImplementationOnce(async () => mockResponse);

  await assert.rejects(
    async () => {
      await getSolutionRecommendation('test input');
    },
    {
      name: 'Error',
      message: 'API Error'
    }
  );

  assert.strictEqual(fetchMock.mock.callCount(), 2);
});
