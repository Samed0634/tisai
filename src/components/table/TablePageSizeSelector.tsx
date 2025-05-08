
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (value: string) => void;
}

export const TablePageSizeSelector: React.FC<TablePageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Sayfa başına:</span>
      <Select
        value={pageSize.toString()}
        onValueChange={onPageSizeChange}
      >
        <SelectTrigger className="w-[80px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10" className="text-xs">10</SelectItem>
          <SelectItem value="20" className="text-xs">20</SelectItem>
          <SelectItem value="30" className="text-xs">30</SelectItem>
          <SelectItem value="50" className="text-xs">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
