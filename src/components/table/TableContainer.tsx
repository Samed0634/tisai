
import React from "react";
import { Workplace } from "@/types/workplace";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TableContent } from "./TableContent";

interface TableContainerProps {
  data: Workplace[];
  isLoading: boolean;
  refetch: () => void;
  tableType: string;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
  pageSize: number;
  currentPage: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  showHorizontalScrollbar?: boolean;
  showTisUploader?: boolean;
  logActions?: boolean;
}

export const TableContainer: React.FC<TableContainerProps> = ({
  data,
  isLoading,
  refetch,
  tableType,
  editableField,
  title,
  defaultColumns,
  titleClassName = 'text-2xl',
  pageSize,
  currentPage,
  setPageSize,
  setCurrentPage,
  showHorizontalScrollbar = false,
  showTisUploader = false,
  logActions = true
}) => {
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
      refetch={refetch}
      tableType={tableType}
      editableField={editableField}
      title={title}
      defaultColumns={defaultColumns}
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
