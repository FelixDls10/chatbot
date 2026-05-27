/**
 * chatService.ts
 *
 * Estrategia dual:
 *  • localhost / 127.0.0.1  → llama al backend Express (/api/chat)
 *    El servidor sube el PDF a Gemini Files API y lo adjunta server-side.
 *
 *  • Cualquier otro host (GitHub Pages, etc.) → llama a Gemini directamente
 *    desde el navegador. Descarga el PDF, lo convierte a base64 y lo adjunta
 *    como inlineData en cada petición. El PDF se cachea en sessionStorage
 *    para no descargarlo en cada mensaje.
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

type GeminiPart =
  | { text: string }
  | { inlineData: { data: string; mimeType: string } }
  | { fileData: { fileUri: string; mimeType: string } };

interface GeminiContent {
  role: string;
  parts: GeminiPart[];
}

// URL pública del Estatuto Orgánico
const PDF_URL =
  "https://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf";

const PDF_CACHE_KEY = "uasd_estatuto_pdf_b64";

// Detectar si hay un servidor local corriendo
const IS_LOCAL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

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

/* ── 2. Carga del PDF en el navegador (con caché en sessionStorage) ─────── */

/**
 * Convierte un ArrayBuffer a base64 en bloques para evitar
 * desbordamiento de pila en PDFs grandes.
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function saveCache(value: string): void {
  try {
    sessionStorage.setItem(PDF_CACHE_KEY, value);
  } catch {
    // sessionStorage puede estar lleno; no es crítico
  }
}

/**
 * Descarga el PDF del Estatuto y lo devuelve como base64.
 * Usa sessionStorage como caché para no repetir la descarga en cada mensaje.
 * Devuelve null si hay error de CORS u otro problema de red.
 */
async function loadPdfBase64(): Promise<string | null> {
  // Verificar caché
  try {
    const cached = sessionStorage.getItem(PDF_CACHE_KEY);
    if (cached) return cached;
  } catch {
    // sessionStorage no disponible
  }

  try {
    console.log("📄 Descargando PDF del Estatuto Orgánico...");
    const response = await fetch(PDF_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(buffer);

    saveCache(base64);
    console.log("✅ PDF del Estatuto cargado y cacheado en sesión.");
    return base64;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      "⚠️ No se pudo cargar el PDF del Estatuto (posiblemente CORS o red). " +
      "Gemini responderá sin el documento adjunto. Detalle:", msg
    );
    return null;
  }
}

/* ── 3. Llamada directa a Gemini (GitHub Pages / despliegue estático) ───── */

let _ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!_ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error(
        "VITE_GEMINI_API_KEY no está configurada. " +
        "Agrega la variable al archivo .env.local o al secreto de GitHub Actions."
      );
    }
    _ai = new GoogleGenAI({ apiKey });
  }
  return _ai;
}

async function callGeminiDirect(
  message: string,
  history: Message[]
): Promise<ChatResponse> {
  const ai = getAI();

  // Construir historial
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

  // Intentar adjuntar el PDF como inlineData
  const pdfBase64 = await loadPdfBase64();

  if (pdfBase64) {
    contents.unshift(
      {
        role: "model",
        parts: [
          {
            text: "Entendido. Tengo acceso al Estatuto Orgánico oficial de la UASD y lo usaré como única fuente para responder.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          { inlineData: { data: pdfBase64, mimeType: "application/pdf" } },
          {
            text: "Este es el Estatuto Orgánico oficial de la UASD. Úsalo como fuente principal y exclusiva para responder todas las consultas.",
          },
        ],
      }
    );
  } else {
    console.warn("⚠️ Respondiendo sin PDF adjunto (CORS u otro error de red).");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    },
  });

  const replyText =
    response.text ?? "No obtuve una respuesta clara del modelo de IA.";
  return { text: replyText, articlesCited: extractArticles(replyText) };
}

/* ── API pública ────────────────────────────────────────────────────────── */

/**
 * Envía el mensaje al canal correcto según el entorno:
 * - Localhost  → backend Express (Gemini + PDF via Files API)
 * - Otros hosts → Gemini directo con PDF como inlineData (base64)
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
