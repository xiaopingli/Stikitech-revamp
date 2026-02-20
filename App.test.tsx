import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AppRoutes } from './App';
import { PageRoute } from './types';

// Mock child components to isolate routing tests
vi.mock('./pages/Home', () => ({ default: () => <div data-testid="home-page">Home Page</div> }));
vi.mock('./pages/Solutions', () => ({ default: () => <div data-testid="solutions-page">Solutions Page</div> }));
vi.mock('./pages/Services', () => ({ default: () => <div data-testid="services-page">Services Page</div> }));
vi.mock('./pages/PartnerPage', () => ({ default: () => <div data-testid="partner-page">Partner Page</div> }));
vi.mock('./components/Navbar', () => ({ default: () => <div data-testid="navbar">Navbar</div> }));
vi.mock('./components/Footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));
vi.mock('./components/WhatsAppIcon', () => ({ default: () => <div data-testid="whatsapp-icon">WhatsApp Icon</div> }));

describe('App Routing', () => {
  it('renders Home page on default route', () => {
    render(
      <MemoryRouter initialEntries={[PageRoute.HOME]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders Solutions page on solutions route', () => {
    render(
      <MemoryRouter initialEntries={[PageRoute.SOLUTIONS]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('solutions-page')).toBeInTheDocument();
  });

  it('renders Services page on services route', () => {
    render(
      <MemoryRouter initialEntries={[PageRoute.SERVICES]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('services-page')).toBeInTheDocument();
  });

  it('renders PartnerPage on genetec route', () => {
    render(
      <MemoryRouter initialEntries={[PageRoute.GENETEC]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('partner-page')).toBeInTheDocument();
  });

  it('redirects to Home on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
