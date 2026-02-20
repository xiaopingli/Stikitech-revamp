
import { test, mock } from 'node:test';
import assert from 'node:assert';

// Mock the @google/genai module
const generateContentMock = mock.fn(async () => ({ text: 'Response from Gemini' }));

mock.module('@google/genai', {
  namedExports: {
    GoogleGenAI: class {
      constructor(options: any) {}
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

// Mock environment variables
process.env.GEMINI_API_KEY = 'test-key';

test('getSolutionRecommendation calls generateContent with secure configuration', async () => {
  // Import the handler AFTER mocking the module
  const handler = (await import('./gemini.ts')).default;

  const req = {
    method: 'POST',
    body: {
      action: 'getSolutionRecommendation',
      userInput: 'Malicious Input'
    }
  };

  const res = {
    status: mock.fn(() => res),
    json: mock.fn(),
    setHeader: mock.fn()
  };

  await handler(req, res);

  // Check calls
  assert.strictEqual(generateContentMock.mock.callCount(), 1);
  const args = generateContentMock.mock.calls[0].arguments[0];

  // Verify that systemInstruction is used
  assert.ok(args.config?.systemInstruction, 'systemInstruction should be present in config');
  assert.strictEqual(typeof args.config.systemInstruction, 'string', 'systemInstruction should be a string');
  assert.match(args.config.systemInstruction, /Stikitech Solution Architect/, 'systemInstruction content mismatch');

  // Verify that contents is structured and separates user input
  assert.ok(Array.isArray(args.contents), 'contents should be an array of Content objects');
  const userContent = args.contents.find((c: any) => c.role === 'user');
  assert.ok(userContent, 'There should be a user content part');
  assert.strictEqual(userContent.parts[0].text, 'A client asks: "Malicious Input"', 'User input should be in the user content part');
});

test('generateLeadSummary calls generateContent with secure configuration', async () => {
  // Import the handler AFTER mocking the module
  const handler = (await import('./gemini.ts')).default;

  const formData = { name: 'John Doe', company: 'Acme Corp' };
  const req = {
    method: 'POST',
    body: {
      action: 'generateLeadSummary',
      formData
    }
  };

  const res = {
    status: mock.fn(() => res),
    json: mock.fn(),
    setHeader: mock.fn()
  };

  // Mock successful response for lead summary (expects JSON parsing)
  generateContentMock.mock.mockImplementationOnce(async () => ({
    text: JSON.stringify({ summary: 'Lead Summary', priority: 'High', suggestedQuestions: [] })
  }));

  await handler(req, res);

  // Check calls (second call)
  const args = generateContentMock.mock.calls[1].arguments[0];

  // Verify that systemInstruction is used
  assert.ok(args.config?.systemInstruction, 'systemInstruction should be present in config');
  assert.match(args.config.systemInstruction, /Summarize the B2B inquiry/, 'systemInstruction content mismatch');

  // Verify that contents is structured and separates user input
  assert.ok(Array.isArray(args.contents), 'contents should be an array of Content objects');
  const userContent = args.contents.find((c: any) => c.role === 'user');
  assert.ok(userContent, 'There should be a user content part');
  assert.strictEqual(userContent.parts[0].text, JSON.stringify(formData), 'User input should be in the user content part');
});
