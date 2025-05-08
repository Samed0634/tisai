
import { useState } from "react";

interface UseTablePaginationProps {
  externalPageSize?: number;
  externalCurrentPage?: number;
  setPageSize?: (size: number) => void;
  setCurrentPage?: (page: number) => void;
  defaultPageSize?: number;
  defaultCurrentPage?: number;
}

export const useTablePagination = ({
  externalPageSize,
  externalCurrentPage,
  setPageSize: externalSetPageSize,
  setCurrentPage: externalSetCurrentPage,
  defaultPageSize = 10,
  defaultCurrentPage = 1
}: UseTablePaginationProps) => {
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [internalCurrentPage, setInternalCurrentPage] = useState(defaultCurrentPage);

  const pageSize = externalSetPageSize ? externalPageSize : internalPageSize;
  const currentPage = externalSetCurrentPage ? externalCurrentPage : internalCurrentPage;
  const setPageSizeInternal = externalSetPageSize || setInternalPageSize;
  const setCurrentPageInternal = externalSetCurrentPage || setInternalCurrentPage;

  const handlePageSizeChange = (value: string) => {
    setPageSizeInternal(Number(value));
    setCurrentPageInternal(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPageInternal(currentPage - 1);
    }
  };

  const handleNextPage = (totalPages: number) => {
    if (currentPage < totalPages) {
      setCurrentPageInternal(currentPage + 1);
    }
  };

  return {
    pageSize,
    currentPage,
    setPageSize: setPageSizeInternal,
    setCurrentPage: setCurrentPageInternal,
    handlePageSizeChange,
    handlePreviousPage,
    handleNextPage
  };
};
