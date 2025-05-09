
import React from "react";
import { Workplace } from "@/types/workplace";
import { useTableColumns } from "@/hooks/useTableColumns";
import { TableContainer } from "@/components/table/TableContainer";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useDefaultColumns } from "@/hooks/useDefaultColumns";

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
  showTisUploader?: boolean;
  logActions?: boolean;
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
  pageSize: externalPageSize,
  currentPage: externalCurrentPage,
  setPageSize: externalSetPageSize,
  setCurrentPage: externalSetCurrentPage,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showHorizontalScrollbar = true,
  showTisUploader = false,
  logActions = true
}) => {
  // Get default columns based on table type
  const defaultTableColumns = useDefaultColumns(tableType, defaultColumns);
  
  const { visibleColumns, toggleColumn } = useTableColumns({
    tableType,
    defaultColumns: defaultTableColumns
  });

  // Handle pagination
  const {
    pageSize,
    currentPage,
    setPageSize,
    setCurrentPage
  } = useTablePagination({
    externalPageSize,
    externalCurrentPage,
    setPageSize: externalSetPageSize,
    setCurrentPage: externalSetCurrentPage
  });

  return (
    <TableContainer
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType={tableType}
      editableField={editableField}
      title={title}
      defaultColumns={defaultTableColumns}
      titleClassName={titleClassName}
      pageSize={pageSize}
      currentPage={currentPage}
      setPageSize={setPageSize}
      setCurrentPage={setCurrentPage}
      showHorizontalScrollbar={showHorizontalScrollbar}
      showTisUploader={showTisUploader}
      logActions={logActions}
    />
  );
};
