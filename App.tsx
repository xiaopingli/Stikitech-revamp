
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import WhatsAppIcon from './components/WhatsAppIcon.tsx';
import LoadingFallback from './components/LoadingFallback.tsx';
import { PageRoute } from './types.ts';

const Home = lazy(() => import('./pages/Home.tsx'));
const PartnerPage = lazy(() => import('./pages/PartnerPage.tsx'));
const Solutions = lazy(() => import('./pages/Solutions.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-stikiRed selection:text-white bg-pearlWhite">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path={PageRoute.HOME} element={<Home />} />
              <Route path={PageRoute.SOLUTIONS} element={<Solutions />} />
              <Route path={PageRoute.SERVICES} element={<Services />} />
              <Route path={PageRoute.GENETEC} element={<PartnerPage />} />
              <Route path={PageRoute.CONTACT} element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppIcon />
      </div>
    </Router>
  );
};

export default App;
