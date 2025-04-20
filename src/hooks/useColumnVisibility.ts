
import { useState } from "react";

const DEFAULT_VISIBLE_COLUMNS = ['status', 'name', 'branch', 'responsibleExpert', 'sgkNo', 'employeeCount', 'memberCount'];

export const useColumnVisibility = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  const toggleColumn = (columnId: string) => {
    if (columnId === 'status') return;
    setVisibleColumns(current =>
      current.includes(columnId)
        ? current.filter(id => id !== columnId)
        : [...current, columnId]
    );
  };

  return {
    visibleColumns,
    toggleColumn,
    DEFAULT_VISIBLE_COLUMNS
  };
};
