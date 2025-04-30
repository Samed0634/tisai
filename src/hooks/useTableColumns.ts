
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

  useEffect(() => {
    // Add durum and updated_at to visible columns if they're not already there
    setVisibleColumns(prevColumns => {
      const hasDurum = prevColumns.includes("durum");
      const hasUpdatedAt = prevColumns.includes("updated_at");
      
      if (!hasDurum && !hasUpdatedAt) {
        return [...prevColumns, "durum", "updated_at"];
      } else if (!hasDurum) {
        return [...prevColumns, "durum"];
      } else if (!hasUpdatedAt) {
        return [...prevColumns, "updated_at"];
      }
      
      return prevColumns;
    });
  }, []);

  const toggleColumn = (column: string) => {
    setVisibleColumns(prevColumns =>
      prevColumns.includes(column)
        ? prevColumns.filter(col => col !== column)
        : [...prevColumns, column]
    );
  };

  return { visibleColumns, toggleColumn };
};
