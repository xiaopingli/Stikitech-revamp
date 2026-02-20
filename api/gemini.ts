
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { action, userInput, formData } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    if (action === 'getSolutionRecommendation') {
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
      return res.status(200).json({ text: response.text });
    } else if (action === 'generateLeadSummary') {
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
      return res.status(200).json(JSON.parse(response.text));
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to process request with Gemini API', details: error.message });
  }
}
