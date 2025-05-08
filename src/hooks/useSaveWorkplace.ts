
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Workplace } from "@/types/workplace";
import { useActionHistory } from "./useActionHistory";

export const useSaveWorkplace = (refetch: () => void, logActions: boolean = true) => {
  const { toast } = useToast();
  const { logAction } = useActionHistory();
  
  const saveWorkplace = async (editData: Workplace, previousData: Workplace) => {
    if (!editData || !previousData) {
      console.error("No data to save");
      return false;
    }
    
    try {
      console.log("Preparing to save workplace data:", editData);
      
      // Get the current user's kurum_id
      const { data: { user }, error: userAuthError } = await supabase.auth.getUser();
      
      if (userAuthError) {
        console.error('Authentication error:', userAuthError);
        throw userAuthError;
      }
      
      if (!user) {
        console.error('No authenticated user found');
        toast({
          title: "Hata",
          description: "Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        });
        return false;
      }
      
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (userError) {
        console.error('Error getting user kurum_id:', userError);
        throw userError;
      }

      const kurum_id = userData?.kurum_id;
      
      if (!kurum_id) {
        console.error('No kurum_id found for user');
        toast({
          title: "Hata",
          description: "Kurum bilgisi bulunamadı. Lütfen yöneticinize başvurun.",
          variant: "destructive",
        });
        return false;
      }
      
      // Remove view-only fields that don't exist in the isyerleri table
      const { durum, sure_bilgisi, ...dataToSaveWithoutViewFields } = editData;
      
      // Add kurum_id to the data being saved
      const dataToSave = {
        ...dataToSaveWithoutViewFields,
        kurum_id
      };
      
      // Check if the ID exists in the database first
      const { data: existingData, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID')
        .eq('ID', editData.ID)
        .maybeSingle();
      
      console.log("Check if workplace exists:", existingData, checkError);
      
      let saveError;
      let saveData;
      
      if (existingData) {
        // Update existing record
        console.log("Updating existing workplace with ID:", editData.ID);
        const { data, error } = await supabase
          .from('isyerleri')
          .update(dataToSave)
          .eq('ID', editData.ID)
          .select();
        
        saveError = error;
        saveData = data;
        console.log("Update result:", error ? "Error" : "Success", data);
      } else {
        // Insert new record with the specified ID
        console.log("Inserting new workplace with ID:", editData.ID);
        const { data, error } = await supabase
          .from('isyerleri')
          .insert(dataToSave)
          .select();
        
        saveError = error;
        saveData = data;
        console.log("Insert result:", error ? "Error" : "Success", data);
      }
      
      if (saveError) {
        console.error("Error saving data:", saveError);
        throw saveError;
      }
      
      if (!saveData || saveData.length === 0) {
        console.warn("Save operation returned no data");
      }

      // Always log actions since we want to track all changes
      if (logActions) {
        // Find changed fields and their values
        const changedFields = Object.entries(dataToSave).filter(([key, value]) => {
          return previousData[key as keyof Workplace] !== value;
        });

        // Create detailed action message for each changed field
        for (const [field, newValue] of changedFields) {
          const oldValue = previousData[field as keyof Workplace];
          let displayValue = newValue;
          let oldDisplayValue = oldValue;

          // Format dates for display
          if (field.includes('TARİHİ') && newValue) {
            displayValue = new Date(newValue).toLocaleDateString('tr-TR');
            if (oldValue) {
              oldDisplayValue = new Date(oldValue).toLocaleDateString('tr-TR');
            }
          }

          const actionMessage = `"${editData["İŞYERİ ADI"] || 'Yeni işyeri'}" işyerinin "${field}" değeri "${oldDisplayValue || 'boş'}" -> "${displayValue}" olarak güncellenmiştir.`;
          await logAction(actionMessage);
        }
      }
      
      toast({
        title: "Başarılı",
        description: "İşyeri bilgileri güncellendi.",
        variant: "default",
      });
      
      // Important: Make sure to refetch data after a successful update
      // This ensures that the views reflect the changes
      console.log("Refetching data after successful save");
      refetch();
      
      return true;
    } catch (error) {
      console.error("Error updating workplace:", error);
      toast({
        title: "Hata",
        description: "İşyeri bilgileri güncellenirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { saveWorkplace };
};
