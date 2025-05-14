
import React from "react";
import { Table } from "@/components/ui/table";
import { TableBody } from "./TableBody";
import { TableHeader as TableHeaderComponent } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Workplace } from "@/types/workplace";
import { COLUMNS } from "@/constants/tableColumns";
import { useTableEdit } from "@/hooks/useTableEdit";
import { useTableColumns } from "@/hooks/useTableColumns";
import { FilterControls } from "./FilterControls";
import { cn } from "@/lib/utils";
import { useTableColumnProcessor } from "@/hooks/useTableColumnProcessor";
import { useTableFiltering } from "@/hooks/useTableFiltering";
import { useTableSorting } from "@/hooks/useTableSorting";
import { TableHeaderSection } from "./TableHeaderSection";

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
  
  // Filtering logic
  const { filters, setFilters, filterOptions, filteredData, resetFilters } = useTableFiltering(data);
  
  // Sorting logic
  const { sortConfig, requestSort, sortedData } = useTableSorting(filteredData);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

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
      
      <FilterControls
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        resetFilters={resetFilters}
        dataCount={sortedData.length}
        totalCount={data.length}
      />
      
      <div className="border rounded-md overflow-hidden shadow-sm">
        <ScrollArea className="w-full" showTopScrollbar={showHorizontalScrollbar} showBottomScrollbar={showHorizontalScrollbar}>
          <div className="min-w-max">
            <Table className="text-xs">
              <TableHeaderSection 
                processedColumns={processedColumns}
                sortConfig={sortConfig}
                requestSort={requestSort}
                showTisUploader={showTisUploader}
              />
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
            </Table>
          </div>
        </ScrollArea>
      </div>

      {sortedData.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={sortedData.length}
          startIndex={startIndex}
          onPageSizeChange={handlePageSizeChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
};
