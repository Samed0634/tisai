
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  onClick 
}) => {
  return (
    <Card 
      onClick={onClick} 
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary-300"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          <span className="bg-[#ea384c] text-white px-2 py-1 rounded inline-block">{title}</span>
        </CardTitle>
        <div className="rounded-md bg-primary-50 p-2 text-primary-700">
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
