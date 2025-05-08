
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

  // Ensure the sure_bilgisi column is defined
  const kalansureColumnExists = processedColumns.some(col => col.id === 'sure_bilgisi');
  
  if (!kalansureColumnExists && visibleColumns.includes('sure_bilgisi')) {
    processedColumns.push({
      id: 'sure_bilgisi',
      title: 'Kalan Süre'
    });
  }
  
  // Reorder columns to place 'durum' at the beginning and 'sure_bilgisi' right after it
  return reorderColumns(processedColumns);
};

const reorderColumns = (columns: ColumnType[]): ColumnType[] => {
  const reorderedColumns = [...columns];
  
  // Remove durum and sure_bilgisi from current positions
  const durumIndex = reorderedColumns.findIndex(col => col.id === 'durum');
  const sureIndex = reorderedColumns.findIndex(col => col.id === 'sure_bilgisi');
  
  let durumColumn, sureColumn;
  
  // Remove columns for reordering (if they exist)
  if (durumIndex !== -1) {
    [durumColumn] = reorderedColumns.splice(durumIndex, 1);
  }
  
  if (sureIndex !== -1) {
    [sureColumn] = reorderedColumns.splice(sureIndex < durumIndex && durumIndex !== -1 ? sureIndex : sureIndex - (durumIndex !== -1 ? 1 : 0), 1);
  }
  
  // Add columns back in the desired order
  // Insert sure_bilgisi at the beginning first
  if (sureColumn) {
    reorderedColumns.unshift(sureColumn);
  }
  
  // Then insert durum before sure_bilgisi
  if (durumColumn) {
    reorderedColumns.unshift(durumColumn);
  }
  
  return reorderedColumns;
};
