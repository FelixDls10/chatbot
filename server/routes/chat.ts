/**
 * Ruta POST /api/chat
 * Recibe el mensaje del usuario y el historial de conversación,
 * adjunta el PDF oficial del Estatuto Orgánico de la UASD y
 * delega la respuesta completamente a Gemini.
 */

import { Router, Request, Response } from "express";
import { SYSTEM_INSTRUCTION } from "../constants/systemPrompt";
import { extractArticles } from "../utils/articleExtractor";
import { getStatutePdfUri } from "../utils/pdfLoader";
import { getGeminiClient } from "../utils/geminiClient";

const router = Router();

/* ── Tipos internos ────────────────────────────────────────────────────── */

interface HistoryMessage {
  sender: "user" | "bot";
  text: string;
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

    // Verificar que Gemini esté disponible
    const aiClient = getGeminiClient();
    if (!aiClient) {
      res.status(503).json({
        text: "El servicio de Inteligencia Artificial no está disponible. Verifique que la GEMINI_API_KEY esté configurada y reinicie el servidor.",
      });
      return;
    }

    // Construir historial en formato Gemini (máximo 10 mensajes previos)
    const contents: GeminiContent[] = [];

    if (Array.isArray(history)) {
      history.slice(-10).forEach((msg) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      });
    }

    // Agregar el mensaje actual del usuario
    contents.push({ role: "user", parts: [{ text: trimmedMsg }] });

    // Obtener la URI del PDF oficial y añadirlo al inicio del contexto
    const pdfUri = await getStatutePdfUri(aiClient);

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
            { text: "Este es el Estatuto Orgánico oficial de la UASD. Úsalo como fuente principal y exclusiva para responder todas las consultas." },
          ],
        }
      );
    } else {
      console.warn("⚠️  PDF no disponible en esta petición. Gemini responderá sin documento adjunto.");
    }

    // Llamar a Gemini
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    const replyText = response.text ?? "No obtuve una respuesta clara del modelo de IA.";
    const citedArticles = extractArticles(replyText);

    res.json({ text: replyText, articlesCited: citedArticles });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Error desconocido";
    console.error("❌ Error en /api/chat:", errMsg);
    res.status(500).json({
      error: "Ocurrió un error al procesar la consulta.",
      details: errMsg,
    });
  }
});

export default router;
