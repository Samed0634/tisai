
import { useState } from "react";
import { COLUMNS } from "@/constants/tableColumns";

const DEFAULT_VISIBLE_COLUMNS = COLUMNS.map(col => col.id);

export const useColumnVisibility = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  const toggleColumn = (columnId: string) => {
    const column = COLUMNS.find(col => col.id === columnId);
    if (column?.fixed) return; // Don't toggle fixed columns
    
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
