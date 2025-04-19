
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  onClick,
  color
}) => {
  return (
    <Card 
      onClick={onClick} 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary-300"
      style={{ backgroundColor: color }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="rounded-md bg-white/90 p-2 text-primary-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">İşyeri</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
