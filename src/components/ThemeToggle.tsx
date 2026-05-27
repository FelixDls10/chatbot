/**
 * Botón reutilizable para alternar entre el tema claro y oscuro.
 */

import React from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2F2F2F] text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
      title={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
