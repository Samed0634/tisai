
import { useState } from "react";
import { normalizeText } from "@/utils/searchUtils";

interface WorkplaceItem {
  id: string;
  name: string;
  responsibleExpert?: string;
  branch?: string;
  sgkNo?: string;
  employeeCount?: number;
  memberCount?: number;
  status?: string;
  [key: string]: any;
}

export const useTableSort = <T extends WorkplaceItem>(data: T[]) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnId: string) => {
    if (sortKey === columnId) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(columnId);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    
    // Get values to compare
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    // Handle numeric sorting
    if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
      return sortOrder === 'asc' 
        ? Number(aValue) - Number(bValue) 
        : Number(bValue) - Number(aValue);
    }
    
    // Handle date sorting
    if (aValue && bValue && !isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
      return sortOrder === 'asc'
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }
    
    // Default string comparison with normalization for case-insensitivity and Turkish characters
    const aString = normalizeText(aValue);
    const bString = normalizeText(bValue);
    
    if (aString < bString) return sortOrder === 'asc' ? -1 : 1;
    if (aString > bString) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return {
    sortKey,
    sortOrder,
    handleSort,
    sortedData
  };
};
