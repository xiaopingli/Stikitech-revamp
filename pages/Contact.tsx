import React from 'react';
import LeadForm from '../components/LeadForm.tsx';
import { CONTACT_INFO } from '../constants.ts';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-pearlWhite">
      {/* Header Section */}
      <section className="bg-charcoal py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Get in touch with our team for sales, support, or general inquiries.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-charcoal">Get in Touch</h2>
            <div className="space-y-8 text-lg">
              <div>
                <h3 className="font-bold text-stikiRed mb-2 uppercase tracking-wide text-sm">Sales</h3>
                <a href={`mailto:${CONTACT_INFO.salesEmail}`} className="text-slate-700 hover:text-stikiRed transition-colors">{CONTACT_INFO.salesEmail}</a>
              </div>
              <div>
                <h3 className="font-bold text-stikiRed mb-2 uppercase tracking-wide text-sm">Support</h3>
                <a href={`mailto:${CONTACT_INFO.supportEmail}`} className="text-slate-700 hover:text-stikiRed transition-colors">{CONTACT_INFO.supportEmail}</a>
              </div>
              <div>
                <h3 className="font-bold text-stikiRed mb-2 uppercase tracking-wide text-sm">Phone</h3>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-slate-700 hover:text-stikiRed transition-colors">{CONTACT_INFO.phone}</a>
              </div>
              <div>
                <h3 className="font-bold text-stikiRed mb-2 uppercase tracking-wide text-sm">Address</h3>
                <address className="text-slate-700 not-italic">
                  {CONTACT_INFO.address.line1}<br />
                  {CONTACT_INFO.address.line2}
                </address>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <div>
             <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
