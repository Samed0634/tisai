
import { useEditState } from "./useEditState";
import { useSaveWorkplace } from "./useSaveWorkplace";

export const useTableEdit = (refetch: () => void, logActions: boolean = true) => {
  const { 
    editingId, 
    editData, 
    previousData,
    handleEdit, 
    handleCancel, 
    handleChange,
    resetEditState
  } = useEditState();
  
  const { saveWorkplace } = useSaveWorkplace(refetch, logActions);

  const handleSave = async () => {
    if (!editData || !previousData) {
      console.error("No data to save");
      return;
    }
    
    const success = await saveWorkplace(editData, previousData);
    if (success) {
      resetEditState();
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
