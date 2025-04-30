
import React from "react";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { COLUMNS } from "@/constants/tableColumns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableHeaderProps {
  title: string;
  titleClassName?: string;
  visibleColumns: string[];
  toggleColumn: (columnId: string) => void;
  pageSize: number;
  onPageSizeChange: (value: string) => void;
  columnLabels?: Record<string, string>;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  titleClassName,
  visibleColumns,
  toggleColumn,
  pageSize,
  onPageSizeChange,
  columnLabels = {},
}) => {
  // Get all columns from constants plus any custom columns
  const allColumns = [...COLUMNS];
  
  // Add any columns that exist in visibleColumns but not in COLUMNS
  visibleColumns.forEach(colId => {
    const exists = allColumns.some(col => col.id === colId);
    if (!exists) {
      allColumns.push({
        id: colId,
        title: columnLabels[colId] || colId,
        editable: true
      });
    }
  });

  // Filter out "durum" and "updated_at" columns from the dropdown menu
  const filteredColumns = allColumns.filter(
    column => column.id !== "durum" && column.id !== "updated_at"
  );

  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pb-2">
      <h2 className={cn("text-lg font-semibold tracking-tight", titleClassName)}>{title}</h2>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8">
              <Settings className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Sütunlar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 max-h-[300px]">
            <ScrollArea className="h-full max-h-[300px]">
              {filteredColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                >
                  {columnLabels[column.id] || column.title}
                </DropdownMenuCheckboxItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
