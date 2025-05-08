
import React from "react";
import DashboardCard from "./DashboardCard";
import { DashboardItem } from "./dashboardTypes";

// Helper to check deadlineDate condition per Turkish spec
function shouldHighlightRed(items: any[]): boolean {
  if (!items || items.length === 0) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Add one day for the "+1 gün" requirement
  const compareDate = new Date(today);
  compareDate.setDate(compareDate.getDate() + 1);

  return items.some((item) => {
    // Accept both deadlineDate and Termin Tarihi for compatibility
    const deadline =
      item.deadlineDate ||
      item["deadlineDate"] ||
      item["Termin Tarihi"] ||
      item["TerminTarihi"];
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(23, 59, 59, 999);
    // Status: bekleniyor/pending
    const status = (item.status || item["status"] || item["Güncel Durum"] || "").toLowerCase();
    const isPending = !status || status.includes("bekleniyor");
    // Check if overdue or TODAY, or past up to +1 day
    return isPending && deadlineDate < compareDate;
  });
}

// Helper to get average remaining time for a card
function getAverageRemainingTime(items: any[]): string | undefined {
  if (!items || items.length === 0) return undefined;
  
  // Find items with sure_bilgisi
  const itemsWithTime = items.filter(item => item.sure_bilgisi && !isNaN(parseInt(item.sure_bilgisi)));
  
  if (itemsWithTime.length === 0) return undefined;
  
  // Calculate average remaining time
  const total = itemsWithTime.reduce((sum, item) => {
    // Extract numeric value from sure_bilgisi (assuming it's in format like "5 gün")
    const days = parseInt(item.sure_bilgisi);
    return sum + days;
  }, 0);
  
  return Math.round(total / itemsWithTime.length).toString();
}

interface DashboardGridProps {
  items: DashboardItem[];
  onCardClick: (categoryId: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ items, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item) => {
        const highlightRed = shouldHighlightRed(item.items || []);
        const remainingTime = getAverageRemainingTime(item.items || []);
        
        return (
          <DashboardCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            onClick={() => onCardClick(item.id)}
            className={highlightRed ? "text-destructive" : ""}
            remainingTime={remainingTime}
          />
        );
      })}
    </div>
  );
};

export default DashboardGrid;
