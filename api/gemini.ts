
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
        config: {
          systemInstruction: `You are the Stikitech Solution Architect.
        Provide a professional B2B recommendation based on the client's inquiry.
        The recommendation must include:
        1. Primary VMS/Software (Focus on Genetec)
        2. Infrastructure (Focus on Allied Telesis switches)
        3. Storage requirements.
        Keep the tone authoritative and technical.`,
          temperature: 0.7,
          topP: 0.9,
          thinkingConfig: { thinkingBudget: 2000 }
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: `A client asks: "${userInput}"` }]
          }
        ]
      });
      return res.status(200).json({ text: response.text });
    } else if (action === 'generateLeadSummary') {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Summarize the B2B inquiry provided by the user for a sales representative.
        Suggest 3 qualifying questions for the first call.`,
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
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: JSON.stringify(formData) }]
          }
        ]
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
