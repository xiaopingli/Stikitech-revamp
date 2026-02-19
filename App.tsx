
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PartnerPage from './pages/PartnerPage';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import WhatsAppIcon from './components/WhatsAppIcon';
import { PageRoute } from './types';

const App: React.FC = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
