
import type { Solution, Partner, Service, SocialLink, FooterLink, ContactInfo } from './types.ts';

export const BRAND_NAME = "STIKITECH";

export const FOOTER_DESCRIPTION = "The standard in enterprise security distribution. Empowering integrators through technical excellence and unified technology stacks.";

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', url: '#' },
  { name: 'Twitter', url: '#' },
  { name: 'YouTube', url: '#' }
];

export const DISTRIBUTION_LINKS: FooterLink[] = [
  { name: 'Video Surveillance', url: '#' },
  { name: 'Managed Networking', url: '#' },
  { name: 'Enterprise Storage', url: '#' },
  { name: 'LPR Systems', url: '#' }
];

export const LEGAL_LINKS: FooterLink[] = [
  { name: 'Privacy Policy', url: '#' },
  { name: 'Terms of Service', url: '#' }
];

export const CONTACT_INFO: ContactInfo = {
  salesEmail: 'sales@stikitech.com',
  supportEmail: 'support@stikitech.com',
  phone: '+1 (555) STIKI-TECH',
  whatsapp: '6512345678',
  address: {
    line1: '123 Enterprise Way, Suite 400',
    line2: 'San Francisco, CA 94105'
  },
  whatsapp: (import.meta as any).env?.VITE_WHATSAPP_NUMBER || "6512345678"
};

export const INDUSTRY_SECTORS = [
  "Commercial/Retail",
  "Government/Public Safety",
  "Critical Infrastructure",
  "Data Centers",
  "Transportation/Logistics",
  "Industrial/Manufacturing"
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'vms',
    title: 'Enterprise VMS',
    description: 'Scalable Unified Platforms. We distribute Genetec Omnicast for mission-critical video surveillance and situational awareness.',
    icon: '📹',
    category: 'Security Software',
    image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'networking',
    title: 'High-Performance Networking',
    description: 'L3 Managed Switches from Allied Telesis. Engineered for high-bandwidth IP surveillance traffic.',
    icon: '🌐',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'storage',
    title: 'Edge & Core Storage',
    description: 'Redundant, high-throughput storage solutions from Compal optimized for 24/7 video retention.',
    icon: '💾',
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'access-control',
    title: 'Integrated Access Control',
    description: 'Biometric and credential management powered by Genetec Synergis for modern facility security.',
    icon: '🔑',
    category: 'Security Hardware',
    image: 'https://images.unsplash.com/photo-1510511459019-5dee99c48ea9?auto=format&fit=crop&q=80&w=800'
  }
];

export const PARTNERS: Partner[] = [
  {
    name: 'Genetec',
    logo: 'GENETEC',
    description: 'World leader in unified security software.',
    tier: 'Platinum Distributor'
  },
  {
    name: 'Allied Telesis',
    logo: 'ALLIED TELESIS',
    description: 'Network switches for extreme reliability.',
    tier: 'Core Distribution'
  },
  {
    name: 'Compal',
    logo: 'COMPAL',
    description: 'Enterprise computing and edge processing.',
    tier: 'Hardware Partner'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'design',
    name: 'Pre-Sales Architecture',
    summary: 'Precision engineering for large-scale security deployments.',
    details: [
      'Site Surveys & Threat Assessment',
      'Bandwidth & Storage Calculations',
      'Network Topology Architecture',
      'BOM Generation'
    ]
  },
  {
    id: 'support',
    name: 'Tier 3 Post-Sales Support',
    summary: 'Expert localized assistance for complex integration challenges.',
    details: [
      'Pre-commissioning Validation',
      'On-site System Tuning',
      'Remote Troubleshooting',
      'Software Upgrade Management'
    ]
  }
];
