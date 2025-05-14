
import React from "react";
import { TablePageSizeSelector } from "./TablePageSizeSelector";
import { TablePaginationControls } from "./TablePaginationControls";
import { TableSummaryInfo } from "./TableSummaryInfo";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
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
  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first, last, current and some pages around current
    const pages = [1];
    
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);
    
    // Adjust to show 5 pages in the middle section
    if (startPage <= 3) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 6);
    }
    
    if (endPage >= totalPages - 2) {
      endPage = totalPages - 1;
      startPage = Math.max(2, totalPages - 5);
    }
    
    // Add ellipsis if needed
    if (startPage > 2) {
      pages.push(-1); // Use -1 as indicator for ellipsis
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push(-2); // Use -2 as indicator for ellipsis (to have unique keys)
    }
    
    // Add last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2 text-sm border-t mt-1 pt-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sayfa başına:</span>
        <Select value={pageSize.toString()} onValueChange={onPageSizeChange}>
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPreviousPage()}
          disabled={currentPage === 1}
          className="h-8 w-8 rounded-r-none"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center">
          {pageNumbers.map((page, index) => {
            if (page < 0) {
              // Render ellipsis
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="h-8 w-8 flex items-center justify-center text-gray-500"
                >
                  ...
                </div>
              );
            }
            
            return (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => currentPage !== page && setCurrentPage && setCurrentPage(page)}
                className="h-8 w-8 rounded-none border-l-0"
              >
                {page}
              </Button>
            );
          })}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNextPage()}
          disabled={currentPage === totalPages}
          className="h-8 w-8 rounded-l-none border-l-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-gray-600">
        {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} / {totalItems} kayıt
      </div>
    </div>
  );
};
