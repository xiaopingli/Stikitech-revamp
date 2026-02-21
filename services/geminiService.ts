
import type { LeadFormData } from '../types.ts';

export const getSolutionRecommendation = async (userInput: string) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'getSolutionRecommendation',
      userInput,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get recommendation');
  }

  const data = await response.json();
  return data.text;
};

export const generateLeadSummary = async (formData: LeadFormData) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'generateLeadSummary',
      formData,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate lead summary');
  }

  return response.json();
};
