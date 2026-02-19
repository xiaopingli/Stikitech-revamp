
import React from 'react';

const PartnerPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block bg-stikiRed px-4 py-1 rounded-sm text-xs font-bold mb-6 tracking-widest uppercase">Platinum Distribution Partner</div>
          <h1 className="text-6xl font-bold mb-6">Genetec Unified Security</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            We distribute the world's most advanced security platforms, providing our partners with the tools to build truly unified safety environments.
          </p>
        </div>
      </div>

      {/* Product Highlights */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: 'Omnicast™', type: 'Video Management', desc: 'Enterprise IP video system that scales to thousands of cameras seamlessly.' },
            { name: 'Synergis™', type: 'Access Control', desc: 'IP-based access control that ensures hardware independence and future-proofing.' },
            { name: 'AutoVu™', type: 'LPR & ALPR', desc: 'Automatic license plate recognition for parking management and city-wide safety.' }
          ].map(product => (
            <div key={product.name} className="border-t-4 border-stikiRed pt-8">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{product.type}</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">{product.name}</h3>
              <p className="text-slate-600 mb-8">{product.desc}</p>
              <button className="text-stikiRed font-bold hover:underline">Download Datasheet</button>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Services */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-bold mb-6">Localized Support for Integrators</h2>
              <p className="text-slate-600 mb-6">
                Stikitech provides Tier 3 engineering support for every Genetec deployment we distribute. We aren't just a box mover; we are your technical backbone.
              </p>
              <button className="bg-charcoal text-white px-8 py-3 rounded hover:bg-stikiRed transition-all">Connect with an Engineer</button>
            </div>
            <div className="md:w-2/3 grid md:grid-cols-2 gap-8">
              {[
                'Configuration Validation',
                'Advanced Field Commissioning',
                'Custom Plug-in Development',
                'End-User Operator Training'
              ].map(service => (
                <div key={service} className="bg-white p-8 rounded shadow-sm border border-slate-200">
                  <h4 className="font-bold text-lg mb-2">{service}</h4>
                  <p className="text-slate-500 text-sm">Comprehensive technical assistance tailored for large-scale enterprise projects.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
