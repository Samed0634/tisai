
import { ColumnType } from "@/constants/tableColumns";

export const useTableColumnProcessor = (visibleColumnDefinitions: ColumnType[], visibleColumns: string[]) => {
  // Ensure the durum column is defined
  let processedColumns = [...visibleColumnDefinitions];
  
  // Check if durum column exists
  const durumColumnExists = processedColumns.some(col => col.id === 'durum');
  
  if (!durumColumnExists && visibleColumns.includes('durum')) {
    processedColumns.push({
      id: 'durum',
      title: 'Durum',
      editable: true
    });
  }
  
  // Reorder columns to place 'durum' at the beginning
  return reorderColumns(processedColumns);
};

const reorderColumns = (columns: ColumnType[]): ColumnType[] => {
  const reorderedColumns = [...columns];
  
  // Remove durum from current position
  const durumIndex = reorderedColumns.findIndex(col => col.id === 'durum');
  
  let durumColumn;
  
  // Remove column for reordering (if it exists)
  if (durumIndex !== -1) {
    [durumColumn] = reorderedColumns.splice(durumIndex, 1);
  }
  
  // Add durum column at the beginning
  if (durumColumn) {
    reorderedColumns.unshift(durumColumn);
  }
  
  return reorderedColumns;
};
