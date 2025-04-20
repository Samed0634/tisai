
import React from "react";
import { ArrowUpDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLUMNS } from "@/constants/tableColumns";

interface TableControlsProps {
  visibleColumns: string[];
  sortKey: string;
  handleSort: (columnId: string) => void;
  toggleColumn: (columnId: string) => void;
}

export const TableControls: React.FC<TableControlsProps> = ({
  visibleColumns,
  sortKey,
  handleSort,
  toggleColumn,
}) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sırala
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {COLUMNS.filter(column => visibleColumns.includes(column.id)).map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={sortKey === column.id}
              onCheckedChange={() => handleSort(column.id)}
            >
              {`${column.title}'e göre sırala`}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px] max-h-[400px] overflow-y-auto">
          {COLUMNS.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={visibleColumns.includes(column.id)}
              onCheckedChange={() => toggleColumn(column.id)}
              disabled={column.fixed}
            >
              {column.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
