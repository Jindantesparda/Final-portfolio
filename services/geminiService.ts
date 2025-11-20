import { GoogleGenAI, Type, Schema } from "@google/genai";
import { VisualConfig, VisualizationMode } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    speed: { type: Type.NUMBER, description: "Speed of the tunnel. Use slower speeds (0.2-1.0) for reading modes, faster for excitement." },
    colorPrimary: { type: Type.STRING, description: "Main hex color." },
    colorSecondary: { type: Type.STRING, description: "Secondary hex color." },
    bloomStrength: { type: Type.NUMBER, description: "Glow intensity." },
    mode: { type: Type.STRING, enum: [VisualizationMode.WARP, VisualizationMode.FLOAT, VisualizationMode.CHAOS], description: "The movement pattern." },
    message: { type: Type.STRING, description: "A short comment on the portfolio theme created." }
  },
  required: ["speed", "colorPrimary", "colorSecondary", "bloomStrength", "mode", "message"]
};

export async function generateVisualConfig(prompt: string): Promise<{ config: Partial<VisualConfig>, message: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the AI Theme Designer for Munyaradzi Mzite's Computer Science portfolio.
      He is a student at Africa University, passionate about Art and Technology.
      Key projects: "Braille Eyes" (Vision augmentation), "Offline Payment" (Fintech), and 3D Blender Animations.

      User request: "${prompt}".
      
      Translate the request into abstract 3D visual settings.
      - "Hacker/Matrix" -> Green colors, Chaos mode, high speed.
      - "Professional/Clean" -> White/Blue, Float mode, slow speed.
      - "Artistic/Blender" -> Orange/Purple, Float mode.
      - "Braille Eyes" -> High contrast, accessible colors.
      
      Ensure the background supports text readability unless requested otherwise.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const text = response.text;
    if (!text) return { config: {}, message: "Could not generate config." };

    const data = JSON.parse(text);

    const config: Partial<VisualConfig> = {
      speed: data.speed,
      colorPrimary: data.colorPrimary,
      colorSecondary: data.colorSecondary,
      bloomStrength: data.bloomStrength,
      mode: data.mode as VisualizationMode,
    };

    return { config, message: data.message };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { config: {}, message: "Failed to contact AI. Try again." };
  }
}