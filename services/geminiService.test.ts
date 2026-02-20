
import { test, mock } from 'node:test';
import assert from 'node:assert';

// Mock the @google/genai module
const generateContentMock = mock.fn();

mock.module('@google/genai', {
  namedExports: {
    GoogleGenAI: class {
      models = {
        generateContent: generateContentMock
      }
    },
    Type: {
      OBJECT: 'OBJECT',
      STRING: 'STRING',
      ARRAY: 'ARRAY'
    }
  }
});

// Import the service AFTER mocking the module
const { getSolutionRecommendation } = await import('./geminiService.ts');

test('getSolutionRecommendation successfully returns a recommendation', async () => {
  const mockResponse = {
    text: 'Test recommendation content'
  };

  generateContentMock.mock.mockImplementationOnce(async () => mockResponse);

  const result = await getSolutionRecommendation('test input');

  assert.strictEqual(result, 'Test recommendation content');
  assert.strictEqual(generateContentMock.mock.callCount(), 1);
});

test('getSolutionRecommendation handles API error', async () => {
  generateContentMock.mock.mockImplementationOnce(async () => {
    throw new Error('API Error');
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

  assert.strictEqual(generateContentMock.mock.callCount(), 2);
});
