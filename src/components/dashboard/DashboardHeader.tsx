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
  return;
};
export default DashboardHeader;