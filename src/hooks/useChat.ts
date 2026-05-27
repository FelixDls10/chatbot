/**
 * Hook personalizado que encapsula toda la lógica de estado del chatbot:
 * lista de mensajes, estado de carga y envío de nuevos mensajes.
 */

import { useState } from "react";
import { Message } from "../types";
import { sendMessage } from "../services/chatService";

interface UseChatReturn {
  messages: Message[];
  isSending: boolean;
  sendChatMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  /**
   * Envía un mensaje del usuario al servidor y agrega la respuesta del bot
   * al historial de conversación.
   */
  const sendChatMessage = async (text: string): Promise<void> => {
    if (!text.trim() || isSending) return;

    const timestamp = new Date().toLocaleTimeString("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const data = await sendMessage(text, messages);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString("es-DO", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        articlesCited: data.articlesCited,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("[useChat] Error al enviar mensaje:", err);

      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Lo siento, ha ocurrido un error al procesar la respuesta. Por favor, intenta de nuevo.",
        timestamp: new Date().toLocaleTimeString("es-DO", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  /** Reinicia la conversación por completo. */
  const clearMessages = () => setMessages([]);

  return { messages, isSending, sendChatMessage, clearMessages };
}
