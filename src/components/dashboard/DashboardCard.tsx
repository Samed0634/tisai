
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  className?: string; // Adding optional className prop
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  onClick,
  color,
  className
}) => {
  return (
    <Card 
      onClick={onClick} 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white border shadow-sm hover:shadow-md",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={cn("text-sm font-medium text-muted-foreground", className)}>
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/15">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold text-foreground", className)}>
          {value}
        </div>
        <p className={cn("text-xs text-muted-foreground", className)}>İşyeri</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
