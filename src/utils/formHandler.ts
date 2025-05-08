
import { getColumnMappingByDataAttribute, getColumnMappingById } from "./columnMappers";
import { extractFormElementValue, formatValueForColumn } from "./valueFormatter";
import { updateSupabaseRecord } from "./recordUpdater";

// Form değişikliklerini işleyecek fonksiyon
export const handleFormElementChange = async (
  event: Event,
  workplaceId: number
) => {
  try {
    if (!workplaceId) {
      console.error("İşyeri ID'si belirtilmedi.");
      return false;
    }

    const target = event.target as HTMLElement;
    let columnInfo;

    // Önce data-db-column attribute'una bakıyoruz
    if (target.hasAttribute('data-db-column')) {
      const dataDbColumn = target.getAttribute('data-db-column');
      if (dataDbColumn) {
        columnInfo = getColumnMappingByDataAttribute(dataDbColumn);
      }
    } 
    
    // data-db-column yoksa, id'ye göre eşleşmeyi kontrol ediyoruz
    if (!columnInfo && target.id) {
      columnInfo = getColumnMappingById(target.id);
    }

    if (!columnInfo) {
      console.warn(`Bu alan için sütun eşleşmesi bulunamadı: ${target.id || 'Bilinmeyen alan'}`);
      return false;
    }

    // Form elemanından değeri al
    const value = extractFormElementValue(target);
    if (value === null) return false;
    
    // Supabase değer formatını ayarla
    const formattedValue = formatValueForColumn(value, columnInfo.type);
    
    // Supabase'e kayıt güncelleme
    await updateSupabaseRecord(workplaceId, columnInfo.column, formattedValue);
    return true;
  } catch (error) {
    console.error("Form değişikliği işlenirken hata:", error);
    return false;
  }
};
