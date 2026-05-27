/**
 * pdfLoader.ts
 * Descarga el PDF oficial del Estatuto Orgánico de la UASD y lo sube a la
 * Gemini Files API para que el modelo pueda leerlo directamente.
 *
 * Los archivos en la Files API expiran a las 48 h; este módulo cachea la URI
 * y la renueva automáticamente antes de que venza.
 */

import { GoogleGenAI } from "@google/genai";

// URL pública del documento oficial
const PDF_URL =
  "https://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf";

interface CachedFile {
  uri: string;
  expiresAt: Date;
}

let cachedFile: CachedFile | null = null;

// Evita subidas concurrentes (p. ej. varias peticiones simultáneas al iniciar)
let activeUpload: Promise<string | null> | null = null;

/* ── Descarga + subida ──────────────────────────────────────────────────── */

async function uploadToGemini(ai: GoogleGenAI): Promise<string | null> {
  try {
    console.log("📄 Descargando Estatuto Orgánico UASD desde la fuente oficial...");
    const response = await fetch(PDF_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();
    const sizeKB = Math.round(pdfBuffer.byteLength / 1024);
    console.log(`📦 PDF descargado (${sizeKB} KB). Subiendo a Gemini Files API...`);

    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

    const uploaded = await ai.files.upload({
      file: pdfBlob,
      config: { displayName: "Estatuto Orgánico UASD 2012" },
    });

    if (!uploaded.uri) {
      throw new Error("Gemini no devolvió URI para el archivo subido.");
    }

    // Expira en 48 h; cacheamos con 2 h de margen → 46 h
    cachedFile = {
      uri: uploaded.uri,
      expiresAt: new Date(Date.now() + 46 * 60 * 60 * 1000),
    };

    console.log("✅ Estatuto Orgánico cargado en Gemini Files API correctamente.");
    return uploaded.uri;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ No se pudo cargar el PDF del Estatuto en Gemini:", msg);
    return null;
  }
}

/* ── API pública ────────────────────────────────────────────────────────── */

/**
 * Devuelve la URI del PDF en Gemini Files API.
 * Sube el archivo si no hay caché vigente; evita subidas concurrentes.
 */
export async function getStatutePdfUri(ai: GoogleGenAI): Promise<string | null> {
  // Caché válida con al menos 1 h de vida restante
  if (cachedFile && cachedFile.expiresAt > new Date(Date.now() + 60 * 60 * 1000)) {
    return cachedFile.uri;
  }

  // Reutilizar subida en curso si ya hay una
  if (activeUpload) return activeUpload;

  activeUpload = uploadToGemini(ai).finally(() => {
    activeUpload = null;
  });

  return activeUpload;
}

/**
 * Pre-carga el PDF al arrancar el servidor (no bloqueante).
 * Mejora el tiempo de respuesta de la primera consulta.
 */
export function preloadStatutePdf(ai: GoogleGenAI): void {
  getStatutePdfUri(ai).catch((err) =>
    console.warn("⚠️  Pre-carga del PDF falló (se reintentará en la primera consulta):", err)
  );
}
