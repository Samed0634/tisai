
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterControlsProps {
  filters: {
    search: string;
    expert: string;
    branch: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    expert: string;
    branch: string;
    status: string;
  }>>;
  filterOptions: {
    experts: string[];
    branches: string[];
    statuses: string[];
  };
  resetFilters: () => void;
  dataCount: number;
  totalCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  setFilters,
  filterOptions,
  resetFilters,
  dataCount,
  totalCount
}) => {
  const hasActiveFilters = filters.search || filters.expert || filters.branch || filters.status;
  const activeFilterCount = [filters.search, filters.expert, filters.branch, filters.status]
    .filter(Boolean).length;
    
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Ara..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-9 pr-8 h-10 rounded-lg border-gray-200 focus:border-primary"
          />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Select
          value={filters.expert}
          onValueChange={(value) => setFilters(prev => ({ ...prev, expert: value }))}
        >
          <SelectTrigger className="w-[180px] h-10 rounded-lg">
            <SelectValue placeholder="Uzman Seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tüm Uzmanlar</SelectItem>
            {filterOptions.experts.map(expert => (
              <SelectItem key={expert} value={expert}>{expert}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.branch}
          onValueChange={(value) => setFilters(prev => ({ ...prev, branch: value }))}
        >
          <SelectTrigger className="w-[180px] h-10 rounded-lg">
            <SelectValue placeholder="Şube Seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tüm Şubeler</SelectItem>
            {filterOptions.branches.map(branch => (
              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="w-[180px] h-10 rounded-lg">
            <SelectValue placeholder="Durum Seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tüm Durumlar</SelectItem>
            {filterOptions.statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetFilters}
            className="ml-auto h-10"
          >
            <X size={16} className="mr-1" /> Filtreleri Temizle
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Filter size={12} className="mr-1" /> 
              {activeFilterCount} filtre aktif
            </Badge>
          )}
          <span>
            {dataCount} sonuç gösteriliyor
            {dataCount !== totalCount && ` (toplam ${totalCount})`}
          </span>
        </div>
      </div>
    </div>
  );
};
