
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { TableActions } from "./TableActions";
import { EditableTableCell } from "./EditableTableCell";
import { Workplace } from "@/types/workplace";
import { ColumnType } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";
import { StatusBadge } from "@/components/data-details/StatusBadge";

interface TableBodyProps {
  data: Workplace[];
  visibleColumnDefinitions: ColumnType[];
  editingId: number | null;
  editData: Workplace | null;
  handleEdit: (item: Workplace) => void;
  handleCancel: () => void;
  handleChange: (field: string, value: string | number) => void;
  handleSave: () => void;
  editableField: string;
}

export const TableBody: React.FC<TableBodyProps> = ({
  data,
  visibleColumnDefinitions,
  editingId,
  editData,
  handleEdit,
  handleCancel,
  handleChange,
  handleSave,
  editableField,
}) => {
  if (data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6 text-xs">
          Görüntülenecek veri bulunamadı
        </TableCell>
      </TableRow>
    );
  }

  // Helper function to check if a value is a valid date
  const isValidDate = (dateValue: any): boolean => {
    if (dateValue === null || dateValue === undefined || dateValue === '') {
      return false;
    }
    
    // Try to create a date object
    const date = new Date(dateValue);
    return !isNaN(date.getTime());
  };

  // Function to format date values safely
  const formatCellValue = (value: any, columnId: string): any => {
    if (!value) return value;

    if (columnId === "updated_at" && value) {
      if (!isValidDate(value)) return value;
      
      try {
        return formatInTimeZone(new Date(value), 'Europe/Istanbul', 'dd.MM.yyyy HH:mm', { locale: tr });
      } catch (error) {
        console.error(`Error formatting date ${value}:`, error);
        return value;
      }
    } else if (columnId.includes("TARİHİ") && value) {
      if (!isValidDate(value)) return value;
      
      try {
        return formatInTimeZone(new Date(value), 'Europe/Istanbul', 'dd.MM.yyyy', { locale: tr });
      } catch (error) {
        console.error(`Error formatting date ${value}:`, error);
        return value;
      }
    } else {
      return value;
    }
  };

  return (
    <>
      {data.map((item) => (
        <TableRow key={item.ID} className="hover:bg-muted/50 text-xs">
          <TableCell className="sticky left-0 bg-background z-10 text-xs">
            <TableActions 
              isEditing={editingId === item.ID}
              onEdit={() => handleEdit(item)}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </TableCell>
          
          {visibleColumnDefinitions.map(column => {
            // Make all fields editable
            const isEditable = true;
            
            return (
              <TableCell 
                key={`${item.ID}-${column.id}`}
                className={cn(
                  "text-xs",
                  column.id === editableField && "bg-yellow-50"
                )}
              >
                {column.id === "durum" ? (
                  <StatusBadge status={item[column.id]?.toString() || ''} />
                ) : (
                  <EditableTableCell 
                    value={editData && editingId === item.ID 
                      ? editData[column.id] 
                      : formatCellValue(item[column.id], column.id)}
                    isEditing={editingId === item.ID}
                    isEditable={isEditable}
                    field={column.id}
                    rowId={item.ID}
                    onChange={handleChange}
                  />
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
