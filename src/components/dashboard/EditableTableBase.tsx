
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TableControls } from "@/components/data-details/TableControls";
import { COLUMNS } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";
import { useColumnVisibility, TableType } from "@/hooks/useColumnVisibility";
import { useTableEdit } from "@/hooks/useTableEdit";
import { TableActions } from "@/components/table/TableActions";
import { EditableTableCell } from "@/components/table/EditableTableCell";
import { Workplace } from "@/types/workplace";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Pagination calculations
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sayfa başına:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TableControls 
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <ScrollArea className="rounded-md border w-full" showTopScrollbar={true} showBottomScrollbar={true}>
          <div className="min-w-full">
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
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6">
                      Görüntülenecek veri bulunamadı
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => (
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
        </ScrollArea>
      </div>

      {data.length > 0 && (
        <div className="flex justify-end items-center gap-2 py-2">
          <span className="text-sm text-muted-foreground">
            Toplam {data.length} kayıttan {startIndex + 1}-{Math.min(startIndex + pageSize, data.length)} arası gösteriliyor
          </span>
        </div>
      )}
    </div>
  );
};
