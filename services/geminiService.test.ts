
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation } from './geminiService.ts';

// Save original fetch
const originalFetch = global.fetch;

test('getSolutionRecommendation successfully returns a recommendation', async () => {
  const mockResponse = {
    text: 'Test recommendation content'
  };

  // Mock global.fetch
  const fetchMock = mock.fn(async (url, options) => {
    return {
      ok: true,
      json: async () => mockResponse
    };
  });
  global.fetch = fetchMock;

  try {
    const result = await getSolutionRecommendation('test input');

    assert.strictEqual(result, 'Test recommendation content');
    assert.strictEqual(fetchMock.mock.callCount(), 1);

    const callArgs = fetchMock.mock.calls[0].arguments;
    assert.strictEqual(callArgs[0], '/api/gemini');

    // check request body
    const body = JSON.parse(callArgs[1].body);
    assert.strictEqual(body.action, 'getSolutionRecommendation');
    assert.strictEqual(body.userInput, 'test input');

  } finally {
    global.fetch = originalFetch;
  }
});

test('getSolutionRecommendation handles API error', async () => {
  // Mock global.fetch for error
  const fetchMock = mock.fn(async () => {
    return {
      ok: false,
      json: async () => ({ error: 'API Error' })
    };
  });
  global.fetch = fetchMock;

  try {
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
  } finally {
    global.fetch = originalFetch;
  }
});
