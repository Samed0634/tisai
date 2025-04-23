
import React from "react";
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterDropdownProps {
  onChange?: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onChange }) => {
  return (
    <Select onValueChange={onChange} defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filtrele" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tümü</SelectItem>
        <SelectItem value="pending">İşlem Bekleyenler</SelectItem>
        <SelectItem value="completed">Tamamlananlar</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
