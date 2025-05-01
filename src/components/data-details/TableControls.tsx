
import React from "react";
import { Settings } from "lucide-react";
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
  toggleColumn: (columnId: string) => void;
}

export const TableControls: React.FC<TableControlsProps> = ({
  visibleColumns,
  toggleColumn,
}) => {
  return (
    <div className="flex items-center gap-2">
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
              className="whitespace-normal break-words"
            >
              {column.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
