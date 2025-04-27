
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { COLUMNS } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";
import { useColumnVisibility, TableType } from "@/hooks/useColumnVisibility";
import { useTableEdit } from "@/hooks/useTableEdit";
import { TableActions } from "@/components/table/TableActions";
import { EditableTableCell } from "@/components/table/EditableTableCell";
import { TableHeader as TableHeaderComponent } from "@/components/table/TableHeader";
import { TablePagination } from "@/components/table/TablePagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Workplace } from "@/types/workplace";

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType: TableType;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
}

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  tableType,
  editableField,
  title,
  defaultColumns,
  titleClassName
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
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <TableHeaderComponent 
        title={title}
        titleClassName={titleClassName}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
      
      <div className="border rounded-md overflow-hidden">
        <ScrollArea className="w-full" showTopScrollbar={true} showBottomScrollbar={true}>
          <div className="min-w-max">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#ea384c] sticky left-0 bg-background z-10 text-xs">İşlem</TableHead>
                  {visibleColumnDefinitions.map(column => (
                    <TableHead key={column.id} className="text-xs">{column.title}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6 text-xs">
                      Görüntülenecek veri bulunamadı
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => (
                    <TableRow key={item.ID} className="hover:bg-muted/50 text-xs">
                      <TableCell className="sticky left-0 bg-background z-10 text-xs">
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
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={data.length}
          startIndex={startIndex}
          onPageSizeChange={handlePageSizeChange}
          onPreviousPage={() => setCurrentPage(curr => curr > 1 ? curr - 1 : curr)}
          onNextPage={() => setCurrentPage(curr => curr < totalPages ? curr + 1 : curr)}
        />
      )}
    </div>
  );
};
