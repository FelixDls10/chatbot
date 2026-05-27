/**
 * Campo de texto + botón de envío reutilizable.
 * Se usa tanto en la pantalla de bienvenida (normal) como en el chat activo (compacto).
 */

import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  isSending: boolean;
  /** Texto placeholder del campo de texto. */
  placeholder?: string;
  /** Modo compacto para la barra inferior del chat activo. */
  compact?: boolean;
}

export default function ChatInput({
  onSend,
  isSending,
  placeholder = "Escribe un mensaje...",
  compact = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim() || isSending) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enviar con Enter (sin Shift); Shift+Enter agrega salto de línea
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#2F2F2F] rounded-2xl p-2 transition-all">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isSending}
        rows={compact ? 1 : 2}
        className={`w-full bg-transparent resize-none outline-none max-h-48 p-2 text-slate-800 dark:text-slate-200 ${
          compact ? "min-h-[44px] text-[15px]" : "min-h-[60px] text-base"
        }`}
        aria-label="Campo de consulta"
      />
      <div className={`flex justify-end items-center px-1 pb-1 ${compact ? "mt-1" : "mt-2"}`}>
        <button
          onClick={handleSubmit}
          disabled={isSending || !value.trim()}
          className="p-2 bg-[#1A3485] hover:bg-[#12214C] text-white rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
          aria-label="Enviar mensaje"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
