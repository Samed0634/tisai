
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivityHistory } from "@/hooks/useActivityHistory";
import { useActivityFilters } from "@/hooks/useActivityFilters";
import { ActivityFilter } from "@/components/activity/ActivityFilter";
import { ActivityTable } from "@/components/activity/ActivityTable";

const ActivityHistory: React.FC = () => {
  const { activities, loading } = useActivityHistory();
  
  const {
    paginatedActivities,
    searchTerm,
    timeFilter,
    pageSize,
    currentPage,
    totalPages,
    startIndex,
    handleSearchChange,
    handleFilterChange,
    handlePageSizeChange,
    setCurrentPage
  } = useActivityFilters(activities);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>İşlem Geçmişi</CardTitle>
        <ActivityFilter 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          timeFilter={timeFilter}
          onFilterChange={handleFilterChange}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full" showTopScrollbar={true} showBottomScrollbar={true}>
          <ActivityTable 
            activities={paginatedActivities}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            startIndex={startIndex}
            onPageSizeChange={handlePageSizeChange}
            onPreviousPage={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            onNextPage={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;
