
import React from "react";
import { Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  if (isEditing) {
    return (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onSave}
          className="hover:bg-green-100 hover:text-green-600"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onCancel}
          className="hover:bg-red-100 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onEdit}
      className="hover:bg-primary hover:text-white"
    >
      <Edit className="h-4 w-4" />
    </Button>
  );
};
