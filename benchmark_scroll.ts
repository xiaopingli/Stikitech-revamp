
import { throttle } from './utils/performance.ts';

// Simulation parameters
const SCROLL_THRESHOLD = 50;
const THROTTLE_LIMIT = 100;

// Baseline implementation
function baseline() {
    let isScrolled = false;
    let executionCount = 0;

    const setIsScrolled = (val: boolean) => {
        isScrolled = val;
    };

    const handleScroll = (scrollY: number) => {
        executionCount++;
        setIsScrolled(scrollY > SCROLL_THRESHOLD);
    };

    // Simulate 100 events
    const TOTAL_EVENTS = 100;
    for (let i = 0; i < TOTAL_EVENTS; i++) {
        const scrollY = 40 + (i % 20);
        handleScroll(scrollY);
    }

    return {
        name: 'Baseline (Unthrottled)',
        executions: executionCount,
        totalEvents: TOTAL_EVENTS
    };
}

// Throttled implementation
async function throttledBench() {
    let isScrolled = false;
    let executionCount = 0;

    const setIsScrolled = (val: boolean) => {
        isScrolled = val;
    };

    // The logic inside throttle
    const handleScrollLogic = (scrollY: number) => {
        executionCount++;
        setIsScrolled(scrollY > SCROLL_THRESHOLD);
    };

    const handleScroll = throttle(handleScrollLogic, THROTTLE_LIMIT);

    const start = performance.now();

    // Simulate events over time
    // We will simulate 100 events, spaced 10ms apart. Total time 1000ms.
    // Expected execution count: ~10 (1000ms / 100ms) + 1 (initial) = 11.

    const EVENT_INTERVAL = 10;
    const TOTAL_EVENTS = 100;

    for (let i = 0; i < TOTAL_EVENTS; i++) {
        const scrollY = 40 + (i % 20);
        handleScroll(scrollY);
        await new Promise(resolve => setTimeout(resolve, EVENT_INTERVAL));
    }

    // Wait for trailing edge
    await new Promise(resolve => setTimeout(resolve, THROTTLE_LIMIT + 50));

    const end = performance.now();

    return {
        name: 'Throttled',
        executions: executionCount,
        time: end - start,
        totalEvents: TOTAL_EVENTS
    };
}

// Run benchmarks
console.log('Running Benchmarks...');

const baselineResult = baseline();
console.log('Baseline:', baselineResult);

throttledBench().then(throttledResult => {
    console.log('Throttled:', throttledResult);

    console.log('\n--- Results ---');
    console.log(`Baseline executions: ${baselineResult.executions} for ${baselineResult.totalEvents} events`);
    console.log(`Throttled executions: ${throttledResult.executions} for ${throttledResult.totalEvents} events`);
    console.log(`Reduction: ${(1 - throttledResult.executions / throttledResult.totalEvents) * 100}% fewer calls.`);
});
