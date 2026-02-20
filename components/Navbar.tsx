
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';
import { PageRoute } from '../types';
import { throttle } from '../utils/performance';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => setIsScrolled(window.scrollY > 50), 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to={PageRoute.HOME} className="flex items-center space-x-2">
          <span className="stiki-logo text-3xl">{BRAND_NAME}</span>
        </Link>
        
        <div className="hidden md:flex space-x-10 text-sm font-semibold uppercase tracking-wider">
          <Link to={PageRoute.SOLUTIONS} className="hover:text-stikiRed transition-colors">Solutions</Link>
          <Link to={PageRoute.SERVICES} className="hover:text-stikiRed transition-colors">Services</Link>
          <Link to={PageRoute.GENETEC} className="hover:text-stikiRed transition-colors">Partners</Link>
          <Link to={PageRoute.CONTACT} className="bg-stikiRed text-white px-5 py-2 rounded-sm hover:bg-black transition-all">Request Quote</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
