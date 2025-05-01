
import React from "react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "../data-details/StatusBadge";

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
      return (
        <Input
          type="date"
          value={value ? new Date(value).toISOString().split('T')[0] : ''}
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
    } else if (field.includes('TARİHİ') && value) {
      return new Date(value).toLocaleDateString('tr-TR');
    } else {
      return value;
    }
  }
};
