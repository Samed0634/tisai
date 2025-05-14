
import React from "react";
import { TableHead } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableSortHeaderProps {
  column: {
    id: string;
    title: string;
  };
  sortConfig: {
    key: string | null;
    direction: 'ascending' | 'descending';
  };
  onSort: (key: string) => void;
}

export const TableSortHeader: React.FC<TableSortHeaderProps> = ({
  column,
  sortConfig,
  onSort
}) => {
  return (
    <TableHead 
      key={column.id} 
      className={cn(
        "text-xs cursor-pointer select-none",
        sortConfig.key === column.id && 
          (sortConfig.direction === 'ascending' 
            ? "sorting-asc" 
            : "sorting-desc")
      )}
      onClick={() => onSort(column.id)}
    >
      <div className="flex items-center">
        {column.title}
        <span className="ml-1.5 flex flex-col text-gray-400">
          <ChevronUp 
            size={14} 
            className={cn(
              sortConfig.key === column.id && sortConfig.direction === 'ascending' 
                ? "text-primary-600" 
                : "opacity-40"
            )} 
          />
          <ChevronDown 
            size={14} 
            className={cn(
              sortConfig.key === column.id && sortConfig.direction === 'descending' 
                ? "text-primary-600" 
                : "opacity-40",
              "mt-[-8px]"
            )} 
          />
        </span>
      </div>
    </TableHead>
  );
};
