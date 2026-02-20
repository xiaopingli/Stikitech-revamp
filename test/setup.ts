
import { JSDOM } from 'jsdom';

// Configure JSDOM
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});

// Expose globals
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;

// Safely set navigator
if (!global.navigator) {
  // @ts-ignore
  global.navigator = dom.window.navigator;
} else {
    // If it exists but we want to patch it? usually node's navigator is fine for basics
    // but jsdom's might have more.
    // Try defineProperty if needed
    try {
        Object.defineProperty(global, 'navigator', {
            value: dom.window.navigator,
            writable: true
        });
    } catch (e) {
        console.warn('Could not overwrite global.navigator', e);
    }
}

global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;

// Mock fetch globally
global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = input.toString();

  // Mock API response for Gemini service
  if (url.includes('/api/gemini')) {
    // Check if it's the lead summary or solution recommendation
    // For simplicity, return a generic success response
    return {
      ok: true,
      json: async () => ({ text: 'Mocked Gemini response' }),
    } as Response;
  }

  return {
    ok: true,
    json: async () => ({}),
  } as Response;
};

// Polyfill for queueMicrotask if needed (Node usually has it)
if (!global.queueMicrotask) {
    global.queueMicrotask = (callback) => Promise.resolve().then(callback);
}
