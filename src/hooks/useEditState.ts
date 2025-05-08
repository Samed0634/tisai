
import { useState } from "react";
import { Workplace } from "@/types/workplace";

export const useEditState = () => {
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
      
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const resetEditState = () => {
    setEditingId(null);
    setEditData(null);
    setPreviousData(null);
  };

  return {
    editingId,
    editData,
    previousData,
    handleEdit,
    handleCancel,
    handleChange,
    resetEditState
  };
};
