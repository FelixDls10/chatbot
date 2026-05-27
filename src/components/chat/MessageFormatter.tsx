/**
 * Formatea el texto markdown-ligero de las respuestas del bot:
 * negritas (**texto**), listas con guión, listas numeradas y citas de artículos.
 */

import React from "react";
import { BookOpen } from "lucide-react";

/* ── FormatLine ─────────────────────────────────────────────────────────── */

interface FormatLineProps {
  text: string;
}

/** Renderiza una línea de texto convirtiendo **negrita** en <strong>. */
function FormatLine({ text }: FormatLineProps) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

/* ── MessageFormatter ───────────────────────────────────────────────────── */

interface MessageFormatterProps {
  text: string;
  articles?: string[];
}

/**
 * Componente principal que convierte el texto plano del bot en HTML
 * estructurado (párrafos, listas, citas) para una lectura clara.
 */
export default function MessageFormatter({ text, articles }: MessageFormatterProps) {
  const lines = text.split("\n");

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-200 font-sans leading-relaxed text-[15px] md:text-base">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Lista con guión o asterisco
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <li key={idx} className="list-disc ml-5 pl-1 my-1">
              <FormatLine text={trimmed.substring(2)} />
            </li>
          );
        }

        // Lista numerada
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex gap-2 ml-2 my-1">
              <span className="font-semibold text-slate-900 dark:text-white shrink-0">
                {numberedMatch[1]}.
              </span>
              <span className="flex-1">
                <FormatLine text={numberedMatch[2]} />
              </span>
            </div>
          );
        }

        // Párrafo normal
        return (
          <p key={idx}>
            <FormatLine text={trimmed} />
          </p>
        );
      })}

      {/* Fuentes / artículos citados */}
      {articles && articles.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 items-center text-xs text-slate-500 dark:text-slate-400">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Fuentes citadas:</span>
          {articles.map((art, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md font-medium text-slate-700 dark:text-slate-300"
            >
              {art}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
