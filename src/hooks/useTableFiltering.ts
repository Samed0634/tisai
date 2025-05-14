
import { useState, useMemo } from "react";
import { Workplace } from "@/types/workplace";

interface FilterOptions {
  experts: string[];
  branches: string[];
  statuses: string[];
}

interface TableFilters {
  search: string;
  expert: string;
  branch: string;
  status: string;
}

export const useTableFiltering = (data: Workplace[]) => {
  const [filters, setFilters] = useState<TableFilters>({
    search: "",
    expert: "",
    branch: "",
    status: ""
  });

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    if (!data.length) return { experts: [], branches: [], statuses: [] };
    
    const experts = new Set<string>();
    const branches = new Set<string>();
    const statuses = new Set<string>();

    data.forEach(item => {
      if (item["SORUMLU UZMAN"]) experts.add(item["SORUMLU UZMAN"]);
      if (item["BAĞLI OLDUĞU ŞUBE"]) branches.add(item["BAĞLI OLDUĞU ŞUBE"]);
      if (item["durum"]) statuses.add(item["durum"]);
    });

    return {
      experts: Array.from(experts).sort(),
      branches: Array.from(branches).sort(),
      statuses: Array.from(statuses).sort()
    };
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Apply all filters
      const matchesSearch = !filters.search || 
        Object.values(item).some(value => 
          typeof value === 'string' && 
          value.toLowerCase().includes(filters.search.toLowerCase())
        );
      
      const matchesExpert = !filters.expert || item["SORUMLU UZMAN"] === filters.expert;
      const matchesBranch = !filters.branch || item["BAĞLI OLDUĞU ŞUBE"] === filters.branch;
      const matchesStatus = !filters.status || item["durum"] === filters.status;
      
      return matchesSearch && matchesExpert && matchesBranch && matchesStatus;
    });
  }, [data, filters]);

  return {
    filters,
    setFilters,
    filterOptions,
    filteredData,
    resetFilters: () => setFilters({search: "", expert: "", branch: "", status: ""})
  };
};
