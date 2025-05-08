
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CollapsibleContent } from "@/components/ui/collapsible";

interface TisFilterPanelProps {
  isFilterOpen: boolean;
  branches: string[];
  years: string[];
  experts: string[];
  branchFilter: string;
  setBranchFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  expertFilter: string;
  setExpertFilter: (value: string) => void;
  onClearFilters: () => void;
}

export const TisFilterPanel: React.FC<TisFilterPanelProps> = ({
  isFilterOpen,
  branches,
  years,
  experts,
  branchFilter,
  setBranchFilter,
  yearFilter,
  setYearFilter,
  expertFilter,
  setExpertFilter,
  onClearFilters
}) => {
  
  return (
    <CollapsibleContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div>
          <label className="block text-sm font-medium mb-1">Bağlı Olduğu Şube</label>
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tüm Şubeler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Şubeler</SelectItem>
              {branches.map(branch => (
                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">TİS İmza Yılı</label>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tüm Yıllar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Yıllar</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Sorumlu Uzman</label>
          <Select value={expertFilter} onValueChange={setExpertFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tüm Uzmanlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Uzmanlar</SelectItem>
              {experts.map(expert => (
                <SelectItem key={expert} value={expert}>{expert}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3">
          <Button 
            variant="secondary" 
            onClick={onClearFilters}
            size="sm"
            className="w-full"
          >
            Filtreleri Temizle
          </Button>
        </div>
      </div>
    </CollapsibleContent>
  );
};
