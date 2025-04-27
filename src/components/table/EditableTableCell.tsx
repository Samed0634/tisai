
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableTableCellProps {
  value: any;
  isEditing: boolean;
  isEditable: boolean;
  field: string;
  onChange?: (field: string, value: string) => void;
  className?: string;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = ({
  value,
  isEditing,
  isEditable,
  field,
  onChange,
  className
}) => {
  if (isEditing && isEditable) {
    // For date fields, use date input type
    if (field.includes('TARİHİ')) {
      const dateValue = value ? new Date(value).toISOString().split('T')[0] : '';
      
      return (
        <Input 
          type="date"
          value={dateValue}
          onChange={(e) => onChange?.(field, e.target.value)}
          className="w-40"
        />
      );
    }
    
    // For other fields
    return (
      <Input 
        type="text"
        value={value || ''}
        onChange={(e) => onChange?.(field, e.target.value)}
        className="w-40"
      />
    );
  }

  return (
    <span>
      {field.includes('TARİHİ') && value
        ? new Date(value).toLocaleDateString('tr-TR')
        : value}
    </span>
  );
};
