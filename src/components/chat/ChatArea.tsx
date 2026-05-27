/**
 * Componente orquestador del área principal de chat.
 * Gestiona el scroll automático y delega el renderizado
 * a sub-componentes especializados.
 */

import React, { useRef, useEffect } from "react";
import { Menu, School } from "lucide-react";
import { Message } from "../../types";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isSending: boolean;
  onOpenSidebar: () => void;
}

export default function ChatArea({
  messages,
  onSendMessage,
  isSending,
  onOpenSidebar,
}: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  // Desplaza automáticamente al último mensaje al recibir uno nuevo
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#212121] relative transition-colors duration-200">

      {/* Barra superior móvil (oculta en desktop) */}
      <div className="h-14 flex items-center px-4 shrink-0 lg:hidden relative z-10 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-md cursor-pointer"
          aria-label="Abrir menú lateral"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
        <img
          src={`${import.meta.env.BASE_URL}logo-uasd.png`}
          alt="Logo UASD"
          className="w-6 h-6 object-contain ml-2"
        />
        <span className="font-sans font-medium text-slate-800 dark:text-slate-200 ml-2 text-sm">
          UASD Chatbot
        </span>
      </div>

      {/* Área de mensajes con scroll */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar relative">
        {isEmpty ? (
          <WelcomeScreen onSend={onSendMessage} isSending={isSending} />
        ) : (
          <div className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6 pb-40">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Indicador de escritura animado */}
            {isSending && (
              <div className="mb-8 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#1A3485] text-white flex items-center justify-center p-1.5 shrink-0">
                    <School className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    UASD Chatbot
                  </span>
                </div>
                <div className="pl-0 md:pl-9 mt-2 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0ms]" />
                  <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input pegado al fondo (solo visible durante la conversación) */}
      {!isEmpty && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-[#212121] via-white dark:via-[#212121] to-transparent px-4 pb-6 pt-10">
          <div className="w-full max-w-3xl mx-auto">
            <ChatInput
              onSend={onSendMessage}
              isSending={isSending}
              compact
            />
          </div>
          <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2 font-sans">
            El asistente puede generar información inexacta. Verifique siempre las fuentes del Estatuto.
          </p>
        </div>
      )}
    </div>
  );
}
