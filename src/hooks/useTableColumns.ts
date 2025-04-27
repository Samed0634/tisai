
import { useState, useEffect } from 'react';

interface UseTableColumnsProps {
  tableType: string;
  defaultColumns: string[];
}

export const useTableColumns = ({ tableType, defaultColumns }: UseTableColumnsProps) => {
  const getInitialColumns = () => {
    const storageKey = `tableColumns_${tableType}`;
    const savedColumns = localStorage.getItem(storageKey);
    return savedColumns ? JSON.parse(savedColumns) : defaultColumns;
  };

  const [visibleColumns, setVisibleColumns] = useState<string[]>(getInitialColumns());

  useEffect(() => {
    const storageKey = `tableColumns_${tableType}`;
    localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
  }, [visibleColumns, tableType]);

  const toggleColumn = (column: string) => {
    setVisibleColumns(prevColumns =>
      prevColumns.includes(column)
        ? prevColumns.filter(col => col !== column)
        : [...prevColumns, column]
    );
  };

  return { visibleColumns, toggleColumn };
};
