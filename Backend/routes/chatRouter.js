import express from "express";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const router = express.Router();
console.log("Gemini key:", process.env.GEMINI_API_KEY);

const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY missing");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// System prompt injected as first message (SAFE METHOD)
const SYSTEM_PROMPT =
  "You are an assistant for an e-commerce store. " +
  "Be concise and helpful. " +
  "If you don't know an answer, say so. " +
  "Do not promise unavailable features.";

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings,
    });

    // Normalize history - filter out empty entries
    const normalizedHistory = Array.isArray(history)
      ? history.slice(-10)
          .filter((h) => h?.content || h?.message)
          .map((h) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: String(h.content || h.message || "") }],
          }))
      : [];

    // Build contents with system prompt only on first turn
    const contents = [];
    
    // If no history, prepend system prompt
    if (normalizedHistory.length === 0) {
      contents.push({
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      });
      contents.push({
        role: "model",
        parts: [{ text: "Understood. I'm ready to help with your e-commerce questions." }],
      });
    }
    
    contents.push(...normalizedHistory);
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const result = await model.generateContent({ contents });

    const reply = result.response.text();

    return res.json({
      reply,
      model: modelName,
    });
  } catch (error) {
    console.error("❌ Gemini error FULL:", error);

    return res.status(500).json({
      error: "Failed to generate response",
      details: error.message,
    });
  }
});

export default router;
