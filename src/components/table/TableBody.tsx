
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { TableActions } from "./TableActions";
import { EditableTableCell } from "./EditableTableCell";
import { Workplace } from "@/types/workplace";
import { ColumnType } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";

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
            // Check if this field is the editable one
            const isEditable = column.id === editableField;
            
            return (
              <TableCell 
                key={`${item.ID}-${column.id}`}
                className={cn(
                  "text-xs",
                  isEditable && "bg-yellow-50"
                )}
              >
                <EditableTableCell 
                  value={editData && editingId === item.ID ? editData[column.id] : item[column.id]}
                  isEditing={editingId === item.ID}
                  isEditable={isEditable}
                  field={column.id}
                  rowId={item.ID} // İşyeri ID'sini geçir
                  onChange={handleChange}
                />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
