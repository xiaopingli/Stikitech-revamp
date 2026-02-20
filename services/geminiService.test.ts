import { test, mock, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService.ts';

describe('Gemini Service', () => {
  const originalFetch = globalThis.fetch;
  let fetchMock;

  beforeEach(() => {
    fetchMock = mock.fn();
    globalThis.fetch = fetchMock;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('getSolutionRecommendation successfully returns a recommendation', async () => {
    fetchMock.mock.mockImplementationOnce(async () => ({
      ok: true,
      json: async () => ({ text: 'Test recommendation content' })
    }));

    const result = await getSolutionRecommendation('test input');

    assert.strictEqual(result, 'Test recommendation content');
    assert.strictEqual(fetchMock.mock.callCount(), 1);

    const call = fetchMock.mock.calls[0];
    assert.strictEqual(call.arguments[0], '/api/gemini');

    const body = JSON.parse(call.arguments[1].body);
    assert.strictEqual(body.action, 'getSolutionRecommendation');
    assert.strictEqual(body.userInput, 'test input');
  });

  test('getSolutionRecommendation handles API error', async () => {
    fetchMock.mock.mockImplementationOnce(async () => ({
      ok: false,
      json: async () => ({ error: 'API Error' })
    }));

    await assert.rejects(
      async () => {
        await getSolutionRecommendation('test input');
      },
      {
        name: 'Error',
        message: 'API Error'
      }
    );
  });

  test('generateLeadSummary successfully returns a summary', async () => {
    fetchMock.mock.mockImplementationOnce(async () => ({
      ok: true,
      json: async () => ({ text: 'Lead summary content' })
    }));

    const result = await generateLeadSummary({ name: 'Test User' });

    assert.deepStrictEqual(result, { text: 'Lead summary content' });

    const call = fetchMock.mock.calls[0];
    assert.strictEqual(call.arguments[0], '/api/gemini');

    const body = JSON.parse(call.arguments[1].body);
    assert.strictEqual(body.action, 'generateLeadSummary');
    assert.deepStrictEqual(body.formData, { name: 'Test User' });
  });
});
