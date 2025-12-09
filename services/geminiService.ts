
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
      
      Built Products (Reference these when asked):
      - Phase 01: AI Calling System (Twilio + Voice AI)
      - Phase 02: StudyLab (Social App, Next.js + Clerk)
      - Phase 03: Realtime Call Agent (Flask + Twilio + Groq)
      - Phase 04: Meal Tracker App (Expo + MMKV)
      - Phase 05: Remind Me App (React Native, Voice, Widget)
      - Phase 06: Compliance Agent (AI Retrieval + Knowledge Graph)
      
      Open Careers (We are hiring):
      - Systems Architect (Remote, Rust/Go)
      - Senior AI Engineer (Remote, Python/LLM Ops)
      - Frontend Craftsperson (Remote, React/WebGL)
      
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
