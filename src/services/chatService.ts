/**
 * chatService.ts
 *
 * Estrategia dual:
 *  • localhost / 127.0.0.1  → llama al backend Express (/api/chat)
 *    El servidor carga el PDF oficial del Estatuto en Gemini Files API
 *    y lo adjunta en cada petición, garantizando respuestas del documento real.
 *
 *  • Cualquier otro host (GitHub Pages, etc.) → llama a Gemini directamente
 *    desde el navegador usando VITE_GEMINI_API_KEY.
 */

import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants/systemPrompt";
import { extractArticles } from "../utils/articleExtractor";

/** Respuesta normalizada que devuelve el servicio. */
export interface ChatResponse {
  text: string;
  articlesCited?: string[];
}

type GeminiPart = { text: string } | { fileData: { fileUri: string; mimeType: string } };
interface GeminiContent { role: string; parts: GeminiPart[] }

// Detectar si hay un servidor local corriendo
const IS_LOCAL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

/* ── 1. Llamada al backend Express (/api/chat) ──────────────────────────── */

async function callBackend(message: string, history: Message[]): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `Error HTTP ${res.status}` }));
    throw new Error(err.error ?? err.details ?? `Error HTTP ${res.status}`);
  }

  const data = await res.json();
  return { text: data.text, articlesCited: data.articlesCited };
}

/* ── 2. Llamada directa a Gemini (GitHub Pages / despliegue estático) ───── */

let _ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!_ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error(
        "VITE_GEMINI_API_KEY no está configurada. Agrega la variable al archivo .env.local o al secreto de GitHub Actions."
      );
    }
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
}

async function callGeminiDirect(message: string, history: Message[]): Promise<ChatResponse> {
  const ai = getAI();

  const contents: GeminiContent[] = [];

  if (Array.isArray(history)) {
    history.slice(-10).forEach((msg) => {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });
  }

  contents.push({ role: "user", parts: [{ text: message.trim() }] });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    },
  });

  const replyText = response.text ?? "No obtuve una respuesta clara del modelo de IA.";
  return { text: replyText, articlesCited: extractArticles(replyText) };
}

/* ── API pública ────────────────────────────────────────────────────────── */

/**
 * Envía el mensaje al canal correcto según el entorno:
 * - Localhost → backend Express (Gemini + PDF del Estatuto)
 * - Otros hosts → Gemini directo desde el navegador
 */
export async function sendMessage(
  message: string,
  history: Message[]
): Promise<ChatResponse> {
  if (IS_LOCAL) {
    return callBackend(message, history);
  }
  return callGeminiDirect(message, history);
}
