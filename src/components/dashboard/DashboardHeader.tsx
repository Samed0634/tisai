
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { DashboardItem } from "./dashboardTypes";
import { useFilterMemory } from "@/hooks/useFilterMemory";
import { SearchBox } from "@/components/data-details/SearchBox";

interface DashboardHeaderProps {
  allDashboardData?: DashboardItem[];
  selectedCards?: string[];
  onToggleCard?: (cardId: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  allDashboardData = [],
  selectedCards = [],
  onToggleCard = () => {},
  searchTerm = "",
  onSearchChange = () => {}
}) => {
  // Use our filterMemory hook instead of localStorage directly
  const [savedSelections, setSavedSelections] = useFilterMemory('dashboardCardFilters', [] as string[]);

  // Load saved selections from memory hook when component mounts
  useEffect(() => {
    if (savedSelections.length > 0) {
      // Update each card selection based on saved state
      allDashboardData.forEach(card => {
        if (savedSelections.includes(card.id) !== selectedCards.includes(card.id)) {
          onToggleCard(card.id);
        }
      });
    }
  }, []); // Only run once on mount

  // Save selections to memory hook whenever they change
  useEffect(() => {
    setSavedSelections(selectedCards);
  }, [selectedCards, setSavedSelections]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gösterge Paneli</h2>
        <div className="flex flex-col items-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Kartları Filtrele
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {allDashboardData.map((card) => (
                <DropdownMenuCheckboxItem
                  key={card.id}
                  checked={selectedCards.includes(card.id)}
                  onCheckedChange={() => onToggleCard(card.id)}
                >
                  {card.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="w-[260px]">
            <SearchBox 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              placeholder="İşyeri, uzman veya durum ara..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
