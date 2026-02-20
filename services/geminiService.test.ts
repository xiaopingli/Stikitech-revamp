import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService.ts';

test('getSolutionRecommendation successfully returns a recommendation', async (t) => {
  const originalFetch = globalThis.fetch;
  const mockResponseData = { text: 'Test recommendation content' };

  // Setup mock implementation
  const fetchMock = mock.fn(async (url, options) => {
    return {
      ok: true,
      json: async () => mockResponseData,
    };
  });

  // Set global fetch
  globalThis.fetch = fetchMock;

  // Restore
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const result = await getSolutionRecommendation('test input');

  assert.strictEqual(result, 'Test recommendation content');
  assert.strictEqual(fetchMock.mock.callCount(), 1);

  const callArgs = fetchMock.mock.calls[0].arguments;
  assert.strictEqual(callArgs[0], '/api/gemini');
  assert.deepStrictEqual(JSON.parse(callArgs[1].body), {
    action: 'getSolutionRecommendation',
    userInput: 'test input'
  });
});

test('getSolutionRecommendation handles API error', async (t) => {
  const originalFetch = globalThis.fetch;
  const errorData = { error: 'Server Error' };

  // Setup mock implementation
  const fetchMock = mock.fn(async (url, options) => {
    return {
      ok: false,
      json: async () => errorData,
    };
  });

  // Set global fetch
  globalThis.fetch = fetchMock;

  // Restore
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  await assert.rejects(
    async () => {
      await getSolutionRecommendation('test input');
    },
    {
      message: 'Server Error'
    }
  );

  assert.strictEqual(fetchMock.mock.callCount(), 1);
});

test('generateLeadSummary successfully returns summary', async (t) => {
  const originalFetch = globalThis.fetch;
  const mockResponseData = { summary: 'Test Summary' };

  // Setup mock implementation
  const fetchMock = mock.fn(async (url, options) => {
    return {
      ok: true,
      json: async () => mockResponseData,
    };
  });

  // Set global fetch
  globalThis.fetch = fetchMock;

  // Restore
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const formData = { some: 'data' };
  const result = await generateLeadSummary(formData);

  assert.deepStrictEqual(result, mockResponseData);
  assert.strictEqual(fetchMock.mock.callCount(), 1);

  const callArgs = fetchMock.mock.calls[0].arguments;
  assert.strictEqual(callArgs[0], '/api/gemini');
  assert.deepStrictEqual(JSON.parse(callArgs[1].body), {
    action: 'generateLeadSummary',
    formData
  });
});
