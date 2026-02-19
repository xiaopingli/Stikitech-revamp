
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSolutionRecommendation = async (userInput: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are the Stikitech Solution Architect. A client asks: "${userInput}". 
    Provide a professional B2B recommendation including: 
    1. Primary VMS/Software (Focus on Genetec)
    2. Infrastructure (Focus on Allied Telesis switches)
    3. Storage requirements.
    Keep the tone authoritative and technical.`,
    config: {
      temperature: 0.7,
      topP: 0.9,
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  return response.text;
};

export const generateLeadSummary = async (formData: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize this B2B inquiry for a sales representative: ${JSON.stringify(formData)}. 
    Suggest 3 qualifying questions for the first call.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          priority: { type: Type.STRING },
          suggestedQuestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "priority", "suggestedQuestions"]
      }
    }
  });

  return JSON.parse(response.text);
};
