// src/services/monsterApi.js
const MONSTER_API_URL = process.env.REACT_APP_MONSTER_API_URL;
const MONSTER_API_KEY = process.env.REACT_APP_MONSTER_API_KEY;

if (!MONSTER_API_URL || !MONSTER_API_KEY) {
  console.error("Monster API URL or Key is not defined.");
}

const monster_ai_model_name = {
  "Google-Gemma": "google/gemma-2-9b-it",
  "Mistral": "mistralai/Mistral-7B-Instruct-v0.2",
  "Microsoft-Phi": "microsoft/Phi-3-mini-4k-instruct",
  "Meta-Llama": "meta-llama/Meta-Llama-3.1-8B-Instruct",
};

export const sendMessageToMonster = async (messages, model = "Meta-Llama") => {
  try {
    console.log('Received messages:', messages); // Debug log

    if (!messages || messages.length === 0) {
      throw new Error("No messages provided");
    }

    const lastMessage = messages[messages.length - 1];
    const messageContent = lastMessage.content || lastMessage.text;

    if (!messageContent) {
      throw new Error("Last message content is undefined");
    }

    const userMessage = messageContent.toLowerCase();
    const healthcareKeywords = [
      "hello","I'm", "i'm", "health", "doctor", "medicine", "hospital", "symptom", "treatment", 
      "diagnosis", "appointment", "fever", "cold", "cough", "flu", "infection", 
      "pain", "injury", "disease", "illness", "therapy", "prescription", "pharmacy",
      "vaccine", "surgery", "emergency", "clinic", "nurse", "specialist", "cardiology",
      "neurology", "pediatrics", "oncology", "dermatology", "radiology", "mental health",
      "wellness", "checkup", "immunization", "rehabilitation", "nutrition", "exercise",
      "healthcare", "medical", "patient", "consultation", "medication", "recovery",
      "headache", "migraine", "stomachache", "back pain", "joint pain", "muscle pain"
    ];

    const isHealthcareRelated = healthcareKeywords.some(keyword => userMessage.includes(keyword));

    if (!isHealthcareRelated) {
      return "Sorry, I'm a healthcare expert. I can't help you with that.";
    }

    const requestBody = {
      model: monster_ai_model_name[model],
      messages: messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content || msg.text
      })),
      temperature: 0.7,
      top_p: 0.85,
      max_tokens: 150,
      stream: false
    };

    console.log('Sending request to Monster API:', requestBody);

    const response = await fetch(MONSTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MONSTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error(`HTTP error! status: ${response.status}`, errorDetails);
      throw new Error(`HTTP error! status: ${response.status} - ${errorDetails.message || 'Unprocessable Entity'}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.choices[0].message.content || "Sorry, I couldn't process that request.";
  } catch (error) {
    console.error('Monster API Error:', error);
    throw error;
  }
};