/**
 * Pantalla de bienvenida que se muestra cuando no hay mensajes.
 * Incluye el logo de la UASD, el campo de entrada principal
 * y chips de preguntas rápidas para iniciar la conversación.
 */

import React from "react";
import { BookOpen, User, FileText } from "lucide-react";
import ChatInput from "./ChatInput";

interface WelcomeScreenProps {
  onSend: (text: string) => void;
  isSending: boolean;
}

/** Chips rápidos de acceso directo visibles en la pantalla de bienvenida. */
const QUICK_CHIPS = [
  {
    icon: <BookOpen className="w-4 h-4" aria-hidden="true" />,
    label: "Misión de la UASD",
    q: "¿Cuál es la misión de la UASD?",
  },
  {
    icon: <User className="w-4 h-4" aria-hidden="true" />,
    label: "Derechos estudiantiles",
    q: "¿Cuáles son los derechos de los estudiantes?",
  },
  {
    icon: <FileText className="w-4 h-4" aria-hidden="true" />,
    label: "Autonomía universitaria",
    q: "¿Qué establece el Estatuto sobre la autonomía universitaria?",
  },
];

export default function WelcomeScreen({ onSend, isSending }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4 pb-32 pt-10">

      {/* Logo institucional */}
      <img
        src={`${import.meta.env.BASE_URL}logo-uasd.png`}
        alt="Logo de la Universidad Autónoma de Santo Domingo"
        className="w-24 h-24 object-contain mb-5 drop-shadow-sm"
      />

      <h1 className="text-3xl md:text-4xl font-sans font-semibold text-slate-800 dark:text-white mb-2 text-center">
        ¿En qué puedo ayudarte hoy?
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8 max-w-md">
        Consulta el <span className="font-medium text-[#1A3485] dark:text-[#4A64D5]">Estatuto Orgánico</span> de la
        Universidad Autónoma de Santo Domingo.
      </p>

      {/* Campo de entrada principal */}
      <div className="w-full max-w-2xl">
        <ChatInput
          onSend={onSend}
          isSending={isSending}
          placeholder="Escribe tu consulta sobre el Estatuto..."
        />
      </div>

      {/* Chips de preguntas rápidas */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {QUICK_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => onSend(chip.q)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#2F2F2F] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#3F3F3F] rounded-full text-sm text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <span className="text-[#1A3485] dark:text-[#4A64D5]">{chip.icon}</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
