import React from 'react';
import LeadForm from '../components/LeadForm.tsx';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-pearlWhite">
      <section className="bg-charcoal py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Get in touch with our team for technical inquiries and quotes.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
           <LeadForm />
        </div>
      </section>
    </div>
  );
};

export default Contact;
