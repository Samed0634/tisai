
import React from 'react';
import { TisItem } from '../hooks/useTisData';
import { TisResultCard } from './TisResultCard';
import { TablePagination } from "@/components/table/TablePagination";
import { usePagination } from "@/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TisResultsProps {
  results: TisItem[];
  isLoading: boolean;
  allResultsCount: number;
}

export const TisResults: React.FC<TisResultsProps> = ({ 
  results, 
  isLoading,
  allResultsCount
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  
  const { 
    paginatedData, 
    totalPages, 
    startIndex,
    hasNextPage,
    hasPreviousPage
  } = usePagination({ 
    data: results, 
    pageSize, 
    currentPage 
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1); // Reset to first page when changing page size
  };
  
  if (isLoading) {
    return (
      <p className="text-center text-muted-foreground">
        Yükleniyor...
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        {allResultsCount === 0 ? 'TİS belgesi bulunamadı.' : 'Arama sonucu bulunamadı.'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        {paginatedData.map(item => (
          <TisResultCard key={item.ID} item={item} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => hasPreviousPage && handlePageChange(currentPage - 1)}
                    className={!hasPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  
                  // Show first page, current page, last page and one page before and after current
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink 
                          isActive={currentPage === pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  
                  // Add ellipsis for breaks in sequence
                  if (
                    (pageNumber === 2 && currentPage > 3) || 
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return <PaginationEllipsis key={pageNumber} />;
                  }
                  
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
                    className={!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={results.length}
              startIndex={startIndex}
              onPageSizeChange={handlePageSizeChange}
              onPreviousPage={() => hasPreviousPage && handlePageChange(currentPage - 1)}
              onNextPage={() => hasNextPage && handlePageChange(currentPage + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
