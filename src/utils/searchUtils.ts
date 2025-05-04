
/**
 * Normalizes text for case-insensitive and diacritic-insensitive searching
 * - Converts to lowercase
 * - Removes diacritics (accents)
 * - Handles Turkish characters (ı, ğ, ü, ş, ö, ç)
 */
export const normalizeText = (text: string | null | undefined): string => {
  if (!text) return "";
  
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
};

/**
 * Performs a case-insensitive and diacritic-insensitive search
 * @param searchText The text to search for
 * @param targetText The text to search in
 * @returns true if searchText is found in targetText, false otherwise
 */
export const fuzzySearch = (searchText: string, targetText: string | null | undefined): boolean => {
  if (!targetText) return false;
  if (!searchText) return true;
  
  const normalizedSearch = normalizeText(searchText);
  const normalizedTarget = normalizeText(targetText);
  
  return normalizedTarget.includes(normalizedSearch);
};
