
import { supabase } from "@/integrations/supabase/client";
import { formatSupabaseValue } from "./formatSupabaseValue";
import { dataAttributeColumnMappings, columnMappings } from "./columnMappings";

// Supabase'e kayıt güncelleme fonksiyonu
export const updateSupabaseRecord = async (
  workplaceId: number,
  column: string,
  value: any
) => {
  try {
    console.log(`ID ${workplaceId} için '${column}' sütunu güncelleniyor:`, value);
    
    const updateData = { [column]: value };
    
    const { data, error } = await supabase
      .from('isyerleri')
      .update(updateData)
      .eq('ID', workplaceId)
      .select();
      
    if (error) {
      throw error;
    }

    console.log(`${column} başarıyla güncellendi:`, data);
    return data;
  } catch (error) {
    console.error(`${column} güncellenirken hata:`, error);
    throw error;
  }
};

// data-db-column attribute'ları için eşleşme
export const getColumnMappingByDataAttribute = (dataDbColumn: string) => {
  return dataAttributeColumnMappings[dataDbColumn];
};

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
      columnInfo = columnMappings.get(target.id);
    }

    if (!columnInfo) {
      console.warn(`Bu alan için sütun eşleşmesi bulunamadı: ${target.id || 'Bilinmeyen alan'}`);
      return false;
    }

    let value;
    
    // Input tipine göre değer alımı
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
      return false;
    }

    // Supabase değer formatını ayarla
    const formattedValue = formatSupabaseValue(value, columnInfo.type);
    
    // Supabase'e kayıt güncelleme
    await updateSupabaseRecord(workplaceId, columnInfo.column, formattedValue);
    return true;
  } catch (error) {
    console.error("Form değişikliği işlenirken hata:", error);
    return false;
  }
};
