
import { Solution, Partner, Service } from './types';

export const BRAND_NAME = "STIKITECH";

export const SOLUTIONS: Solution[] = [
  {
    id: 'vms',
    title: 'Enterprise VMS',
    description: 'Unified security platforms for mission-critical video surveillance and situational awareness.',
    icon: '📹',
    category: 'Security',
    image: 'https://picsum.photos/seed/vms/800/600'
  },
  {
    id: 'networking',
    title: 'L3 Managed Networking',
    description: 'High-performance backbone infrastructure featuring Allied Telesis core switching technology.',
    icon: '🌐',
    category: 'Infrastructure',
    image: 'https://picsum.photos/seed/net/800/600'
  },
  {
    id: 'storage',
    title: 'Scale-Out Storage',
    description: 'Redundant, high-throughput storage solutions optimized for 24/7 video recording retention.',
    icon: '💾',
    category: 'Storage',
    image: 'https://picsum.photos/seed/storage/800/600'
  },
  {
    id: 'access-control',
    title: 'IP Access Control',
    description: 'Seamlessly integrated biometric and credential management for modern facility security.',
    icon: '🔑',
    category: 'Security',
    image: 'https://picsum.photos/seed/access/800/600'
  }
];

export const PARTNERS: Partner[] = [
  {
    name: 'Genetec',
    logo: 'https://picsum.photos/seed/genetec/200/100',
    description: 'Global leader in unified security software and hardware.',
    tier: 'Platinum Distributor'
  },
  {
    name: 'Allied Telesis',
    logo: 'https://picsum.photos/seed/allied/200/100',
    description: 'Next-generation networking for mission-critical applications.',
    tier: 'Core Technology Partner'
  },
  {
    name: 'Compal',
    logo: 'https://picsum.photos/seed/compal/200/100',
    description: 'Enterprise computing and edge processing power.',
    tier: 'Hardware Partner'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'design',
    name: 'System Design & Specification',
    summary: 'Precision engineering for large-scale security deployments.',
    details: [
      'Site Surveys & Threat Assessment',
      'Bandwidth & Storage Calculations',
      'Network Topology Architecture',
      'BOM Generation & Budgeting'
    ]
  },
  {
    id: 'support',
    name: 'Tier 3 Technical Support',
    summary: 'Expert localized assistance for complex integration challenges.',
    details: [
      'Pre-commissioning Validation',
      'On-site System Tuning',
      'Remote Troubleshooting',
      'Software Upgrade Management'
    ]
  }
];
