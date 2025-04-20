
import React from "react";
import DashboardCard from "./DashboardCard";
import { DashboardItem } from "./dashboardData";

interface DashboardGridProps {
  items: DashboardItem[];
  onCardClick: (categoryId: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ items, onCardClick }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <DashboardCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
          onClick={() => onCardClick(item.id)}
        />
      ))}
    </div>
  );
};

export default DashboardGrid;

