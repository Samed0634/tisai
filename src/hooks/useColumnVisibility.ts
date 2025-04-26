
import { useState } from "react";
import { COLUMNS } from "@/constants/tableColumns";

const DEFAULT_VISIBLE_COLUMNS = [
  'SORUMLU UZMAN', 
  'BAĞLI OLDUĞU ŞUBE', 
  'İŞYERİ ADI', 
  'ARABULUCU RAPORU TEBLİĞ TARİHİ', 
  'GREV KARARI TARİHİ'
];

const OYLAMA_DEFAULT_COLUMNS = [
  'SORUMLU UZMAN',
  'BAĞLI OLDUĞU ŞUBE',
  'İŞYERİ ADI',
  'GREV KARARI TARİHİ',
  'GREV OYLAMASI TARİHİ'
];

export const useColumnVisibility = (type: "default" | "oylamaColumns" = "default") => {
  const defaultColumns = type === "default" ? DEFAULT_VISIBLE_COLUMNS : OYLAMA_DEFAULT_COLUMNS;
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultColumns);

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
    setVisibleColumns(defaultColumns);
  };

  return {
    visibleColumns,
    toggleColumn,
    resetColumns,
    DEFAULT_VISIBLE_COLUMNS: defaultColumns
  };
};
