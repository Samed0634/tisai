
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

interface DashboardGridProps {
  items: DashboardItem[];
  onCardClick: (categoryId: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ items, onCardClick }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => {
        // Check highlightRed logic per card
        const highlightRed = shouldHighlightRed(item.items || []);
        return (
          <DashboardCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            onClick={() => onCardClick(item.id)}
            className={highlightRed ? "text-destructive" : ""}
          />
        );
      })}
    </div>
  );
};

export default DashboardGrid;
