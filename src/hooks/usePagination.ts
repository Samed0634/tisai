
interface UsePaginationProps {
  data: any[];
  pageSize: number;
  currentPage: number;
}

export const usePagination = ({ data, pageSize, currentPage }: UsePaginationProps) => {
  if (!data || data.length === 0) {
    return {
      totalPages: 0,
      startIndex: 0,
      paginatedData: [],
      hasNextPage: false,
      hasPreviousPage: false
    };
  }

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pageSize ? data.slice(startIndex, startIndex + pageSize) : data;

  return {
    totalPages,
    startIndex,
    paginatedData,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
};
