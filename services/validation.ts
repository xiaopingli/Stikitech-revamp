
import { INDUSTRY_SECTORS } from '../constants.ts';

export interface LeadFormErrors {
  name?: string;
  company?: string;
  email?: string;
  sector?: string;
  requirements?: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  sector: string;
  requirements: string;
}

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLeadForm = (formData: LeadFormData): { isValid: boolean; errors: LeadFormErrors } => {
  const errors: LeadFormErrors = {};
  let isValid = true;

  // Name validation
  const name = formData.name.trim();
  if (!name) {
    errors.name = 'Contact Name is required.';
    isValid = false;
  } else if (name.length < 2) {
    errors.name = 'Contact Name must be at least 2 characters.';
    isValid = false;
  } else if (name.length > 50) {
    errors.name = 'Contact Name must be less than 50 characters.';
    isValid = false;
  } else if (!NAME_REGEX.test(name)) {
    errors.name = 'Contact Name can only contain letters, spaces, hyphens, and apostrophes.';
    isValid = false;
  }

  // Company validation
  const company = formData.company.trim();
  if (!company) {
    errors.company = 'Company Name is required.';
    isValid = false;
  } else if (company.length < 2) {
    errors.company = 'Company Name must be at least 2 characters.';
    isValid = false;
  } else if (company.length > 100) {
    errors.company = 'Company Name must be less than 100 characters.';
    isValid = false;
  }

  // Email validation
  const email = formData.email.trim();
  if (!email) {
    errors.email = 'Business Email is required.';
    isValid = false;
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
    isValid = false;
  }

  // Sector validation
  if (!formData.sector) {
    errors.sector = 'Industry Sector is required.';
    isValid = false;
  } else if (!INDUSTRY_SECTORS.includes(formData.sector)) {
    errors.sector = 'Invalid Industry Sector selected.';
    isValid = false;
  }

  // Requirements validation
  const requirements = formData.requirements.trim();
  if (!requirements) {
    errors.requirements = 'Project Scope is required.';
    isValid = false;
  } else if (requirements.length < 10) {
    errors.requirements = 'Project Scope must be at least 10 characters.';
    isValid = false;
  } else if (requirements.length > 500) {
    errors.requirements = 'Project Scope must be less than 500 characters.';
    isValid = false;
  }

  return { isValid, errors };
};
