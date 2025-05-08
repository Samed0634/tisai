
import React from "react";

interface TablePaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const TablePaginationControls: React.FC<TablePaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
      >
        Önceki
      </button>
      <span className="px-2 py-1 rounded bg-primary text-white text-xs">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
      >
        Sonraki
      </button>
    </div>
  );
};
