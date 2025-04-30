
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <Button variant="outline" size="icon" className="group">
            <Settings className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-y-1 animate-pulse" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <ScrollArea className="h-[300px]">
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
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
