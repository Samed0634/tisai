
import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { SortOption } from '../hooks/useTisFilters';

interface TisFilterControlsProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const TisFilterControls: React.FC<TisFilterControlsProps> = ({
  isFilterOpen,
  setIsFilterOpen,
  sortOption,
  setSortOption,
  isLoading,
  onRefresh
}) => {
  return (
    <div className="flex items-center">
      <CollapsibleTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {isFilterOpen ? "Filtreleri Gizle" : "Filtreleri Göster"}
        </Button>
      </CollapsibleTrigger>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            className="flex items-center gap-2 ml-2"
          >
            <SortAsc className="h-4 w-4" />
            <span>Sırala</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSortOption('alphabetical')}>
            Alfabeye Göre
            {sortOption === 'alphabetical' && <span className="ml-2">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortOption('expiryDate')}>
            Yürürlük Sona Erme Tarihine Göre
            {sortOption === 'expiryDate' && <span className="ml-2">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortOption('receivedDate')}>
            TİS Geliş Tarihine Göre
            {sortOption === 'receivedDate' && <span className="ml-2">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        onClick={onRefresh} 
        disabled={isLoading}
        className="ml-2"
      >
        Yenile
      </Button>
    </div>
  );
};
