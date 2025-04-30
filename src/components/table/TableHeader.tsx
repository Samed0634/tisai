
import React from "react";
import { cn } from "@/lib/utils";
import { TableControls } from "@/components/data-details/TableControls";

interface TableHeaderProps {
  title: string;
  titleClassName?: string;
  visibleColumns: string[];
  toggleColumn: (column: string) => void;
  pageSize: number;
  onPageSizeChange: (value: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  titleClassName,
  visibleColumns,
  toggleColumn,
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className={cn("font-bold", titleClassName || "text-2xl")}>{title}</h2>
      <div className="flex items-center gap-4">
        <TableControls 
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
        />
      </div>
    </div>
  );
};
