
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Workplace } from "@/types/workplace";
import { useActionHistory } from "./useActionHistory";

export const useTableEdit = (refetch: () => void, logActions: boolean = true) => {
  const { toast } = useToast();
  const { logAction } = useActionHistory();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Workplace | null>(null);
  const [previousData, setPreviousData] = useState<Workplace | null>(null);

  const handleEdit = (item: Workplace) => {
    setEditingId(item.ID);
    setEditData({ ...item });
    setPreviousData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
    setPreviousData(null);
  };

  const handleChange = (field: string, value: string | number) => {
    if (editData) {
      console.log(`Updating field "${field}" with value:`, value);
      
      // Convert date strings to proper format for saving to database
      if (field.includes('TARİHİ') && typeof value === 'string') {
        setEditData({
          ...editData,
          [field]: value
        });
      } else {
        setEditData({
          ...editData,
          [field]: value
        });
      }
    }
  };

  const handleSave = async () => {
    if (!editData || !previousData) return;
    
    try {
      console.log("Saving workplace data:", editData);
      
      // Get the user's kurum_id to include it in the update
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }
      
      if (!sessionData.session) {
        console.error("No active session found");
        throw new Error("No active session");
      }
      
      // Get the user's kurum_id
      const { data: userData, error: userError } = await supabase
        .from('kullanici_kurumlar')
        .select('kurum_id')
        .eq('user_id', sessionData.session.user.id)
        .single();
      
      if (userError) {
        console.error("Error fetching user institution:", userError);
        throw userError;
      }
      
      if (!userData?.kurum_id) {
        console.error("No kurum_id found for user");
        throw new Error("No institution found for user");
      }
      
      // Add the kurum_id to the data
      const workplaceWithKurumId = {
        ...editData,
        kurum_id: userData.kurum_id
      };
      
      // Check if the ID exists in the database first
      const { data: existingData, error: checkError } = await supabase
        .from('isyerleri')
        .select('ID')
        .eq('ID', editData.ID)
        .maybeSingle();
      
      console.log("Check if workplace exists:", existingData, checkError);
      
      let saveError;
      
      if (existingData) {
        // Update existing record
        console.log("Updating existing workplace with ID:", editData.ID);
        const { error } = await supabase
          .from('isyerleri')
          .update(workplaceWithKurumId)
          .eq('ID', editData.ID);
        
        saveError = error;
        console.log("Update result:", error ? "Error" : "Success");
      } else {
        // Insert new record with the specified ID
        console.log("Inserting new workplace with ID:", editData.ID);
        const { error } = await supabase
          .from('isyerleri')
          .insert(workplaceWithKurumId);
        
        saveError = error;
        console.log("Insert result:", error ? "Error" : "Success");
      }
      
      if (saveError) {
        console.error("Error saving data:", saveError);
        throw saveError;
      }

      // Always log actions since we want to track all changes
      if (logActions) {
        // Find changed fields and their values
        const changedFields = Object.entries(editData).filter(([key, value]) => {
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
      
      setEditingId(null);
      setEditData(null);
      setPreviousData(null);
      refetch();
    } catch (error) {
      console.error("Error updating workplace:", error);
      toast({
        title: "Hata",
        description: "İşyeri bilgileri güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return {
    editingId,
    editData,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave
  };
};
