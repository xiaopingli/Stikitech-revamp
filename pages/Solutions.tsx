
import React from 'react';
import { SOLUTIONS } from '../constants.ts';

const Solutions: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-pearlWhite">
      <section className="bg-charcoal py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Security Solutions Grid</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            From edge device to enterprise core, we distribute the pillars of modern IP security.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {SOLUTIONS.map(sol => (
            <div key={sol.id} className="group bg-white rounded shadow-sm overflow-hidden flex flex-col md:flex-row border border-slate-100 hover:shadow-xl transition-all">
              <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img src={sol.image} alt={sol.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 md:w-2/3">
                <span className="text-stikiRed font-bold text-xs uppercase tracking-widest">{sol.category}</span>
                <h3 className="text-2xl font-bold mt-2 mb-4">{sol.title}</h3>
                <p className="text-slate-600 mb-6">{sol.description}</p>
                <div className="flex space-x-4">
                  <button className="text-sm font-bold border-b-2 border-stikiRed">Download Manual</button>
                  <button className="text-sm font-bold border-b-2 border-charcoal">Case Studies</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Solutions;
