
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormToSupabase } from "@/utils/formToSupabase"; // Yeni eklenen import
import { format, parseISO } from "date-fns";
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

  // Eğer field değerine göre Supabase sütun adını bulmak için
  const getDataDbColumn = (fieldName: string) => {
    // Burada field değerini data-db-column formatına dönüştürebiliriz
    // Örnek: "ÇAĞRI TARİHİ" -> "cagri_tarihi"
    return fieldName.toLowerCase()
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/\s+/g, '_');
  };

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

  if (isEditing && isEditable) {
    // For date fields, use date input type
    if (field.includes('TARİHİ')) {
      const dateValue = value ? new Date(value).toISOString().split('T')[0] : '';
      
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
        ? formatInTimeZone(new Date(value), 'Europe/Istanbul', 'dd.MM.yyyy', { locale: tr })
        : value}
    </span>
  );
};
