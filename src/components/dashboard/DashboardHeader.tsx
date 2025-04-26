import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { DashboardItem } from "./dashboardTypes";
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
  return <div className="flex items-center justify-between">
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px] max-h-[400px] overflow-y-auto">
          {allDashboardData.map(item => <DropdownMenuCheckboxItem key={item.id} checked={selectedCards.includes(item.id)} onCheckedChange={() => onToggleCard(item.id)}>
              {item.title}
            </DropdownMenuCheckboxItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>;
};
export default DashboardHeader;