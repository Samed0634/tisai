
import React from "react";
import { TableHead, TableRow } from "@/components/ui/table";
import { ColumnType } from "@/constants/tableColumns";

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
        <TableHead className="text-[#ea384c] sticky left-0 bg-background z-10 text-xs">TİS Yükleme</TableHead>
      )}
      <TableHead className={`text-[#ea384c] ${showTisUploader ? '' : 'sticky left-0'} bg-background z-10 text-xs`}>İşlem</TableHead>
      {reorderedColumnDefinitions.map(column => (
        <TableHead key={column.id} className="text-xs">{column.title}</TableHead>
      ))}
    </TableRow>
  );
};
