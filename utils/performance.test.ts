
import { test, describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { throttle } from './performance.ts';

describe('throttle', () => {
  it('should execute immediately and throttle subsequent calls', (t) => {
    // Mock setTimeout
    const originalSetTimeout = global.setTimeout;
    const timers: Function[] = [];
    // @ts-ignore
    global.setTimeout = (cb: Function, delay: number) => {
        timers.push(cb);
        return {} as any;
    };

    try {
        const fn = mock.fn();
        const throttled = throttle(fn, 100);

        // Call 1: Leading edge
        throttled(1);
        assert.strictEqual(fn.mock.callCount(), 1);
        assert.deepStrictEqual(fn.mock.calls[0].arguments, [1]);

        // Call 2: Within limit
        throttled(2);
        assert.strictEqual(fn.mock.callCount(), 1);

        // Call 3: Within limit (should overwrite previous trailing args)
        throttled(3);
        assert.strictEqual(fn.mock.callCount(), 1);

        // Simulate timer firing
        const callback = timers.shift();
        if (callback) callback();

        // Should execute with latest args (3)
        assert.strictEqual(fn.mock.callCount(), 2);
        assert.deepStrictEqual(fn.mock.calls[1].arguments, [3]);
    } finally {
        global.setTimeout = originalSetTimeout;
    }
  });
});
