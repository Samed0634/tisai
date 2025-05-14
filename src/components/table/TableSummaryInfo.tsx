
import React from "react";

interface TableSummaryInfoProps {
  pageSize: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export const TableSummaryInfo: React.FC<TableSummaryInfoProps> = ({
  pageSize,
  totalItems,
  startIndex,
  endIndex
}) => {
  return (
    <div className="text-sm text-gray-500">
      {totalItems > 0 ? (
        <span>
          <span className="font-medium">{startIndex + 1}</span>
          <span> - </span>
          <span className="font-medium">{endIndex}</span>
          <span> / </span>
          <span className="font-medium">{totalItems}</span>
          <span> kayıt gösteriliyor</span>
        </span>
      ) : (
        <span>Kayıt bulunamadı</span>
      )}
    </div>
  );
};
