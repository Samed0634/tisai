
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TableControls } from "@/components/data-details/TableControls";
import { COLUMNS } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";
import { useColumnVisibility, TableType } from "@/hooks/useColumnVisibility";
import { useTableEdit } from "@/hooks/useTableEdit";
import { TableActions } from "@/components/table/TableActions";
import { EditableTableCell } from "@/components/table/EditableTableCell";
import { Workplace } from "@/types/workplace";

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType: TableType;
  editableField: string;
  title: string;
  defaultColumns?: string[];
}

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  tableType,
  editableField,
  title,
  defaultColumns
}) => {
  const { visibleColumns, toggleColumn } = useColumnVisibility(tableType, defaultColumns);
  const {
    editingId,
    editData,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave
  } = useTableEdit(refetch);

  if (isLoading) {
    return (
      <div className="rounded-md border p-8">
        <LoadingSpinner />
      </div>
    );
  }

  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <TableControls 
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
        />
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#ea384c]">İşlem</TableHead>
              {visibleColumnDefinitions.map(column => (
                <TableHead key={column.id}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6">
                  Görüntülenecek veri bulunamadı
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.ID} className="hover:bg-muted/50">
                  <TableCell>
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
                        column.id === editableField && "bg-yellow-50"
                      )}
                    >
                      <EditableTableCell 
                        value={editData && editingId === item.ID ? editData[column.id] : item[column.id]}
                        isEditing={editingId === item.ID}
                        isEditable={column.id === editableField}
                        field={column.id}
                        onChange={handleChange}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
