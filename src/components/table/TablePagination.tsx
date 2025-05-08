
import React from "react";
import { TablePageSizeSelector } from "./TablePageSizeSelector";
import { TablePaginationControls } from "./TablePaginationControls";
import { TableSummaryInfo } from "./TableSummaryInfo";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  startIndex: number;
  onPageSizeChange: (value: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  setPageSize?: (size: number) => void;
  setCurrentPage?: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  startIndex,
  onPageSizeChange,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-between items-center gap-2 py-2 text-xs">
      <TablePaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
      
      <TablePageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      
      <TableSummaryInfo
        totalItems={totalItems}
        startIndex={startIndex}
        pageSize={pageSize}
      />
    </div>
  );
};
