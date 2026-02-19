
import React, { useState } from 'react';
import { INDUSTRY_SECTORS } from '../constants';
import { generateLeadSummary } from '../services/geminiService';

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    sector: '',
    requirements: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            type="text" required placeholder="Contact Name"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-stikiRed transition-colors"
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="text" required placeholder="Company Name"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-stikiRed transition-colors"
            value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
          />
        </div>
        <input 
          type="email" required placeholder="Business Email"
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-stikiRed transition-colors"
          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <select 
          required className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-stikiRed transition-colors"
          value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}
        >
          <option value="">Select Industry Sector</option>
          {INDUSTRY_SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <textarea 
          required placeholder="Outline project scope (e.g., Camera count, retention needs, networking topology)"
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm outline-none focus:border-stikiRed transition-colors h-32"
          value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})}
        ></textarea>
        
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
