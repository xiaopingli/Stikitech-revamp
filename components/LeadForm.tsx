
import React, { useState } from 'react';
import { INDUSTRY_SECTORS } from '../constants.ts';
import { generateLeadSummary } from '../services/geminiService.ts';
import { validateLeadForm, type LeadFormErrors } from '../services/validation.ts';

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    sector: '',
    requirements: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<LeadFormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateLeadForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setStatus('loading');
    
    try {
      // Simulate submission and AI processing
      await generateLeadSummary(formData);
      setTimeout(() => setStatus('success'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-12 rounded shadow-xl text-center border-t-4 border-green-500">
        <h3 className="text-3xl font-bold mb-4">Request Received</h3>
        <p className="text-slate-600 mb-8">A Stikitech Solution Expert will review your technical requirements and contact you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="text-stikiRed font-bold hover:underline">Send another inquiry</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded shadow-2xl border-t-4 border-stikiRed">
      <h3 className="text-2xl font-bold mb-6 text-charcoal">Solution Inquiry</h3>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1">
              Contact Name <span className="text-stikiRed">*</span>
            </label>
            <input
              id="contact-name"
              type="text" required placeholder="Contact Name"
              className={`w-full p-3 bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded text-sm outline-none focus:border-stikiRed transition-colors`}
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium text-slate-700 mb-1">
              Company Name <span className="text-stikiRed">*</span>
            </label>
            <input
              id="company-name"
              type="text" required placeholder="Company Name"
              className={`w-full p-3 bg-slate-50 border ${errors.company ? 'border-red-500' : 'border-slate-200'} rounded text-sm outline-none focus:border-stikiRed transition-colors`}
              value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="business-email" className="block text-sm font-medium text-slate-700 mb-1">
            Business Email <span className="text-stikiRed">*</span>
          </label>
          <input 
            id="business-email"
            type="email" required placeholder="Business Email"
            className={`w-full p-3 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded text-sm outline-none focus:border-stikiRed transition-colors`}
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="industry-sector" className="block text-sm font-medium text-slate-700 mb-1">
            Industry Sector <span className="text-stikiRed">*</span>
          </label>
          <select
            id="industry-sector"
            required className={`w-full p-3 bg-slate-50 border ${errors.sector ? 'border-red-500' : 'border-slate-200'} rounded text-sm outline-none focus:border-stikiRed transition-colors`}
            value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}
          >
            <option value="">Select Industry Sector</option>
            {INDUSTRY_SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.sector && <p className="text-red-500 text-xs mt-1">{errors.sector}</p>}
        </div>
        <div>
          <label htmlFor="project-requirements" className="block text-sm font-medium text-slate-700 mb-1">
            Project Scope <span className="text-stikiRed">*</span>
          </label>
          <textarea
            id="project-requirements"
            required placeholder="Outline project scope (e.g., Camera count, retention needs, networking topology)"
            className={`w-full p-3 bg-slate-50 border ${errors.requirements ? 'border-red-500' : 'border-slate-200'} rounded text-sm outline-none focus:border-stikiRed transition-colors h-32`}
            value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})}
          ></textarea>
          {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
        </div>
        
        <button 
          type="submit" disabled={status === 'loading'}
          className="w-full bg-charcoal text-white py-4 font-bold rounded hover:bg-stikiRed transition-all flex items-center justify-center"
        >
          {status === 'loading' ? 'Processing Technical Lead...' : 'Request Technical Quotation'}
        </button>
        <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest mt-4">Security Authorized Personnel Only</p>
      </form>
    </div>
  );
};

export default LeadForm;
