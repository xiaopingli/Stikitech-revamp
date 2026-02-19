
import React from 'react';
import { SERVICES } from '../constants.ts';

const Services: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-pearlWhite">
      <section className="bg-charcoal py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Value-Added Services</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            We don't just move hardware. We provide the technical backbone for your integration business.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {SERVICES.map(service => (
            <div key={service.id} className="border-l-4 border-stikiRed pl-8 py-4">
              <h3 className="text-3xl font-bold mb-4">{service.name}</h3>
              <p className="text-slate-600 mb-8 text-lg">{service.summary}</p>
              <ul className="space-y-4">
                {service.details.map(detail => (
                  <li key={detail} className="flex items-center text-slate-700 font-medium">
                    <span className="w-2 h-2 bg-stikiRed rounded-full mr-3"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
