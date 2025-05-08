
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";
import { useTisData } from "@/features/tis-download/hooks/useTisData";
import { useTisFilters } from "@/features/tis-download/hooks/useTisFilters";
import { TisSearchBox } from "@/features/tis-download/components/TisSearchBox";
import { TisFilterControls } from "@/features/tis-download/components/TisFilterControls";
import { TisFilterPanel } from "@/features/tis-download/components/TisFilterPanel";
import { TisResults } from "@/features/tis-download/components/TisResults";

const DownloadTis = () => {
  const { 
    allResults, 
    isLoading, 
    branches, 
    years, 
    experts, 
    fetchTisData 
  } = useTisData();

  const {
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    yearFilter,
    setYearFilter,
    expertFilter,
    setExpertFilter,
    sortOption,
    setSortOption,
    isFilterOpen,
    setIsFilterOpen,
    filteredResults,
    clearFilters
  } = useTisFilters(allResults);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">TİS İndir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <TisSearchBox 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                resultCount={filteredResults.length}
                totalCount={allResults.length}
              />
              
              <Collapsible 
                open={isFilterOpen} 
                onOpenChange={setIsFilterOpen}
              >
                <TisFilterControls 
                  isFilterOpen={isFilterOpen}
                  setIsFilterOpen={setIsFilterOpen}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  isLoading={isLoading}
                  onRefresh={fetchTisData}
                />
              
                <TisFilterPanel
                  isFilterOpen={isFilterOpen}
                  branches={branches}
                  years={years}
                  experts={experts}
                  branchFilter={branchFilter}
                  setBranchFilter={setBranchFilter}
                  yearFilter={yearFilter}
                  setYearFilter={setYearFilter}
                  expertFilter={expertFilter}
                  setExpertFilter={setExpertFilter}
                  onClearFilters={clearFilters}
                />
              </Collapsible>
            </div>

            <div className="mt-6">
              <TisResults 
                results={filteredResults}
                isLoading={isLoading}
                allResultsCount={allResults.length}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadTis;
