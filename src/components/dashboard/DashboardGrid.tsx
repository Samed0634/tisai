
import React from "react";
import DashboardCard from "./DashboardCard";
import { DashboardCardData } from "./dashboardConfig";

interface DashboardGridProps {
  data: DashboardCardData[];
  onCardClick: (categoryId: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ data, onCardClick }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => (
        <DashboardCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          onClick={() => onCardClick(item.id)}
        />
      ))}
    </div>
  );
};

export default DashboardGrid;
