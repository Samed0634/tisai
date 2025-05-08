
import { ColumnType } from "@/constants/tableColumns";

/**
 * Ensures required columns are present in column definitions
 */
export const ensureRequiredColumns = (
  visibleColumnDefinitions: ColumnType[], 
  visibleColumns: string[]
): ColumnType[] => {
  let updatedColumns = [...visibleColumnDefinitions];

  // Ensure the durum column is defined
  const durumColumnExists = updatedColumns.some(col => col.id === 'durum');
  if (!durumColumnExists && visibleColumns.includes('durum')) {
    updatedColumns.push({
      id: 'durum',
      title: 'Durum',
      editable: true
    });
  }
  
  // Ensure the sure_bilgisi column is defined
  const sureBilgisiColumnExists = updatedColumns.some(col => col.id === 'sure_bilgisi');
  if (!sureBilgisiColumnExists && visibleColumns.includes('sure_bilgisi')) {
    updatedColumns.push({
      id: 'sure_bilgisi',
      title: 'Kalan Süre',
      editable: false
    });
  }

  return updatedColumns;
};

/**
 * Reorders columns to place sure_bilgisi and durum columns at the beginning
 */
export const reorderImportantColumns = (columns: ColumnType[]): ColumnType[] => {
  let reorderedColumnDefinitions = [...columns];
  
  // Find and remove durum and sure_bilgisi from current positions
  const durumIndex = reorderedColumnDefinitions.findIndex(col => col.id === 'durum');
  const sureBilgisiIndex = reorderedColumnDefinitions.findIndex(col => col.id === 'sure_bilgisi');
  
  let durumColumn = null;
  let sureBilgisiColumn = null;

  if (durumIndex !== -1) {
    [durumColumn] = reorderedColumnDefinitions.splice(durumIndex, 1);
  }
  
  if (sureBilgisiIndex !== -1) {
    [sureBilgisiColumn] = reorderedColumnDefinitions.splice(
      sureBilgisiIndex > durumIndex && durumIndex !== -1 ? sureBilgisiIndex - 1 : sureBilgisiIndex, 
      1
    );
  }
  
  // Insert columns at the beginning, first durum then sure_bilgisi
  const columnsToInsert = [];
  if (durumColumn) columnsToInsert.push(durumColumn);
  if (sureBilgisiColumn) columnsToInsert.push(sureBilgisiColumn);
  
  if (columnsToInsert.length > 0) {
    reorderedColumnDefinitions = [
      ...columnsToInsert,
      ...reorderedColumnDefinitions
    ];
  }

  return reorderedColumnDefinitions;
};
