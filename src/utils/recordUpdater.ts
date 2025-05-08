
import { supabase } from "@/integrations/supabase/client";

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
