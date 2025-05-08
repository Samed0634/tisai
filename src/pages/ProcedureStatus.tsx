
import React from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";
import { ExportButton } from "@/components/procedure-status/ExportButton";
import { FiltersToolbar } from "@/components/procedure-status/FiltersToolbar";
import { useProcedureFilters } from "@/hooks/useProcedureFilters";
import { useWorkplaceOptions } from "@/hooks/useWorkplaceOptions";
import { useFilteredWorkplaces } from "@/hooks/useFilteredWorkplaces";

const DEFAULT_VISIBLE_COLUMNS = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI", "durum"];

const sortOptions = [
  { value: "İŞYERİ ADI", label: "İşyeri Adı" },
  { value: "SORUMLU UZMAN", label: "Sorumlu Uzman" },
  { value: "BAĞLI OLDUĞU ŞUBE", label: "Bağlı Olduğu Şube" },
  { value: "durum", label: "Durum" }
];

const ProcedureStatus = () => {
  // Get workplace data
  const { workplaces, isLoading, refetch } = useWorkplaceData();
  
  // Get all filter state and handlers
  const {
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    selectedStatuses,
    setSelectedStatuses,
    selectedBranches,
    setSelectedBranches,
    selectedExperts,
    setSelectedExperts,
    statusFilterCount,
    branchExpertFilterCount
  } = useProcedureFilters();
  
  // Get branch and expert options
  const { branchOptions, expertOptions } = useWorkplaceOptions(workplaces);

  // Get filtered and sorted workplaces
  const filteredWorkplaces = useFilteredWorkplaces(
    workplaces,
    searchTerm,
    sortBy,
    selectedStatuses,
    selectedBranches,
    selectedExperts
  );

  // Event handlers for filters
  const handleStatusChange = (statuses: string[]) => {
    setSelectedStatuses(statuses);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleBranchChange = (branches: string[]) => {
    setSelectedBranches(branches);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleExpertChange = (experts: string[]) => {
    setSelectedExperts(experts);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ExportButton data={filteredWorkplaces} title="Prosedür_Durumu" />
      </div>
      
      <FiltersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatuses={selectedStatuses}
        onStatusChange={handleStatusChange}
        selectedBranches={selectedBranches}
        onBranchChange={handleBranchChange}
        selectedExperts={selectedExperts}
        onExpertChange={handleExpertChange}
        branchOptions={branchOptions}
        expertOptions={expertOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={sortOptions}
        statusFilterCount={statusFilterCount}
        branchExpertFilterCount={branchExpertFilterCount}
      />

      <div className="rounded-md border shadow-sm overflow-hidden">
        <EditableTableBase 
          data={filteredWorkplaces} 
          isLoading={isLoading} 
          refetch={refetch} 
          tableType="default" 
          editableField="durum" 
          title="Prosedür Durumu" 
          defaultColumns={DEFAULT_VISIBLE_COLUMNS} 
          titleClassName="text-xl" 
          pageSize={pageSize} 
          currentPage={currentPage} 
          setPageSize={setPageSize} 
          setCurrentPage={setCurrentPage} 
          pageSizeOptions={[10, 20, 30, 40, 50]} 
          showHorizontalScrollbar={true}
          logActions={true}
        />
      </div>
    </div>
  );
};

export default ProcedureStatus;
