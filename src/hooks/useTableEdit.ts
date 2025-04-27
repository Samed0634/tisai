
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Workplace } from "@/types/workplace";
import { useActionHistory } from "./useActionHistory";

export const useTableEdit = (refetch: () => void) => {
  const { toast } = useToast();
  const { logAction } = useActionHistory();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Workplace | null>(null);

  const handleEdit = (item: Workplace) => {
    setEditingId(item.ID);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleChange = (field: string, value: string | number) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const handleSave = async () => {
    if (!editData) return;
    
    try {
      const { error } = await supabase
        .from('isyerleri')
        .update(editData)
        .eq('ID', editData.ID);
      
      if (error) throw error;
      
      // Log the action
      await logAction(`${editingId} ID'li işyerinin ${editData["İŞYERİ ADI"]} bilgileri güncellenmiştir.`);
      
      toast({
        title: "Başarılı",
        description: "İşyeri bilgileri güncellendi.",
        variant: "default",
      });
      
      setEditingId(null);
      setEditData(null);
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
