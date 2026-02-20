import { test, mock, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService.ts';

describe('Gemini Service', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('getSolutionRecommendation returns text on success', async () => {
    const mockResponse = { text: 'Recommendation result' };

    globalThis.fetch = mock.fn(async (url, options: any) => {
      assert.strictEqual(url, '/api/gemini');
      assert.strictEqual(options.method, 'POST');
      const body = JSON.parse(options.body);
      assert.strictEqual(body.action, 'getSolutionRecommendation');
      assert.strictEqual(body.userInput, 'test input');

      return {
        ok: true,
        json: async () => mockResponse,
      } as Response;
    });

    const result = await getSolutionRecommendation('test input');
    assert.strictEqual(result, 'Recommendation result');
  });

  test('getSolutionRecommendation throws error on API failure', async () => {
    globalThis.fetch = mock.fn(async () => {
      return {
        ok: false,
        json: async () => ({ error: 'API Error' }),
      } as Response;
    });

    await assert.rejects(
      async () => await getSolutionRecommendation('test input'),
      /API Error/
    );
  });

  test('generateLeadSummary returns data on success', async () => {
    const mockResponse = { summary: 'Lead Summary' };
    const formData = { name: 'John Doe' };

    globalThis.fetch = mock.fn(async (url, options: any) => {
      assert.strictEqual(url, '/api/gemini');
      const body = JSON.parse(options.body);
      assert.strictEqual(body.action, 'generateLeadSummary');
      assert.deepStrictEqual(body.formData, formData);

      return {
        ok: true,
        json: async () => mockResponse,
      } as Response;
    });

    const result = await generateLeadSummary(formData);
    assert.deepStrictEqual(result, mockResponse);
  });

   test('generateLeadSummary throws error on API failure', async () => {
    globalThis.fetch = mock.fn(async () => {
      return {
        ok: false,
        json: async () => ({ error: 'Summary Failed' }),
      } as Response;
    });

    await assert.rejects(
      async () => await generateLeadSummary({}),
      /Summary Failed/
    );
  });
});
