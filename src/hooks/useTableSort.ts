
import { useState } from "react";

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
    const aValue = a[sortKey];
    const bValue = b[sortKey];
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
