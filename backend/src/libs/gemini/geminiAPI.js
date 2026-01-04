import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export default async function geminiAPI() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{ text: "Who are you?" }]
            }
        ],
        config: {
            response_mime_type: "text/plain",
            systemInstruction: {
                parts: [
                    {
                        text: "You are a Pitch Deck Matcher whose name is `Pitch-Dekh`. You are an AI assistant that helps users analyze and match their uploaded pitch with the most suitable VCs whose data is stored in the database."
                    }
                ]
            }
        }
    });

    console.log(response.candidates[0].content.parts[0].text);
}
