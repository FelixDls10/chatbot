/**
 * geminiClient.ts
 * Singleton del cliente de Google Gemini.
 * Se inicializa una sola vez en el arranque del servidor (después de que
 * dotenv ya haya cargado las variables de entorno).
 */

import { GoogleGenAI } from "@google/genai";

let _client: GoogleGenAI | null = null;

/** Inicializa el cliente con la API key. Llamar una vez al arrancar el servidor. */
export function initGeminiClient(apiKey: string): GoogleGenAI {
  _client = new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "uasd-chatbot" } },
  });
  console.log("✅ Cliente Gemini inicializado correctamente.");
  return _client;
}

/** Devuelve el cliente ya inicializado, o null si no se configuró la API key. */
export function getGeminiClient(): GoogleGenAI | null {
  return _client;
}
