
import { formatSupabaseValue } from "./formatSupabaseValue";

// Extract and format value from form element
export const extractFormElementValue = (target: HTMLElement): any => {
  let value;
  
  if (target instanceof HTMLInputElement) {
    if (target.type === 'checkbox') {
      value = target.checked;
    } else if (target.type === 'date') {
      value = target.value ? target.value : null; // YYYY-MM-DD formatında
    } else {
      value = target.value;
    }
  } else if (target instanceof HTMLSelectElement) {
    value = target.value;
  } else if (target instanceof HTMLTextAreaElement) {
    value = target.value;
  } else {
    console.warn("Desteklenmeyen element tipi:", target.tagName);
    return null;
  }

  return value;
};

// Format value for Supabase based on column type
export const formatValueForColumn = (value: any, columnType: string) => {
  return formatSupabaseValue(value, columnType);
};
