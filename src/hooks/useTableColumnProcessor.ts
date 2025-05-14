import { useMemo } from "react";
import { ColumnType } from "@/constants/tableColumns";

export const useTableColumnProcessor = (columns: ColumnType[], visibleColumns: string[]) => {
  return useMemo(() => {
    const priorityOrder = [
      "durum", // Status should be first after action column
      "sure_bilgisi", // Time information
      "SORUMLU UZMAN", // Expert
      "BAĞLI OLDUĞU ŞUBE", // Branch
      "İŞYERİ ADI", // Workplace name
      "İŞÇİ SAYISI", // Worker count
      "ÜYE SAYISI", // Member count
    ];
    
    // Create a copy to avoid modifying the original array
    const sortedColumns = [...columns];
    
    // Sort columns based on the priority order
    sortedColumns.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.id);
      const bIndex = priorityOrder.indexOf(b.id);
      
      // If both columns are in the priority list, sort by their position in the list
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // If only a is in the priority list, it comes first
      if (aIndex !== -1) {
        return -1;
      }
      
      // If only b is in the priority list, it comes first
      if (bIndex !== -1) {
        return 1;
      }
      
      // Otherwise, maintain the original order
      return 0;
    });
    
    return sortedColumns;
  }, [columns, visibleColumns]);
};
