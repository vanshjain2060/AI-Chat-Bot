// src/services/geminiApi.js
import { createGoogleGenerativeAI, google } from '@ai-sdk/google';
import { generateText } from 'ai';

// Healthcare keywords to restrict domain
const healthcareKeywords = [
  "hello", "i'm", "i am", "health", "doctor", "medicine", "hospital", "symptom", "treatment",
  "diagnosis", "appointment", "fever", "cold", "cough", "flu", "infection",
  "pain", "injury", "disease", "illness", "therapy", "prescription", "pharmacy",
  "vaccine", "surgery", "emergency", "clinic", "nurse", "specialist", "cardiology",
  "neurology", "pediatrics", "oncology", "dermatology", "radiology", "mental health",
  "wellness", "checkup", "immunization", "rehabilitation", "nutrition", "exercise",
  "healthcare", "medical", "patient", "consultation", "medication", "recovery",
  "headache", "migraine", "stomachache", "back pain", "joint pain", "muscle pain"
];

/**
 * Sends a chat history to Gemini using ai-sdk and returns the reply.
 * Only responds to healthcare-related messages.
 * @param {Array<{sender: string, text?: string, content?: string}>} messages
 * @param {string} modelName - Gemini model identifier, e.g. 'gemini-1.5-pro-latest'
 * @returns {Promise<string>}
 */
export const sendMessageToGemini = async (messages) => {
  if (!messages || messages.length === 0) {
    throw new Error('No messages provided');
  }

  // Verify last user message contains a healthcare keyword
  const last = messages[messages.length - 1];
  const contentText = (last.content || last.text || '').toLowerCase();
  if (!healthcareKeywords.some(kw => contentText.includes(kw))) {
    return "Sorry, I'm a healthcare expert. I can't help with that.";
  }

  const google = createGoogleGenerativeAI({
   apiKey:process.env.REACT_APP_GEMINI_API_KEY,
   
  });

  // Build a chat prompt from history
  const prompt = messages
    .map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.content || m.text}`)
    .join('\n') + '\nAssistant:';

  // Call ai-sdk generateText
  const { text } = await generateText({
    model: google(
      "gemini-1.5-flash"
    ),
    prompt,
    temperature: 0.7,
    topP: 0.85,
    maxTokens: 150,
    // Optional: control candidate count or stop sequences
  });

  return text;
};
