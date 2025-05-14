
import React from "react";
import { Table, TableHeader, TableRow } from "@/components/ui/table";
import { TableSortHeader } from "./TableSortHeader";
import { cn } from "@/lib/utils";

interface TableHeaderSectionProps {
  processedColumns: any[];
  sortConfig: {
    key: string | null;
    direction: 'ascending' | 'descending';
  };
  requestSort: (key: string) => void;
  showTisUploader: boolean;
}

export const TableHeaderSection: React.FC<TableHeaderSectionProps> = ({
  processedColumns,
  sortConfig,
  requestSort,
  showTisUploader
}) => {
  return (
    <TableHeader>
      <TableRow>
        {showTisUploader && (
          <th className="action-column text-xs">TİS Yükleme</th>
        )}
        <th className={cn("action-column text-xs", !showTisUploader && "sticky left-0")}>İşlem</th>
        
        {processedColumns.map(column => (
          <TableSortHeader 
            key={column.id}
            column={column} 
            sortConfig={sortConfig}
            onSort={requestSort}
          />
        ))}
      </TableRow>
    </TableHeader>
  );
};
