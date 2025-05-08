
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export type SortOption = {
  value: string;
  label: string;
};

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  options: SortOption[];
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy, options }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-[240px]">
          <ArrowDown className="mr-2 h-4 w-4" />
          Sıralama: {options.find(opt => opt.value === sortBy)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          {options.map(option => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
