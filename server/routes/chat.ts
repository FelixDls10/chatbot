/**
 * Ruta POST /api/chat
 * Recibe el mensaje del usuario y el historial de conversación,
 * consulta la base de conocimiento local y/o la API de Gemini,
 * y devuelve una respuesta fundamentada en el Estatuto Orgánico.
 */

import { Router, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { SUGGESTED_QUESTIONS, GROUNDED_ANSWERS } from "../../src/data/statuteKnowledge";
import { SYSTEM_INSTRUCTION } from "../constants/systemPrompt";
import { extractArticles } from "../utils/articleExtractor";
import { getStatutePdfUri } from "../utils/pdfLoader";

const router = Router();

/* ── Cliente Gemini con inicialización diferida (lazy singleton) ────────── */
// Se inicializa en la primera petición para que dotenv ya haya cargado
// las variables de entorno antes de leer GEMINI_API_KEY.

let ai: GoogleGenAI | null = null;
let aiReady = false;

function getAI(): GoogleGenAI | null {
  if (!aiReady) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { "User-Agent": "uasd-chatbot" } },
      });
    } else {
      console.warn("⚠️  GEMINI_API_KEY no configurada. El chatbot operará en modo local.");
    }
    aiReady = true;
  }
  return ai;
}

/* ── Tipos internos ────────────────────────────────────────────────────── */

interface HistoryMessage {
  sender: "user" | "bot";
  text: string;
}

interface LocalMatch {
  question: string;
  answer: string;
  articles: string[];
}

/** Parte de un mensaje Gemini: texto plano o referencia a archivo */
type GeminiPart =
  | { text: string }
  | { fileData: { fileUri: string; mimeType: string } };

interface GeminiContent {
  role: string;
  parts: GeminiPart[];
}

/* ── Handler principal ─────────────────────────────────────────────────── */

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body as {
      message: unknown;
      history: HistoryMessage[];
    };

    // Validación de entrada
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Mensaje no válido o ausente." });
      return;
    }

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
    const contents: GeminiContent[] = [];

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
        // Obtener URI del PDF oficial (sube si no está cacheado)
        const pdfUri = await getStatutePdfUri(aiClient);

        // Insertar el PDF como primer contexto de la conversación
        if (pdfUri) {
          contents.unshift(
            {
              role: "model",
              parts: [{ text: "Entendido. Tengo acceso al Estatuto Orgánico oficial de la UASD y lo usaré como única fuente para responder." }],
            },
            {
              role: "user",
              parts: [
                { fileData: { fileUri: pdfUri, mimeType: "application/pdf" } },
                { text: "Este es el Estatuto Orgánico oficial de la UASD. Úsalo como fuente principal para responder todas las consultas." },
              ],
            }
          );
        } else {
          console.warn("⚠️  PDF no disponible; Gemini responderá sin documento adjunto.");
        }

        const response = await aiClient.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.2, // Baja temperatura para minimizar alucinaciones
          },
        });

        const replyText = response.text ?? "No obtuve una respuesta clara del modelo de IA.";
        const citedArticles = extractArticles(replyText) ?? localMatch?.articles;

        res.json({ text: replyText, articlesCited: citedArticles });
        return;
      } catch (geminiError: unknown) {
        const errMsg = geminiError instanceof Error ? geminiError.message : "Error desconocido";
        console.error("❌ Error al llamar a Gemini:", errMsg);

        // Fallback a conocimiento local si Gemini falla
        if (localMatch) {
          res.json({
            text: `${localMatch.answer}\n\n*(Nota: Respuesta servida localmente por fallo temporal del servicio de IA.)*`,
            articlesCited: localMatch.articles,
          });
          return;
        }

        res.status(500).json({
          error: "Error interno al procesar con Inteligencia Artificial.",
          details: errMsg,
        });
        return;
      }
    }

    // 5. Fallback completo (sin clave API configurada)
    if (localMatch) {
      res.json({
        text: `${localMatch.answer}\n\n*(Respuesta local verificada. Configure la API de Gemini para soporte de lenguaje natural asistido.)*`,
        articlesCited: localMatch.articles,
      });
      return;
    }

    res.json({
      text: "Lo siento, el servicio de Inteligencia Artificial no está inicializado (falta la clave API).\n\nPuede seleccionar una de las preguntas sugeridas de la barra lateral para obtener una respuesta local verificada.",
      articlesCited: ["Artículo 1, 4, 10"],
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Error desconocido";
    console.error("❌ Error en /api/chat:", errMsg);
    res.status(500).json({ error: "Ocurrió un error en el servidor." });
  }
});

export default router;
