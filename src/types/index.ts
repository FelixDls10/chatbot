/**
 * Tipos globales de la aplicación UASD Chatbot.
 */

/** Representa un mensaje individual dentro de la conversación. */
export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  /** Artículos del Estatuto citados en la respuesta del bot. */
  articlesCited?: string[];
  isTyping?: boolean;
}

/** Pregunta sugerida que aparece en la barra lateral. */
export interface SuggestedQuestion {
  id: string;
  question: string;
  category: string;
  shortSnippet?: string;
}

/** Capítulo del Estatuto con sus artículos. */
export interface StatuteChapter {
  id: string;
  title: string;
  articles: StatuteArticle[];
}

/** Artículo individual del Estatuto Orgánico. */
export interface StatuteArticle {
  number: string;
  title?: string;
  content: string;
  context?: string;
}
