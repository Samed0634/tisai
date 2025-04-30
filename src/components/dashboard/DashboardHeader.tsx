
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { DashboardItem } from "./dashboardTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardHeaderProps {
  allDashboardData: DashboardItem[];
  selectedCards: string[];
  onToggleCard: (cardId: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  allDashboardData,
  selectedCards,
  onToggleCard
}) => {
  // Load saved selections from localStorage when component mounts
  useEffect(() => {
    const savedSelections = localStorage.getItem('dashboardCardFilters');
    if (savedSelections) {
      const parsedSelections = JSON.parse(savedSelections);
      // Update each card selection based on saved state
      allDashboardData.forEach(card => {
        if (parsedSelections.includes(card.id) !== selectedCards.includes(card.id)) {
          onToggleCard(card.id);
        }
      });
    }
  }, []); // Only run once on mount

  // Save selections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardCardFilters', JSON.stringify(selectedCards));
  }, [selectedCards]);

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold tracking-tight">Gösterge Paneli</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2 group">
            <Filter className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-y-1 animate-pulse" />
            Kartları Filtrele
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <ScrollArea className="h-[300px]">
            {allDashboardData.map((card) => (
              <DropdownMenuCheckboxItem
                key={card.id}
                checked={selectedCards.includes(card.id)}
                onCheckedChange={() => onToggleCard(card.id)}
              >
                {card.title}
              </DropdownMenuCheckboxItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
