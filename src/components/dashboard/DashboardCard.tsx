
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
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/90">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-white/10 p-2.5 transition-all group-hover:scale-110 group-hover:bg-white/20">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {value}
        </div>
        <p className="text-xs text-white/60">İşyeri</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

