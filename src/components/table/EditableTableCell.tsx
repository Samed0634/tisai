
import React from "react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "../data-details/StatusBadge";
import { cn } from "@/lib/utils";

interface EditableTableCellProps {
  value: any;
  isEditing: boolean;
  isEditable: boolean;
  field: string;
  rowId: number;
  onChange: (field: string, value: string | number) => void;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = ({
  value,
  isEditing,
  isEditable,
  field,
  rowId,
  onChange,
}) => {
  if (isEditing && isEditable) {
    if (field.includes('TARİHİ')) {
      // Ensure the date is properly formatted for the date input
      const formattedDate = value ? 
        (typeof value === 'string' ? 
          value.split('T')[0] : 
          new Date(value).toISOString().split('T')[0]
        ) : '';
      
      return (
        <Input
          type="date"
          value={formattedDate}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-40 text-xs"
        />
      );
    } else {
      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-40 text-xs"
        />
      );
    }
  } else {
    // Special formatting for different field types
    if (field === 'durum') {
      return <StatusBadge status={value || ''} />;
    } else if (field === 'sure_bilgisi') {
      // Special formatting for remaining time (süre bilgisi)
      const isExpired = value && value.toLowerCase().includes('geçti');
      return (
        <span className={cn(
          "px-2 py-1 rounded text-xs font-medium",
          isExpired ? "text-red-600 bg-red-50" : "text-blue-600 bg-blue-50"
        )}>
          {value || ''}
        </span>
      );
    } else if (field.includes('TARİHİ') && value) {
      // Format date values properly
      try {
        return new Date(value).toLocaleDateString('tr-TR');
      } catch (e) {
        console.error("Error formatting date:", e, value);
        return value;
      }
    } else {
      return value;
    }
  }
};
