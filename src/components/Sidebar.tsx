/**
 * Barra lateral de navegación.
 * Muestra el logo institucional, permite iniciar una nueva conversación,
 * buscar entre las preguntas sugeridas y seleccionarlas para el chat.
 */

import React, { useState } from "react";
import { Plus, MessageSquare, Search, X } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "../data/statuteKnowledge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectQuestion: (q: string) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  onSelectQuestion,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = SUGGESTED_QUESTIONS.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.shortSnippet && q.shortSnippet.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Overlay semitransparente en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Contenedor principal de la barra lateral */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#F9F9F9] dark:bg-[#171717] border-r border-[#E5E5E5] dark:border-[#2F2F2F] flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Barra lateral de navegación"
      >

        {/* Encabezado con logo e identidad */}
        <div className="px-4 py-4 flex items-center gap-3 border-b border-[#E5E5E5] dark:border-[#2F2F2F] shrink-0">
          <img
            src="/logo-uasd.png"
            alt="Logo UASD"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold text-[#1A3485] dark:text-[#4A64D5] uppercase tracking-wide">
              UASD
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Estatuto Orgánico
            </span>
          </div>
          {/* Botón cerrar (solo móvil) */}
          <button
            onClick={onClose}
            className="ml-auto p-1 lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded cursor-pointer"
            aria-label="Cerrar menú lateral"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Botón nueva conversación */}
        <div className="p-3 shrink-0">
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-[#212121] border border-[#E5E5E5] dark:border-[#2F2F2F] hover:bg-slate-50 dark:hover:bg-[#2A2A2A] px-3 py-2 rounded-lg w-full transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Nueva conversación</span>
          </button>
        </div>

        {/* Buscador de preguntas */}
        <div className="px-3 pb-3 shrink-0">
          <div className="relative">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-[#212121] border border-[#E5E5E5] dark:border-[#2F2F2F] rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-600"
              aria-label="Buscar preguntas sugeridas"
            />
          </div>
        </div>

        {/* Lista de preguntas sugeridas */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 mb-2 font-semibold">
            Preguntas sugeridas
          </p>
          <nav aria-label="Preguntas sugeridas del Estatuto">
            <ul className="space-y-0.5">
              {filteredQuestions.map((q) => (
                <li key={q.id}>
                  <button
                    onClick={() => onSelectQuestion(q.question)}
                    className="w-full text-left flex items-start gap-2.5 p-2 rounded-md hover:bg-[#EAEAEA] dark:hover:bg-[#2F2F2F] text-slate-700 dark:text-slate-300 transition-colors group cursor-pointer"
                    title={q.question}
                  >
                    <MessageSquare
                      className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-[#1A3485] dark:group-hover:text-[#4A64D5] mt-0.5 transition-colors"
                      aria-hidden="true"
                    />
                    <span className="text-sm truncate w-full">{q.question}</span>
                  </button>
                </li>
              ))}
              {filteredQuestions.length === 0 && (
                <li>
                  <p className="text-xs text-slate-500 px-2 py-4">
                    No se encontraron resultados.
                  </p>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Perfil del usuario */}
        <div className="p-3 border-t border-[#E5E5E5] dark:border-[#2F2F2F] shrink-0">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg select-none">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center font-bold text-xs uppercase shrink-0">
              E
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                Estudiante 1
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                100555555
              </span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
