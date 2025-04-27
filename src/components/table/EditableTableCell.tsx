
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableTableCellProps {
  value: any;
  isEditing: boolean;
  editValue?: any;
  column?: string;
  field?: string;
  rowId?: number;
  isEditable?: boolean;
  onEdit?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onSave?: () => void;
  className?: string;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = ({
  value,
  isEditing,
  editValue,
  column,
  field,
  rowId,
  isEditable = true,
  onEdit,
  onChange,
  onCancel,
  onSave,
  className
}) => {
  // Use column or field, prioritizing field if both are provided
  const fieldName = field || column || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSave) {
      onSave();
    } else if (e.key === 'Escape' && onCancel) {
      onCancel();
    }
  };

  if (isEditing && isEditable) {
    // For date fields, use date input type
    if (fieldName.includes('TARİHİ') || fieldName.includes('TARIHI')) {
      const dateValue = editValue || (value ? new Date(value).toISOString().split('T')[0] : '');
      
      return (
        <Input 
          type="date"
          value={dateValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={onCancel}
          autoFocus
          className="w-40"
        />
      );
    }
    
    // For other fields
    return (
      <Input 
        type="text"
        value={editValue !== undefined ? editValue : value || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onCancel}
        autoFocus
        className="w-full max-w-xs"
      />
    );
  }

  return (
    <span 
      className={cn("cursor-pointer hover:bg-muted/50", className)}
      onClick={onEdit}
    >
      {fieldName.includes('TARİHİ') && value
        ? new Date(value).toLocaleDateString('tr-TR')
        : value}
    </span>
  );
};
