
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
  logActions = true, // Default to true to ensure all actions are logged
}) => {
  if (isLoading) {
    return (
      <div className="rounded-md border p-8">
        <LoadingSpinner />
      </div>
    );
  }

  // Make sure we have the "durum" column in our column definitions if it's not there
  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );

  // Ensure the durum column is defined
  const durumColumnExists = visibleColumnDefinitions.some(col => col.id === 'durum');
  
  if (!durumColumnExists && visibleColumns.includes('durum')) {
    visibleColumnDefinitions.push({
      id: 'durum',
      title: 'Durum',
      editable: true
    });
  }

  // Ensure the sure_bilgisi column is defined
  const kalansureColumnExists = visibleColumnDefinitions.some(col => col.id === 'sure_bilgisi');
  
  if (!kalansureColumnExists && visibleColumns.includes('sure_bilgisi')) {
    visibleColumnDefinitions.push({
      id: 'sure_bilgisi',
      title: 'Kalan Süre'
    });
  }
  
  // Reorder columns to place 'durum' at the beginning and 'sure_bilgisi' right after it
  const reorderedColumnDefinitions = [...visibleColumnDefinitions];
  
  // Remove durum and sure_bilgisi from current positions
  const durumIndex = reorderedColumnDefinitions.findIndex(col => col.id === 'durum');
  const sureIndex = reorderedColumnDefinitions.findIndex(col => col.id === 'sure_bilgisi');
  
  let durumColumn, sureColumn;
  
  // Remove columns for reordering (if they exist)
  if (durumIndex !== -1) {
    [durumColumn] = reorderedColumnDefinitions.splice(durumIndex, 1);
  }
  
  if (sureIndex !== -1) {
    [sureColumn] = reorderedColumnDefinitions.splice(sureIndex < durumIndex && durumIndex !== -1 ? sureIndex : sureIndex - (durumIndex !== -1 ? 1 : 0), 1);
  }
  
  // Add columns back in the desired order
  // Insert sure_bilgisi at the beginning first
  if (sureColumn) {
    reorderedColumnDefinitions.unshift(sureColumn);
  }
  
  // Then insert durum before sure_bilgisi
  if (durumColumn) {
    reorderedColumnDefinitions.unshift(durumColumn);
  }

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
