/**
 * Servicio de comunicación con la API de Gemini directamente desde el navegador.
 * Reemplaza la llamada al backend Express para permitir el despliegue en GitHub Pages.
 */

import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants/systemPrompt";
import { extractArticles } from "../utils/articleExtractor";
import { SUGGESTED_QUESTIONS, GROUNDED_ANSWERS } from "../data/statuteKnowledge";

/** Respuesta normalizada que devuelve el servicio. */
export interface ChatResponse {
  text: string;
  articlesCited?: string[];
}

interface LocalMatch {
  question: string;
  answer: string;
  articles: string[];
}

/* ── Cliente Gemini (singleton) ─────────────────────────────────────────── */

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (apiKey) {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
}

/**
 * Envía el mensaje del usuario junto con el historial de conversación
 * a la API de Gemini directamente desde el navegador.
 *
 * @param message  - Texto escrito por el usuario.
 * @param history  - Historial previo de la sesión (máx. últimos 10 msgs).
 * @returns        Respuesta del chatbot con texto y artículos citados.
 */
export async function sendMessage(
  message: string,
  history: Message[]
): Promise<ChatResponse> {
  const trimmedMsg = message.trim();

  // 1. Buscar coincidencia en la base de conocimiento local (preguntas preelaboradas)
  let localMatch: LocalMatch | null = null;

  for (const item of SUGGESTED_QUESTIONS) {
    if (
      trimmedMsg.toLowerCase() === item.question.toLowerCase() ||
      trimmedMsg.toLowerCase().includes(item.question.toLowerCase())
    ) {
      const grounded = GROUNDED_ANSWERS[item.id];
      if (grounded) {
        localMatch = {
          question: item.question,
          answer: grounded.answer,
          articles: grounded.articles,
        };
        break;
      }
    }
  }

  // 2. Construir contexto de fundamentación cuando hay coincidencia local
  const groundingContext = localMatch
    ? `[CONTEXTO OFICIAL] El usuario seleccionó la pregunta: "${localMatch.question}". ` +
      `Respuesta estatutaria verificada: "${localMatch.answer}". ` +
      `Cita estos artículos: ${localMatch.articles.join(", ")}.`
    : "";

  // 3. Convertir historial al formato de Gemini (máximo 10 mensajes previos)
  const contents: { role: string; parts: { text: string }[] }[] = [];

  if (Array.isArray(history)) {
    history.slice(-10).forEach((msg) => {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });
  }

  const currentText = groundingContext
    ? `${groundingContext}\n\nPregunta del usuario: ${trimmedMsg}`
    : trimmedMsg;

  contents.push({ role: "user", parts: [{ text: currentText }] });

  // 4. Llamar a la API de Gemini (con fallback local ante error)
  const aiClient = getAI();

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
        },
      });

      const replyText = response.text ?? "No obtuve una respuesta clara del modelo de IA.";
      const citedArticles = extractArticles(replyText) ?? localMatch?.articles;

      return { text: replyText, articlesCited: citedArticles };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Error desconocido";
      console.error("Error al llamar a Gemini:", errMsg);

      // Fallback a conocimiento local si Gemini falla
      if (localMatch) {
        return {
          text: `${localMatch.answer}\n\n*(Nota: Respuesta servida localmente por fallo temporal del servicio de IA.)*`,
          articlesCited: localMatch.articles,
        };
      }

      throw new Error(`Error al procesar con Inteligencia Artificial: ${errMsg}`);
    }
  }

  // 5. Fallback completo (sin clave API configurada)
  if (localMatch) {
    return {
      text: `${localMatch.answer}\n\n*(Respuesta local verificada. Configure la API de Gemini para soporte de lenguaje natural asistido.)*`,
      articlesCited: localMatch.articles,
    };
  }

  return {
    text: "El servicio de Inteligencia Artificial no está inicializado. Seleccione una de las preguntas sugeridas de la barra lateral para obtener una respuesta local verificada.",
    articlesCited: undefined,
  };
}
