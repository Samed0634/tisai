
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
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white border shadow-sm hover:shadow-md"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/15">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {value}
        </div>
        <p className="text-xs text-muted-foreground">İşyeri</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
