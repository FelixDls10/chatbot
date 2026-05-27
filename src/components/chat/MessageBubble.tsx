/**
 * Burbuja de mensaje individual dentro de la conversación.
 * Diferencia visualmente los mensajes del usuario y del bot.
 */

import React from "react";
import { School } from "lucide-react";
import { Message } from "../../types";
import MessageFormatter from "./MessageFormatter";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`mb-8 flex flex-col ${isUser ? "items-end" : "items-start"}`}>

      {/* Encabezado: avatar + nombre + hora */}
      <div className={`flex items-center gap-2 mb-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {isUser ? (
          <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
            E
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#1A3485] text-white flex items-center justify-center p-1.5 shrink-0">
            <School className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {isUser ? "Tú" : "UASD Chatbot"}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          {message.timestamp}
        </span>
      </div>

      {/* Contenido del mensaje */}
      {isUser ? (
        <div className="bg-slate-100 dark:bg-[#2F2F2F] px-5 py-3.5 rounded-2xl rounded-tr-md max-w-[85%] text-[15px] text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
          {message.text}
        </div>
      ) : (
        <div className="w-full text-left pl-0 md:pl-9 pr-0">
          <MessageFormatter text={message.text} articles={message.articlesCited} />
        </div>
      )}
    </div>
  );
}
