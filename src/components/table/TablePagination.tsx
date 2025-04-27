
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  pageSizeOptions?: number[];
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
  pageSizeOptions = [10, 20, 30, 40, 50]
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;

  const onPageSizeChange = (value: string) => {
    setPageSize(parseInt(value, 10));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 py-2 text-xs">
      <div className="flex gap-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
        >
          Önceki
        </button>
        <span className="px-2 py-1 rounded bg-primary text-white text-xs">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
        >
          Sonraki
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Sayfa başına:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={onPageSizeChange}
        >
          <SelectTrigger className="w-[80px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map(option => (
              <SelectItem key={option} value={option.toString()} className="text-xs">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="text-xs text-muted-foreground">
        Toplam {totalItems} kayıttan {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} arası gösteriliyor
      </span>
    </div>
  );
};
