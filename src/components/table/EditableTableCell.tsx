
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormToSupabase } from "@/utils/formToSupabase";
import { getDataDbColumn } from "@/utils/columnMappings";
import { format, parseISO, isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";

interface EditableTableCellProps {
  value: any;
  isEditing: boolean;
  isEditable: boolean;
  field: string;
  rowId: number; // İşyeri ID'si
  onChange?: (field: string, value: string) => void;
  className?: string;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = ({
  value,
  isEditing,
  isEditable,
  field,
  rowId,
  onChange,
  className
}) => {
  const { updateSupabaseRecord } = useFormToSupabase();

  // Değer değiştiğinde Supabase'e otomatik kaydetme
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Önce local onChange'i çağır (eğer varsa)
    if (onChange) {
      onChange(field, e.target.value);
    }

    // Doğrudan Supabase'e kaydet
    if (rowId) {
      const newValue = field.includes('TARİHİ') && e.target.value ? e.target.value : e.target.value;
      updateSupabaseRecord(rowId, field, newValue).catch(console.error);
    }
  };

  // Helper function to check if a value is a valid date
  const isValidDate = (dateValue: any): boolean => {
    if (dateValue === null || dateValue === undefined || dateValue === '') {
      return false;
    }

    // Try to create a date object
    const date = new Date(dateValue);
    return isValid(date) && !isNaN(date.getTime());
  };

  // Format date safely
  const formatDateSafely = (dateValue: any, formatString: string): string => {
    if (!isValidDate(dateValue)) {
      return '';
    }

    try {
      return formatInTimeZone(new Date(dateValue), 'Europe/Istanbul', formatString, { locale: tr });
    } catch (error) {
      console.error(`Error formatting date ${dateValue}:`, error);
      return '';
    }
  };

  if (isEditing && isEditable) {
    // For date fields, use date input type
    if (field.includes('TARİHİ')) {
      const dateValue = value && isValidDate(value) ? 
        new Date(value).toISOString().split('T')[0] : '';
      
      return (
        <Input 
          type="date"
          value={dateValue}
          onChange={handleChange}
          data-db-column={getDataDbColumn(field)}
          className="w-40"
        />
      );
    }
    
    // For other fields
    return (
      <Input 
        type="text"
        value={value || ''}
        onChange={handleChange}
        data-db-column={getDataDbColumn(field)}
        className="w-40"
      />
    );
  }

  return (
    <span className={cn(className)}>
      {field.includes('TARİHİ') && value
        ? formatDateSafely(value, 'dd.MM.yyyy')
        : field === "updated_at" && value
          ? formatDateSafely(value, 'dd.MM.yyyy HH:mm')
          : value}
    </span>
  );
};
