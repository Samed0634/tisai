
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onSave}
          className={cn(
            "h-8 w-8 border-green-200 bg-green-50 hover:bg-green-100",
            "text-green-700 hover:text-green-800 hover:border-green-300"
          )}
          title="Kaydet"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onCancel}
          className={cn(
            "h-8 w-8 border-red-200 bg-red-50 hover:bg-red-100",
            "text-red-700 hover:text-red-800 hover:border-red-300"
          )}
          title="İptal"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onEdit}
      className="h-8 text-primary border-primary/30 bg-primary/5 hover:bg-primary/10"
    >
      <Edit className="h-3.5 w-3.5 mr-1" />
      Düzenle
    </Button>
  );
};
