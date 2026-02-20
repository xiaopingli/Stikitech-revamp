
import React from 'react';
import {
  BRAND_NAME,
  FOOTER_DESCRIPTION,
  SOCIAL_LINKS,
  DISTRIBUTION_LINKS,
  CONTACT_INFO,
  LEGAL_LINKS
} from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <span className="stiki-logo text-4xl mb-6 block">{BRAND_NAME}</span>
          <p className="text-slate-400 max-w-sm mb-8">
            {FOOTER_DESCRIPTION}
          </p>
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map(social => (
              <a key={social.name} href={social.url} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-stikiRed transition-colors">
                <span className="text-[10px] uppercase font-bold">{social.name[0]}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-stikiRed">Distribution</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            {DISTRIBUTION_LINKS.map(link => (
              <li key={link.name}>
                <a href={link.url} className="hover:text-white transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-stikiRed">Inquiries</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li>Sales: {CONTACT_INFO.salesEmail}</li>
            <li>Support: {CONTACT_INFO.supportEmail}</li>
            <li>Office: {CONTACT_INFO.phone}</li>
            <li className="mt-6">
              <span className="block font-bold text-white">Global HQ</span>
              {CONTACT_INFO.address.line1}<br/>{CONTACT_INFO.address.line2}
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} {BRAND_NAME} INC. ALL RIGHTS RESERVED.</p>
        <div className="space-x-8">
          {LEGAL_LINKS.map(link => (
            <a key={link.name} href={link.url} className="hover:text-white">{link.name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
