/**
 * Componente raíz de la aplicación UASD Chatbot.
 * Orquesta el tema, la visibilidad del sidebar y el estado del chat
 * delegando cada responsabilidad a hooks y componentes especializados.
 */

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/chat/ChatArea";
import ThemeToggle from "./components/ThemeToggle";
import { useChat } from "./hooks/useChat";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Hook personalizado que maneja mensajes, envíos y estado de carga
  const { messages, isSending, sendChatMessage, clearMessages } = useChat();

  // Aplica o remueve la clase "dark" en el elemento <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleNewChat = () => {
    clearMessages();
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleSelectQuestion = (question: string) => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    sendChatMessage(question);
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-[#212121] text-slate-800 dark:text-slate-200 font-sans overflow-hidden transition-colors duration-200">

      {/* Barra lateral con preguntas sugeridas */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectQuestion={handleSelectQuestion}
      />

      {/* Área principal del chat */}
      <main className="flex-1 flex flex-col relative h-full w-full min-w-0">

        {/* Botón de tema — esquina superior derecha */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
          />
        </div>

        <ChatArea
          messages={messages}
          onSendMessage={sendChatMessage}
          isSending={isSending}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      </main>
    </div>
  );
}
