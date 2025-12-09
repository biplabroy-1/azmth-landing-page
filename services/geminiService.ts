/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'AZMTH OS', the automated assistant for AZMTH Studio.
      AZMTH is a monochrome systems engineering studio focused on backend infrastructure, AI automation, and reliable software.
      
      Services:
      - Phase 01: Discovery Grid, System Blueprints.
      - Phase 02: Build Engine, Ops Layer (CI/CD, Cloud).
      - Phase 03: Control Panels, Scale Track.
      
      Pricing:
      - Sprint Audit ($1,499)
      - Build Sprint ($4,999)
      - Embedded Partner (Custom)
      
      Tone: Technical, precise, minimal, robotic but helpful. Avoid fluff. Use terms like "Latency", "Throughput", "Signal", "Deployment".
      Responses must be short (under 40 words).
      `,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Err: API_KEY_MISSING. System offline.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Err: NO_RESPONSE.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Err: CONNECTION_LOST.";
  }
};