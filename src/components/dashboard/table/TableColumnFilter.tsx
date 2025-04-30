
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableColumnFilterProps {
  availableColumns: string[];
  visibleColumns: string[];
  toggleColumn: (column: string) => void;
}

export const TableColumnFilter: React.FC<TableColumnFilterProps> = ({
  availableColumns,
  visibleColumns,
  toggleColumn,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="group">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-y-[2px] group-hover:-translate-y-[2px] animate-pulse" />
            <span>Sütunları Filtrele</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <ScrollArea className="h-[300px]">
          {availableColumns.map(column => (
            <DropdownMenuCheckboxItem
              key={column}
              checked={visibleColumns.includes(column)}
              onCheckedChange={() => toggleColumn(column)}
            >
              {column === 'updated_at' ? 'Son Güncelleme' : column}
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
