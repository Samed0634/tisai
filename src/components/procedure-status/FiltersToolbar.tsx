
import React from 'react';
import { SearchBox } from '@/components/data-details/SearchBox';
import { Button } from '@/components/ui/button';
import { Filter, Building } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { StatusFilter } from '@/components/procedure-status/StatusFilter';
import { BranchExpertFilter } from '@/components/procedure-status/BranchExpertFilter';
import { SortDropdown, SortOption } from '@/components/procedure-status/SortDropdown';
import { OptionType } from '@/hooks/useWorkplaceOptions';

interface FiltersToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatuses: string[];
  onStatusChange: (statuses: string[]) => void;
  selectedBranches: string[];
  onBranchChange: (branches: string[]) => void;
  selectedExperts: string[];
  onExpertChange: (experts: string[]) => void;
  branchOptions: OptionType[];
  expertOptions: OptionType[];
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOptions: SortOption[];
  statusFilterCount: number;
  branchExpertFilterCount: number;
}

export const FiltersToolbar: React.FC<FiltersToolbarProps> = ({
  searchTerm,
  onSearchChange,
  selectedStatuses,
  onStatusChange,
  selectedBranches,
  onBranchChange,
  selectedExperts,
  onExpertChange,
  branchOptions,
  expertOptions,
  sortBy,
  setSortBy,
  sortOptions,
  statusFilterCount,
  branchExpertFilterCount
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
      <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:items-center flex-wrap">
        <SearchBox 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
          placeholder="İşyeri, uzman veya durum ara..." 
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4" />
              <span>Durum Filtresi</span>
              {statusFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                  {statusFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-0" align="start">
            <StatusFilter 
              selectedStatuses={selectedStatuses} 
              onChange={onStatusChange} 
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
              <Building className="h-4 w-4" />
              <span>Şube & Uzman Filtresi</span>
              {branchExpertFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                  {branchExpertFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-0" align="start">
            <BranchExpertFilter 
              selectedBranches={selectedBranches} 
              onBranchChange={onBranchChange}
              selectedExperts={selectedExperts}
              onExpertChange={onExpertChange}
              branchOptions={branchOptions}
              expertOptions={expertOptions}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <SortDropdown 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        options={sortOptions} 
      />
    </div>
  );
};
