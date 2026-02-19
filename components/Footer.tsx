
import React from 'react';
import { BRAND_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <span className="stiki-logo text-4xl mb-6 block">{BRAND_NAME}</span>
          <p className="text-slate-400 max-w-sm mb-8">
            The standard in enterprise security distribution. Empowering integrators through technical excellence and unified technology stacks.
          </p>
          <div className="flex space-x-4">
            {['LinkedIn', 'Twitter', 'YouTube'].map(social => (
              <a key={social} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-stikiRed transition-colors">
                <span className="text-[10px] uppercase font-bold">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-stikiRed">Distribution</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Video Surveillance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Managed Networking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Enterprise Storage</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LPR Systems</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-stikiRed">Inquiries</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li>Sales: sales@stikitech.com</li>
            <li>Support: support@stikitech.com</li>
            <li>Office: +1 (555) STIKI-TECH</li>
            <li className="mt-6">
              <span className="block font-bold text-white">Global HQ</span>
              123 Enterprise Way, Suite 400<br/>San Francisco, CA 94105
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 uppercase tracking-widest">
        <p>© 2026 STIKITECH INC. ALL RIGHTS RESERVED.</p>
        <div className="space-x-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
