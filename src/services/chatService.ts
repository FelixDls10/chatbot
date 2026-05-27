/**
 * Servicio de comunicación con el endpoint /api/chat del servidor.
 * Centraliza toda la lógica de red para facilitar pruebas y mantenimiento.
 */

import { Message } from "../types";

/** Respuesta normalizada que devuelve el servidor. */
export interface ChatResponse {
  text: string;
  articlesCited?: string[];
}

/**
 * Envía el mensaje del usuario junto con el historial de conversación
 * al servidor Express, el cual consulta la API de Gemini.
 *
 * @param message  - Texto escrito por el usuario.
 * @param history  - Historial previo de la sesión (máx. últimos 10 msgs).
 * @returns        Respuesta del chatbot con texto y artículos citados.
 */
export async function sendMessage(
  message: string,
  history: Message[]
): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<ChatResponse>;
}
