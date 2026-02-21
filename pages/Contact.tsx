import React from 'react';
import LeadForm from '../components/LeadForm.tsx';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Get in touch with our solution experts for a quote or technical consultation.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <LeadForm />
      </div>
    </div>
  );
};

export default Contact;
