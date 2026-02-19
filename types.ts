
export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  image: string;
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
