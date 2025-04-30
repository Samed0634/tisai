
import React, { useState } from 'react';
import { useTableColumns } from '@/hooks/useTableColumns';
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

  const { editingId, editData, handleEdit, handleCancel, handleChange, handleSave } = useTableEdit(refetch);

  const [internalPageSize, setInternalPageSize] = useState(externalPageSize);
  const [internalCurrentPage, setInternalCurrentPage] = useState(externalCurrentPage);

  const pageSize = externalSetPageSize ? externalPageSize : internalPageSize;
  const currentPage = externalSetCurrentPage ? externalCurrentPage : internalCurrentPage;
  const setPageSizeInternal = externalSetPageSize || setInternalPageSize;
  const setCurrentPageInternal = externalSetCurrentPage || setInternalCurrentPage;

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
      setPageSize={setPageSizeInternal}
      currentPage={currentPage}
      setCurrentPage={setCurrentPageInternal}
      title={title}
      titleClassName={titleClassName}
      editableField={editableField}
    />
  );
};

const getDefaultColumns = (tableType: string): string[] => {
  const baseColumns = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI"];
  const statusColumns = ["durum", "updated_at"];

  switch (tableType) {
    case "oylamaColumns":
      return [...baseColumns, "GREV OYLAMASI TARİHİ", ...statusColumns];
    case "cagriColumns":
      return [...baseColumns, "ÇAĞRI TARİHİ", ...statusColumns];
    case "yetkiTespitColumns":
      return [...baseColumns, "YETKİ BELGESİ TEBLİĞ TARİHİ", ...statusColumns];
    case "yetkiBelgesiColumns":
      return [...baseColumns, "ÇAĞRI TARİHİ", ...statusColumns];
    case "yerGunTespitColumns":
      return [...baseColumns, "YER VE GÜN TESPİT TARİHİ", ...statusColumns];
    case "ilkOturumColumns":
      return [...baseColumns, "İLK OTURUM TARİHİ", ...statusColumns];
    case "muzakereSuresiColumns":
      return [...baseColumns, "MÜZAKERE SÜRESİ SON TARİH", ...statusColumns];
    case "uyusmazlikColumns":
      return [...baseColumns, "UYUŞMAZLIK TARİHİ", ...statusColumns];
    case "yhkColumns":
      return [...baseColumns, "YHK GÖNDERİM TARİHİ", ...statusColumns];
    case "imzalananTislerColumns":
      return [...baseColumns, "TİS GELİŞ TARİHİ", ...statusColumns];
    case "grevYasakColumns":
      return [...baseColumns, "GREV YASAĞI DURUMU", ...statusColumns];
    case "grevKarariColumns":
      return [...baseColumns, "GREV KARARI TARİHİ", ...statusColumns];
    case "oncedenBelirlenenColumns":
      return [...baseColumns, "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ", ...statusColumns];
    default:
      return [...baseColumns, "İŞÇİ SAYISI", "ÜYE SAYISI", ...statusColumns];
  }
};
