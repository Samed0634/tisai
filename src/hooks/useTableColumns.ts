
import { useState, useEffect } from 'react';

interface UseTableColumnsProps {
  tableType: string;
  defaultColumns: string[];
}

export const useTableColumns = ({ tableType, defaultColumns }: UseTableColumnsProps) => {
  const storageKey = `tableColumns_${tableType}`;

  const getInitialColumns = () => {
    if (typeof window === 'undefined') return defaultColumns;

    const savedColumns = localStorage.getItem(storageKey);
    return savedColumns ? JSON.parse(savedColumns) : defaultColumns;
  };

  const [visibleColumns, setVisibleColumns] = useState<string[]>(getInitialColumns());

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
  }, [visibleColumns, storageKey]);

  const toggleColumn = (column: string) => {
    setVisibleColumns(prevColumns =>
      prevColumns.includes(column)
        ? prevColumns.filter(col => col !== column)
        : [...prevColumns, column]
    );
  };

  // Varsayılan görünür sütunlara sıfırla
  const resetToDefaults = () => {
    setVisibleColumns(defaultColumns);
  };

  return { 
    visibleColumns, 
    toggleColumn,
    resetToDefaults 
  };
};
