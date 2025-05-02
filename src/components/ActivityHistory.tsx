
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivityHistory } from "@/hooks/useActivityHistory";
import { useActivityFilters } from "@/hooks/useActivityFilters";
import { ActivityFilter } from "@/components/activity/ActivityFilter";
import { ActivityTable } from "@/components/activity/ActivityTable";
import { Button } from "@/components/ui/button";
import { FileDown, RefreshCw } from "lucide-react";
import { exportToExcel } from "@/utils/exportUtils";

const ActivityHistory: React.FC = () => {
  const { activities, loading, refreshActivities } = useActivityHistory();
  
  const {
    paginatedActivities,
    filteredActivities,
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

  const handleExportToExcel = () => {
    // Export all filtered activities, not just the current page
    exportToExcel(filteredActivities, "İşlem_Geçmişi");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>İşlem Geçmişi</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={refreshActivities}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Yenile</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={handleExportToExcel}
          >
            <FileDown className="h-4 w-4" />
            <span>Excel İndir</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ActivityFilter 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          timeFilter={timeFilter}
          onFilterChange={handleFilterChange}
        />
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
