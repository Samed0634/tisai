
import { useState, useMemo } from "react";
import { Workplace } from "@/types/workplace";

export const useTableSorting = (data: Workplace[]) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null,
    direction: 'ascending' | 'descending'
  }>({
    key: null,
    direction: 'ascending'
  });

  // Handle sort request
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      // If no sort is applied, return default order
      if (!sortConfig.key) return 0;

      // Get values to compare
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      // Handle null/undefined values
      if (valueA === undefined || valueA === null) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (valueB === undefined || valueB === null) return sortConfig.direction === 'ascending' ? 1 : -1;

      // Handle different data types
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
      }

      // Default string comparison
      const stringA = String(valueA).toLowerCase();
      const stringB = String(valueB).toLowerCase();
      
      if (stringA < stringB) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (stringA > stringB) return sortConfig.direction === 'ascending' ? 1 : -1;
      
      return 0;
    });
  }, [data, sortConfig]);

  return {
    sortConfig,
    requestSort,
    sortedData
  };
};
