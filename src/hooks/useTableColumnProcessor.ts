
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
  
  // Reorder columns to place 'durum' at the beginning and 'sure_bilgisi' right after it
  return reorderColumns(processedColumns);
};

const reorderColumns = (columns: ColumnType[]): ColumnType[] => {
  const reorderedColumns = [...columns];
  
  // Find positions of durum and sure_bilgisi columns
  const durumIndex = reorderedColumns.findIndex(col => col.id === 'durum');
  const sureBilgisiIndex = reorderedColumns.findIndex(col => col.id === 'sure_bilgisi');
  
  // Remove both columns from their current positions (if they exist)
  let durumColumn;
  let sureBilgisiColumn;
  
  // Remove sure_bilgisi first if it exists (to prevent index shifting issues)
  if (sureBilgisiIndex !== -1) {
    [sureBilgisiColumn] = reorderedColumns.splice(sureBilgisiIndex, 1);
  }
  
  // Remove durum if it exists
  if (durumIndex !== -1) {
    [durumColumn] = reorderedColumns.splice(durumIndex, 1);
  }
  
  // Add columns back in desired order: first durum, then sure_bilgisi
  if (sureBilgisiColumn) {
    // If both columns exist, insert them at the beginning in the right order
    if (durumColumn) {
      reorderedColumns.unshift(sureBilgisiColumn); // sure_bilgisi goes first in the unshift order
      reorderedColumns.unshift(durumColumn); // durum goes before sure_bilgisi
    } else {
      // If only sure_bilgisi exists, just add it at the beginning
      reorderedColumns.unshift(sureBilgisiColumn);
    }
  } else if (durumColumn) {
    // If only durum exists, just add it at the beginning
    reorderedColumns.unshift(durumColumn);
  }
  
  return reorderedColumns;
};
