
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
            <SelectItem value="10" className="text-xs">10</SelectItem>
            <SelectItem value="20" className="text-xs">20</SelectItem>
            <SelectItem value="30" className="text-xs">30</SelectItem>
            <SelectItem value="50" className="text-xs">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <span className="text-xs text-muted-foreground">
        Toplam {totalItems} kayıttan {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} arası gösteriliyor
      </span>
    </div>
  );
};
