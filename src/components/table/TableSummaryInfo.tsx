
import React from "react";

interface TableSummaryInfoProps {
  totalItems: number;
  startIndex: number;
  pageSize: number;
}

export const TableSummaryInfo: React.FC<TableSummaryInfoProps> = ({
  totalItems,
  startIndex,
  pageSize,
}) => {
  return (
    <span className="text-xs text-muted-foreground">
      Toplam {totalItems} kayıttan {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} arası gösteriliyor
    </span>
  );
};
