
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedExpert: string;
  onExpertChange: (value: string) => void;
  experts: string[];
}

export const SearchToolbar: React.FC<SearchToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedExpert,
  onExpertChange,
  experts,
}) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="İşyeri veya uzman ara..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={selectedExpert} onValueChange={onExpertChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sorumlu Uzman" />
        </SelectTrigger>
        <SelectContent>
          {experts.map((expert) => (
            <SelectItem key={expert} value={expert}>
              {expert}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
