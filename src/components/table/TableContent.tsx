
import React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody as TableBodyUI,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TableBody } from "./TableBody";
import { TableHeader as TableHeaderComponent } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Workplace } from "@/types/workplace";
import { COLUMNS } from "@/constants/tableColumns";
import { TableLoadingState } from "./TableLoadingState";
import { EmptyTableBody } from "./EmptyTableBody";
import { ensureRequiredColumns, reorderImportantColumns } from "@/utils/tableColumnUtils";

interface TableContentProps {
  data: Workplace[];
  isLoading: boolean;
  visibleColumns: string[];
  toggleColumn: (columnId: string) => void;
  editingId: number | null;
  editData: Workplace | null;
  handleEdit: (item: Workplace) => void;
  handleCancel: () => void;
  handleChange: (field: string, value: string | number) => void;
  handleSave: () => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  title: string;
  titleClassName?: string;
  editableField: string;
  showTisUploader?: boolean;
  logActions?: boolean;
}

export const TableContent: React.FC<TableContentProps> = ({
  data,
  isLoading,
  visibleColumns,
  toggleColumn,
  editingId,
  editData,
  handleEdit,
  handleCancel,
  handleChange,
  handleSave,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  title,
  titleClassName,
  editableField,
  showTisUploader = false,
  logActions = true,
}) => {
  if (isLoading) {
    return <TableLoadingState />;
  }

  // Get visible column definitions and ensure required columns are present
  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );
  
  const updatedColumnDefinitions = ensureRequiredColumns(visibleColumnDefinitions, visibleColumns);
  const reorderedColumnDefinitions = reorderImportantColumns(updatedColumnDefinitions);

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
        <ScrollArea className="w-full" showTopScrollbar={true} showBottomScrollbar={true}>
          <div className="min-w-max">
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  {showTisUploader && (
                    <TableHead className="text-[#ea384c] sticky left-0 bg-background z-10 text-xs">TİS Yükleme</TableHead>
                  )}
                  <TableHead className={`text-[#ea384c] ${showTisUploader ? '' : 'sticky left-0'} bg-background z-10 text-xs`}>İşlem</TableHead>
                  {reorderedColumnDefinitions.map(column => (
                    <TableHead key={column.id} className="text-xs">{column.title}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              
              <TableBodyUI>
                {data.length === 0 ? (
                  <EmptyTableBody colSpan={reorderedColumnDefinitions.length + (showTisUploader ? 2 : 1)} />
                ) : (
                  <TableBody 
                    data={paginatedData}
                    visibleColumnDefinitions={reorderedColumnDefinitions}
                    editingId={editingId}
                    editData={editData}
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    editableField={editableField}
                    showTisUploader={showTisUploader}
                    refetch={() => {}} 
                    logActions={logActions}
                  />
                )}
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
