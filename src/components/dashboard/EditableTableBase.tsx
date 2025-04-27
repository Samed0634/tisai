
import React, { useState } from 'react';
import { useTableColumns } from '@/hooks/useTableColumns';
import { useWorkplaceData } from '@/hooks/useWorkplaceData';
import { usePagination } from '@/hooks/usePagination';
import { Workplace } from '@/types/workplace';
import { TableContent } from '../table/TableContent';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useTableEdit } from '@/hooks/useTableEdit';
import { TableColumnFilter } from './table/TableColumnFilter';

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType?: string;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
  showControls?: boolean;
  pageSize?: number;
  currentPage?: number;
  setPageSize?: (size: number) => void;
  setCurrentPage?: (page: number) => void;
  pageSizeOptions?: number[];
  showHorizontalScrollbar?: boolean;
}

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({
  data,
  isLoading = false,
  refetch,
  tableType = 'default',
  editableField,
  title,
  defaultColumns,
  titleClassName = 'text-2xl',
  showControls = true,
  pageSize: externalPageSize = 10,
  currentPage: externalCurrentPage = 1,
  setPageSize: externalSetPageSize,
  setCurrentPage: externalSetCurrentPage,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showHorizontalScrollbar = false
}) => {
  const { visibleColumns, toggleColumn } = useTableColumns({
    tableType,
    defaultColumns: defaultColumns || getDefaultColumns(tableType)
  });

  const { updateWorkplace } = useWorkplaceData();
  const { editingId, editData, handleEdit, handleCancel, handleChange, handleSave: originalHandleSave } = useTableEdit(refetch);

  // Enhanced handleSave function that also uses updateWorkplace from useWorkplaceData
  const handleSave = async () => {
    if (!editData) return;
    
    try {
      // Call the table edit's handleSave
      await originalHandleSave();
      
      // Also use the central workplaceData mutation to ensure consistency
      if (editData) {
        await updateWorkplace(editData);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Use internal state if external state handlers are not provided
  const [internalPageSize, setInternalPageSize] = useState(externalPageSize);
  const [internalCurrentPage, setInternalCurrentPage] = useState(externalCurrentPage);

  // Determine which state and handlers to use
  const pageSize = externalSetPageSize ? externalPageSize : internalPageSize;
  const currentPage = externalSetCurrentPage ? externalCurrentPage : internalCurrentPage;
  const setPageSize = externalSetPageSize || setInternalPageSize;
  const setCurrentPage = externalSetCurrentPage || setInternalCurrentPage;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <TableContent
      data={data}
      isLoading={isLoading}
      visibleColumns={visibleColumns}
      toggleColumn={toggleColumn}
      editingId={editingId}
      editData={editData}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSave={handleSave}
      pageSize={pageSize}
      setPageSize={setPageSize}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      title={title}
      titleClassName={titleClassName}
      editableField={editableField}
    />
  );
};

const getDefaultColumns = (tableType: string): string[] => {
  switch (tableType) {
    case "oylamaColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV OYLAMASI TARİHİ"];
    case "cagriColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yetkiTespitColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"];
    case "yetkiBelgesiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yerGunTespitColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YER VE GÜN TESPİT TARİHİ"];
    case "ilkOturumColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İLK OTURUM TARİHİ"];
    case "muzakereSuresiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "MÜZAKERE SÜRESİ SON TARİH"];
    case "uyusmazlikColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"];
    case "yhkColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YHK GÖNDERİM TARİHİ"];
    case "imzalananTislerColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "TİS GELİŞ TARİHİ"];
    case "grevYasagiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV YASAĞI DURUMU"];
    default:
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI"];
  }
};
