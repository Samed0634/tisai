
import React, { useState } from "react";
import { useTableEdit } from "@/hooks/useTableEdit";
import { useColumnVisibility, TableType } from "@/hooks/useColumnVisibility";
import { TableContent } from "@/components/table/TableContent";
import { Workplace } from "@/types/workplace";

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType: TableType;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
}

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  tableType,
  editableField,
  title,
  defaultColumns,
  titleClassName
}) => {
  const { visibleColumns, toggleColumn } = useColumnVisibility(tableType, defaultColumns);
  const {
    editingId,
    editData,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave
  } = useTableEdit(refetch);

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
