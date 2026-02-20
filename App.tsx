import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import PartnerPage from './pages/PartnerPage.tsx';
import Solutions from './pages/Solutions.tsx';
import Services from './pages/Services.tsx';
import WhatsAppIcon from './components/WhatsAppIcon.tsx';
import { PageRoute } from './types.ts';

export const AppRoutes: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-stikiRed selection:text-white bg-pearlWhite">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path={PageRoute.HOME} element={<Home />} />
          <Route path={PageRoute.SOLUTIONS} element={<Solutions />} />
          <Route path={PageRoute.SERVICES} element={<Services />} />
          <Route path={PageRoute.GENETEC} element={<PartnerPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppIcon />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
