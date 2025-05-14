
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableSummaryInfo } from "./TableSummaryInfo";
import { TablePageSizeSelector } from "./TablePageSizeSelector";

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
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Logic for page number range
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust the range if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
          className="h-8 w-8 p-0"
        >
          1
        </Button>
      );
      
      // Show ellipsis if there's a gap
      if (startPage > 2) {
        pageNumbers.push(
          <div key="ellipsis1" className="px-2 py-1 text-sm text-muted-foreground">
            ...
          </div>
        );
      }
    }
    
    // Numbered pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(i)}
          className="h-8 w-8 p-0"
        >
          {i}
        </Button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      // Show ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <div key="ellipsis2" className="px-2 py-1 text-sm text-muted-foreground">
            ...
          </div>
        );
      }
      
      pageNumbers.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className="h-8 w-8 p-0"
        >
          {totalPages}
        </Button>
      );
    }
    
    return pageNumbers;
  };

  // Define onPageChange function that was missing
  const onPageChange = (page: number) => {
    // Navigate directly to the specified page
    if (page < currentPage) {
      onPreviousPage();
    } else if (page > currentPage) {
      onNextPage();
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      <TableSummaryInfo 
        pageSize={pageSize}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={Math.min(startIndex + pageSize, totalItems)}
      />
      
      <div className="flex items-center gap-2">
        <TablePageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
        
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="hidden sm:flex items-center mx-2 space-x-1">
            {renderPageNumbers()}
          </div>
          
          <div className="sm:hidden mx-2 text-sm">
            <span className="font-medium">{currentPage}</span>
            <span className="text-muted-foreground"> / {totalPages}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
