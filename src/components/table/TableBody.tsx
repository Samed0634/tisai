
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
  if (data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={visibleColumnDefinitions.length + (showTisUploader ? 2 : 1)} className="text-center py-8">
          <div className="flex flex-col items-center justify-center text-gray-500 py-6">
            <svg className="w-12 h-12 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-base font-medium">Görüntülenecek veri bulunamadı</p>
            <p className="text-sm mt-1">Filtre kriterlerinizi değiştirerek tekrar deneyin.</p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {data.map((item) => (
        <TableRow 
          key={item.ID} 
          className={cn(
            "transition-all duration-150 hover:shadow-sm",
            editingId === item.ID ? "bg-blue-50/30 hover:bg-blue-50/30" : ""
          )}
        >
          {showTisUploader && (
            <TableCell className="action-column sticky left-0 bg-inherit z-10">
              <TisUploadButton 
                workplaceId={item.ID}
                workplaceName={item["İŞYERİ ADI"] || ""}
                onSuccess={refetch}
              />
            </TableCell>
          )}
          
          <TableCell className={cn(
            "action-column z-10",
            !showTisUploader && "sticky left-0 bg-inherit"
          )}>
            <TableActions 
              isEditing={editingId === item.ID}
              onEdit={() => handleEdit(item)}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </TableCell>
          
          {visibleColumnDefinitions.map(column => (
            <TableCell 
              key={`${item.ID}-${column.id}`}
              className={cn(
                "text-xs",
                column.id === editableField && "bg-yellow-50/50"
              )}
            >
              <EditableTableCell 
                value={editData && editingId === item.ID ? editData[column.id] : item[column.id]}
                isEditing={editingId === item.ID}
                isEditable={true}
                field={column.id}
                rowId={item.ID}
                onChange={handleChange}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
