
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { TableActions } from "./TableActions";
import { EditableTableCell } from "./EditableTableCell";
import { Workplace } from "@/types/workplace";
import { ColumnType } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";
import { TisUploadButton } from "@/components/dashboard/TisUploadButton";

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
  showTisUploader?: boolean;
  refetch: () => void;
  logActions?: boolean;
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
  showTisUploader = false,
  refetch,
  logActions = true,
}) => {
  return (
    <>
      {data.map((item) => (
        <TableRow key={item.ID} className="hover:bg-muted/50 text-xs">
          {showTisUploader && (
            <TableCell className="sticky left-0 bg-background z-10 text-xs">
              <TisUploadButton 
                workplaceId={item.ID}
                workplaceName={item["İŞYERİ ADI"] || ""}
                onSuccess={refetch}
              />
            </TableCell>
          )}
          
          <TableCell className={`${showTisUploader ? '' : 'sticky left-0 bg-background z-10'} text-xs`}>
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
                <EditableTableCell 
                  value={editData && editingId === item.ID ? editData[column.id] : item[column.id]}
                  isEditing={editingId === item.ID}
                  isEditable={isEditable}
                  field={column.id}
                  rowId={item.ID}
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
