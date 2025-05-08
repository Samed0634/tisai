
import React from 'react';
import { useFilterMemory } from '@/hooks/useFilterMemory';

export interface FilterOption {
  value: string;
  label: string;
}

export const useProcedureFilters = () => {
  const [pageSize, setPageSize] = useFilterMemory("procedureStatus_pageSize", 10);
  const [currentPage, setCurrentPage] = useFilterMemory("procedureStatus_currentPage", 1);
  const [searchTerm, setSearchTerm] = useFilterMemory("procedureStatus_searchTerm", "");
  const [sortBy, setSortBy] = useFilterMemory("procedureStatus_sortBy", "İŞYERİ ADI");
  const [selectedStatuses, setSelectedStatuses] = useFilterMemory("procedureStatus_selectedStatuses", [] as string[]);
  const [selectedBranches, setSelectedBranches] = useFilterMemory("procedureStatus_selectedBranches", [] as string[]);
  const [selectedExperts, setSelectedExperts] = useFilterMemory("procedureStatus_selectedExperts", [] as string[]);

  // Status filter count for badge
  const statusFilterCount = selectedStatuses.length;
  
  // Branch and expert filter count combined for badge
  const branchExpertFilterCount = selectedBranches.length + selectedExperts.length;

  return {
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
  };
};
