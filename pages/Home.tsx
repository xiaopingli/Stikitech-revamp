
import React from 'react';
import { Link } from 'react-router-dom';
import { SOLUTIONS, PARTNERS } from '../constants';
import AISolutionArchitect from '../components/AISolutionArchitect';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/security_tech/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-30" 
            alt="Security Infrastructure" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-extrabold text-white leading-tight mb-6">
              Integrated <span className="text-stikiRed">Security</span> Infrastructure
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Stikitech is the premier B2B distributor for mission-critical surveillance, high-performance networking, and enterprise storage solutions.
            </p>
            <div className="flex space-x-4">
              <Link to="/solutions" className="bg-stikiRed hover:bg-white hover:text-charcoal text-white px-8 py-4 rounded font-bold transition-all transform hover:-translate-y-1">
                Explore Solutions
              </Link>
              <Link to="/partners/genetec" className="border-2 border-white hover:bg-white hover:text-charcoal text-white px-8 py-4 rounded font-bold transition-all transform hover:-translate-y-1">
                Partner Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale hover:grayscale-0 transition-all">
            {PARTNERS.map(p => (
              <div key={p.name} className="flex flex-col items-center">
                <span className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">{p.name}</span>
                <div className="h-12 w-32 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-300">LOGO</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Solutions Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise Distribution Grid</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Discover our modular ecosystem of security technologies designed for seamless interoperability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {SOLUTIONS.map((sol, idx) => (
              <div 
                key={sol.id} 
                className={`group relative overflow-hidden rounded-xl bg-white shadow-sm border transition-all hover:shadow-xl ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-stikiRed text-white px-3 py-1 text-xs font-bold rounded uppercase">
                      {sol.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-4xl mb-4 block">{sol.icon}</span>
                      <h3 className="text-2xl font-bold mb-3">{sol.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">{sol.description}</p>
                    </div>
                    <Link to="/solutions" className="text-stikiRed font-bold flex items-center text-sm group-hover:translate-x-2 transition-transform">
                      Technical Specs <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Architect Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">Empower Your Next Deployment with <span className="text-stikiRed">Intelligence.</span></h2>
            <p className="text-lg text-slate-600 mb-8">
              Navigating complex IP security ecosystems requires precision. Our Solution Architect uses Gemini 3 Pro to analyze your specific site needs and generate a vetted Bill of Materials.
            </p>
            <ul className="space-y-4 mb-8">
              {['VMS Selection Optimization', 'Storage Retention Calculators', 'Networking Throughput Analysis'].map(item => (
                <li key={item} className="flex items-center text-slate-700 font-medium">
                  <span className="w-6 h-6 bg-stikiRed/10 text-stikiRed rounded-full flex items-center justify-center mr-3 text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <AISolutionArchitect />
        </div>
      </section>
    </div>
  );
};

export default Home;
