
import { useState } from "react";
import { COLUMNS } from "@/constants/tableColumns";

const DEFAULT_VISIBLE_COLUMNS = [
  'SORUMLU UZMAN', 
  'BAĞLI OLDUĞU ŞUBE', 
  'İŞYERİ ADI', 
  'ARABULUCU RAPORU TEBLİĞ TARİHİ', 
  'GREV KARARI TARİHİ'
];

export const useColumnVisibility = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  const toggleColumn = (columnId: string) => {
    const column = COLUMNS.find(col => col.id === columnId);
    
    // Don't toggle fixed columns
    if (column?.fixed) return;
    
    setVisibleColumns(current =>
      current.includes(columnId)
        ? current.filter(id => id !== columnId)
        : [...current, columnId]
    );
  };

  // Reset to default visible columns
  const resetColumns = () => {
    setVisibleColumns(DEFAULT_VISIBLE_COLUMNS);
  };

  return {
    visibleColumns,
    toggleColumn,
    resetColumns,
    DEFAULT_VISIBLE_COLUMNS
  };
};
