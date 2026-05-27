/**
 * Extrae referencias únicas a artículos del Estatuto (ej. "Artículo 26")
 * del texto generado por la IA, para construir la lista de fuentes citadas.
 */

export function extractArticles(text: string): string[] | undefined {
  const matches = text.match(/Artículo\s+\d+/gi);
  if (!matches) return undefined;

  // Elimina duplicados conservando el orden de aparición
  return Array.from(new Set(matches));
}
