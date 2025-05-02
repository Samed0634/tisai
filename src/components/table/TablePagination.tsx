
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="flex items-center justify-between py-2 border-t text-xs">
      <div className="flex items-center gap-1">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
        >
          Önceki
        </button>
        <span className="px-2 py-1 rounded bg-primary text-white text-xs">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
        >
          Sonraki
        </button>
      </div>
      
      <span className="text-xs text-muted-foreground hidden sm:inline">
        Toplam {totalItems} kayıttan {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} arası gösteriliyor
      </span>
      
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Sayfa başına:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={onPageSizeChange}
        >
          <SelectTrigger className="h-7 w-[60px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10" className="text-xs">10</SelectItem>
            <SelectItem value="20" className="text-xs">20</SelectItem>
            <SelectItem value="30" className="text-xs">30</SelectItem>
            <SelectItem value="50" className="text-xs">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
