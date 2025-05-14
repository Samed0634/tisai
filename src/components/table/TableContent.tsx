
import React from "react";
import {
  Table,
  TableHeader,
  TableBody as TableBodyUI,
} from "@/components/ui/table";
import { TableBody } from "./TableBody";
import { TableHeader as TableHeaderComponent } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Workplace } from "@/types/workplace";
import { COLUMNS } from "@/constants/tableColumns";
import { TableHeaderRow } from "./TableHeaderRow";
import { useTableColumnProcessor } from "@/hooks/useTableColumnProcessor";
import { useTableEdit } from "@/hooks/useTableEdit";
import { useTableColumns } from "@/hooks/useTableColumns";

interface TableContentProps {
  data: Workplace[];
  isLoading: boolean;
  refetch: () => void;
  tableType: string;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
  pageSize: number;
  currentPage: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  showHorizontalScrollbar?: boolean;
  showTisUploader?: boolean;
  logActions?: boolean;
}

export const TableContent: React.FC<TableContentProps> = ({
  data,
  isLoading,
  refetch,
  tableType,
  editableField,
  title,
  defaultColumns,
  titleClassName,
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
  showHorizontalScrollbar = true,
  showTisUploader = false,
  logActions = true,
}) => {
  const { visibleColumns, toggleColumn } = useTableColumns({
    tableType,
    defaultColumns: defaultColumns || []
  });

  const { editingId, editData, handleEdit, handleCancel, handleChange, handleSave } = useTableEdit(refetch, logActions);

  // Get visible column definitions
  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );

  // Process columns for special cases
  const processedColumns = useTableColumnProcessor(visibleColumnDefinitions, visibleColumns);
  
  // Pagination calculations
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  // Handle navigation to previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle navigation to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
        <ScrollArea className="w-full" showTopScrollbar={showHorizontalScrollbar} showBottomScrollbar={showHorizontalScrollbar}>
          <div className="min-w-max">
            <Table className="text-xs">
              <TableHeader>
                <TableHeaderRow 
                  reorderedColumnDefinitions={processedColumns}
                  showTisUploader={showTisUploader}
                />
              </TableHeader>
              <TableBodyUI>
                <TableBody 
                  data={paginatedData}
                  visibleColumnDefinitions={processedColumns}
                  editingId={editingId}
                  editData={editData}
                  handleEdit={handleEdit}
                  handleCancel={handleCancel}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  editableField={editableField}
                  showTisUploader={showTisUploader}
                  refetch={refetch} 
                  logActions={logActions}
                />
              </TableBodyUI>
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
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};
