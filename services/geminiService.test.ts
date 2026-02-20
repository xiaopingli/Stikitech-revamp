import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getSolutionRecommendation, generateLeadSummary } from './geminiService.ts';

test('getSolutionRecommendation successfully returns a recommendation', async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({ text: 'Test recommendation content' })
  };

  const fetchMock = mock.method(global, 'fetch', async () => mockResponse);

  const result = await getSolutionRecommendation('test input');

  assert.strictEqual(result, 'Test recommendation content');
  assert.strictEqual(fetchMock.mock.callCount(), 1);
  const callArgs = fetchMock.mock.calls[0].arguments;
  assert.strictEqual(callArgs[0], '/api/gemini');
  const body = JSON.parse(callArgs[1].body);
  assert.strictEqual(body.action, 'getSolutionRecommendation');
  assert.strictEqual(body.userInput, 'test input');

  fetchMock.mock.restore();
});

test('getSolutionRecommendation handles API error', async () => {
  const mockResponse = {
    ok: false,
    json: async () => ({ error: 'API Error' })
  };

  const fetchMock = mock.method(global, 'fetch', async () => mockResponse);

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

test('generateLeadSummary successfully returns summary', async () => {
    const mockFormData = {
        name: 'John Doe',
        company: 'ACME',
        email: 'john@acme.com',
        sector: 'Retail',
        requirements: 'Cameras'
    };

    const mockResponseData = {
        summary: 'Test summary',
        priority: 'High',
        suggestedQuestions: ['Q1', 'Q2']
    };

    const mockResponse = {
        ok: true,
        json: async () => mockResponseData
    };

    const fetchMock = mock.method(global, 'fetch', async () => mockResponse);

    const result = await generateLeadSummary(mockFormData);

    assert.deepStrictEqual(result, mockResponseData);
    assert.strictEqual(fetchMock.mock.callCount(), 1);

    const callArgs = fetchMock.mock.calls[0].arguments;
    assert.strictEqual(callArgs[0], '/api/gemini');
    const body = JSON.parse(callArgs[1].body);
    assert.strictEqual(body.action, 'generateLeadSummary');
    assert.deepStrictEqual(body.formData, mockFormData);

    fetchMock.mock.restore();
});

test('generateLeadSummary handles API error', async () => {
    const mockFormData = {
        name: 'John Doe',
        company: 'ACME',
        email: 'john@acme.com',
        sector: 'Retail',
        requirements: 'Cameras'
    };

    const mockResponse = {
        ok: false,
        json: async () => ({ error: 'Summary Error' })
    };

    const fetchMock = mock.method(global, 'fetch', async () => mockResponse);

    await assert.rejects(
        async () => {
            await generateLeadSummary(mockFormData);
        },
        {
            name: 'Error',
            message: 'Summary Error'
        }
    );

    assert.strictEqual(fetchMock.mock.callCount(), 1);

    fetchMock.mock.restore();
});
