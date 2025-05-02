
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { EditableTableCell } from "./EditableTableCell";
import { TableActions } from "./TableActions";
import { Workplace } from "@/types/workplace";

interface ColumnDefinition {
  id: string;
  title: string;
  editable?: boolean;
  renderCell?: (item: Workplace) => React.ReactNode;
}

interface TableBodyProps {
  data: Workplace[];
  visibleColumnDefinitions: ColumnDefinition[];
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
  editableField
}) => {
  if (data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6">
          Görüntülenecek veri bulunamadı
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {data.map((item) => (
        <TableRow key={item.ID}>
          <TableCell>
            <TableActions
              item={item}
              isEditing={editingId === item.ID}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          </TableCell>
          
          {visibleColumnDefinitions.map(column => {
            // If the column has a custom render function, use it
            if (column.renderCell) {
              return (
                <TableCell key={column.id}>
                  {column.renderCell(item)}
                </TableCell>
              );
            }
            
            // Otherwise, handle as normal column
            const isEditable = column.editable && column.id === editableField;
            const isCurrentlyEditing = editingId === item.ID;
            
            return (
              <TableCell key={column.id}>
                {isEditable && isCurrentlyEditing ? (
                  <EditableTableCell
                    value={editData?.[column.id]}
                    onChange={(value) => handleChange(column.id, value)}
                    isEditing={isCurrentlyEditing}
                    isEditable={isEditable}
                    field={column.id}
                    rowId={item.ID}
                  />
                ) : (
                  item[column.id]
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
