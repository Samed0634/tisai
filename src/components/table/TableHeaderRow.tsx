
import React from "react";
import { TableHead, TableRow } from "@/components/ui/table";
import { ColumnType } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";

interface TableHeaderRowProps {
  reorderedColumnDefinitions: ColumnType[];
  showTisUploader: boolean;
}

export const TableHeaderRow: React.FC<TableHeaderRowProps> = ({
  reorderedColumnDefinitions,
  showTisUploader,
}) => {
  return (
    <TableRow>
      {showTisUploader && (
        <TableHead className="action-column sticky left-0 bg-[#f5f7fa] z-10 text-xs font-medium text-[#475569]">
          TİS Yükleme
        </TableHead>
      )}
      <TableHead className={cn(
        "action-column z-10 text-xs font-medium text-[#475569]",
        !showTisUploader && "sticky left-0 bg-[#f5f7fa]"
      )}>
        İşlem
      </TableHead>
      {reorderedColumnDefinitions.map(column => (
        <TableHead 
          key={column.id} 
          className="text-xs font-medium text-[#475569]"
        >
          {column.title}
        </TableHead>
      ))}
    </TableRow>
  );
};
