
import React from 'react';
import { test, describe, afterEach } from 'node:test';
import assert from 'node:assert';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  afterEach(() => {
    cleanup();
    // Reset scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  test('renders navbar initially transparent', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const nav = screen.getByRole('navigation');
    assert.ok(nav.className.includes('bg-transparent'), 'Navbar should be transparent initially');
    assert.ok(!nav.className.includes('bg-white'), 'Navbar should not be white initially');
  });

  test('changes style on scroll', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation');
    assert.ok(nav.className.includes('bg-transparent'), 'Navbar should be transparent initially');

    // Simulate scroll
    // JSDOM doesn't update window.scrollY automatically on scroll event, so we define it manually
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });

    // Fire scroll event
    fireEvent.scroll(window);

    // Check if class changed
    assert.ok(nav.className.includes('bg-white'), 'Navbar should be white after scroll');
    assert.ok(nav.className.includes('shadow-md'), 'Navbar should have shadow after scroll');
    assert.ok(!nav.className.includes('bg-transparent'), 'Navbar should not be transparent after scroll');
  });
});
