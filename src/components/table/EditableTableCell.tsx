
import React from "react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/data-details/StatusBadge";
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
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  // Format date values for better display
  const formatValue = (value: any, field: string) => {
    if (value === undefined || value === null) {
      return "";
    }

    // Handle date fields
    if (field.includes("TARİHİ") && value) {
      try {
        return new Date(value).toLocaleDateString('tr-TR');
      } catch (e) {
        return value;
      }
    }

    // Handle status field with StatusBadge component
    if (field === "durum" || field.includes("DURUM")) {
      return <StatusBadge status={value.toString()} />;
    }

    // Handle special time remaining field
    if (field === "sure_bilgisi" && value) {
      const isOverdue = value.toLowerCase().includes('geçti');
      return (
        <span className={cn(
          "px-2 py-1 rounded text-xs font-medium",
          isOverdue ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
        )}>
          {value}
        </span>
      );
    }

    return value;
  };

  if (isEditing && isEditable) {
    // Date field specific input
    if (field.includes("TARİHİ")) {
      const dateValue = value ? new Date(value).toISOString().split('T')[0] : '';
      
      return (
        <Input
          type="date"
          value={dateValue}
          onChange={handleChange}
          className="w-40 text-xs h-8 focus:ring-2 focus:ring-primary focus:border-primary"
          autoFocus
        />
      );
    }

    // Regular text input for other fields
    return (
      <Input
        type="text"
        value={value || ""}
        onChange={handleChange}
        className="text-xs h-8 focus:ring-2 focus:ring-primary focus:border-primary"
        autoFocus
      />
    );
  }

  // Display formatted value when not editing
  return <div className="line-clamp-2">{formatValue(value, field)}</div>;
};
