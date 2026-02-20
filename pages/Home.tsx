
import React from 'react';
import { Link } from 'react-router-dom';
import { SOLUTIONS, PARTNERS } from '../constants.ts';
import AISolutionArchitect from '../components/AISolutionArchitect.tsx';
import LeadForm from '../components/LeadForm.tsx';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-20" 
            alt="Global Security Infrastructure" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-extrabold text-white leading-tight mb-8">
              Value-Added <span className="text-stikiRed">Distribution</span>
            </h1>
            <p className="text-2xl text-slate-300 mb-10 leading-relaxed font-light">
              Unified Security Platforms & Industrial Networking for the Singapore Enterprise Market.
            </p>
            <div className="flex space-x-6">
              <Link to="/solutions" className="bg-stikiRed hover:bg-white hover:text-charcoal text-white px-10 py-5 rounded font-bold transition-all transform hover:-translate-y-1 shadow-lg">
                View Solutions
              </Link>
              <Link to="/services" className="border-2 border-white hover:bg-white hover:text-charcoal text-white px-10 py-5 rounded font-bold transition-all transform hover:-translate-y-1">
                Technical Support
              </Link>
            </div>
          </div>
          <div className="hidden lg:block w-96 opacity-50 grayscale">
             {/* Decorative security visual */}
             <div className="border border-slate-600 p-8 rounded-full border-dashed animate-pulse">
                <div className="border border-slate-600 p-8 rounded-full border-dashed">
                  <div className="w-24 h-24 bg-stikiRed/20 rounded-full flex items-center justify-center text-stikiRed text-4xl">🛡️</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-20">
            {PARTNERS.map(p => (
              <div key={p.name} className="flex flex-col items-center group cursor-default">
                <span className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-[0.3em] group-hover:text-stikiRed transition-colors">{p.tier}</span>
                <div className="text-3xl font-black text-slate-200 group-hover:text-charcoal transition-colors tracking-tighter">
                  {p.name.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Architect + Lead Capture */}
      <section className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div>
                 <h2 className="text-5xl font-bold mb-8 leading-tight">Expert Engineering <span className="text-stikiRed">Built-In.</span></h2>
                 <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                    Don't guess your storage requirements or bandwidth limits. Use our AI Solution Architect or connect directly with a Tier-3 Support Specialist.
                 </p>
                 <AISolutionArchitect />
              </div>
              <div className="lg:sticky lg:top-32">
                 <LeadForm />
              </div>
           </div>
        </div>
      </section>

      {/* Featured Solutions (Quick Grid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-bold">Industry Distribution Hub</h2>
            <Link to="/solutions" className="text-stikiRed font-bold hover:underline">View All Technology Pillars →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SOLUTIONS.slice(0, 3).map(sol => (
              <div key={sol.id} className="group relative overflow-hidden rounded-lg bg-charcoal h-[400px]">
                <img
                  src={sol.image}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                  alt={sol.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                   <span className="text-stikiRed font-bold text-xs uppercase tracking-widest">{sol.category}</span>
                   <h3 className="text-2xl font-bold text-white mt-2">{sol.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
