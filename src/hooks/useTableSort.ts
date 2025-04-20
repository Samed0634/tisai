
import { useState } from "react";
import { WorkplaceItem } from "@/utils/mockData";

export const useTableSort = (data: WorkplaceItem[]) => {
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
    const aValue = (a as any)[sortKey];
    const bValue = (b as any)[sortKey];
    const compareResult = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  return {
    sortKey,
    sortOrder,
    handleSort,
    sortedData
  };
};
