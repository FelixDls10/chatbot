/**
 * Punto de entrada del servidor Express.
 * Configura el middleware, monta las rutas de la API
 * y arranca el servidor con Vite (desarrollo) o estáticos (producción).
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import chatRouter from "./routes/chat";
import { preloadStatutePdf } from "./utils/pdfLoader";

// Cargar variables de entorno (.env.local tiene prioridad sobre .env)
dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parseo de cuerpos JSON en todas las peticiones
app.use(express.json());

// ── Rutas de la API ──────────────────────────────────────────────────────
app.use("/api/chat", chatRouter);

// ── Servidor de archivos (Vite en dev, estáticos en prod) ────────────────
async function startServer(): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.log("🚀 Iniciando en modo desarrollo con Vite...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("🚀 Iniciando en modo producción...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback: todas las rutas devuelven index.html
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Servidor UASD Chatbot corriendo en http://localhost:${PORT}`);

    // Pre-cargar el PDF del Estatuto en Gemini Files API (no bloqueante)
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      preloadStatutePdf(ai);
    } else {
      console.warn("⚠️  GEMINI_API_KEY no configurada — se omite la pre-carga del PDF.");
    }
  });
}

startServer().catch((err: unknown) => {
  console.error("❌ Error al iniciar el servidor:", err);
  process.exit(1);
});
