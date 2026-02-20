
export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  image: string;
  manualUrl?: string;
  caseStudyUrl?: string;
}

export interface Partner {
  name: string;
  logo: string;
  description: string;
  tier: string;
}

export interface Service {
  id: string;
  name: string;
  summary: string;
  details: string[];
}

export enum PageRoute {
  HOME = '/',
  SOLUTIONS = '/solutions',
  SERVICES = '/services',
  GENETEC = '/partners/genetec',
  CONTACT = '/contact'
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface FooterLink {
  name: string;
  url: string;
}

export interface ContactInfo {
  salesEmail: string;
  supportEmail: string;
  phone: string;
  whatsapp: string;
  address: {
    line1: string;
    line2: string;
  };
}
