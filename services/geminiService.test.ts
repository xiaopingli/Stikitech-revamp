
import { test, mock } from 'node:test';
import assert from 'node:assert';

// Import the service
// Note: We import it normally now that fetch is globally mocked/available
import { getSolutionRecommendation } from './geminiService.ts';

test('getSolutionRecommendation successfully returns a recommendation', async () => {
  const mockResponse = {
    text: 'Test recommendation content'
  };

  // Mock global.fetch for this test
  // We use mock.method to spy on/mock the global fetch
  const fetchMock = mock.method(global, 'fetch', async () => {
    return {
      ok: true,
      json: async () => mockResponse
    };
  });

  const result = await getSolutionRecommendation('test input');

  assert.strictEqual(result, 'Test recommendation content');
  assert.strictEqual(fetchMock.mock.callCount(), 1);

  fetchMock.mock.restore();
});

test('getSolutionRecommendation handles API error', async () => {
  const fetchMock = mock.method(global, 'fetch', async () => {
    return {
      ok: false,
      json: async () => ({ error: 'API Error' })
    };
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
  fetchMock.mock.restore();
});
