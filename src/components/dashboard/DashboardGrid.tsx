
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import { DashboardItem } from "./dashboardTypes";
import { usePagination } from "@/hooks/usePagination";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// Helper to check deadlineDate condition per Turkish spec
function shouldHighlightRed(items: any[]): boolean {
  if (!items || items.length === 0) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Add one day for the "+1 gün" requirement
  const compareDate = new Date(today);
  compareDate.setDate(compareDate.getDate() + 1);

  return items.some((item) => {
    // Accept both deadlineDate and Termin Tarihi for compatibility
    const deadline =
      item.deadlineDate ||
      item["deadlineDate"] ||
      item["Termin Tarihi"] ||
      item["TerminTarihi"];
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(23, 59, 59, 999);
    // Status: bekleniyor/pending
    const status = (item.status || item["status"] || item["Güncel Durum"] || "").toLowerCase();
    const isPending = !status || status.includes("bekleniyor");
    // Check if overdue or TODAY, or past up to +1 day
    return isPending && deadlineDate < compareDate;
  });
}

interface DashboardGridProps {
  items: DashboardItem[];
  onCardClick: (categoryId: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ items, onCardClick }) => {
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedData, totalPages, hasNextPage, hasPreviousPage } = usePagination({
    data: items,
    pageSize,
    currentPage
  });

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {paginatedData.map((item) => {
          const highlightRed = shouldHighlightRed(item.items || []);
          return (
            <DashboardCard
              key={item.id}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              onClick={() => onCardClick(item.id)}
              className={highlightRed ? "text-destructive" : ""}
            />
          );
        })}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-4 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePreviousPage} 
                className={!hasPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                <span>Önceki</span>
              </PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <span className="px-2 py-1 text-sm">
                {currentPage} / {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                onClick={handleNextPage} 
                className={!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                <span>Sonraki</span>
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default DashboardGrid;
