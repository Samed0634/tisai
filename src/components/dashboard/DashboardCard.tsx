
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  className?: string;
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
        "relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        "border border-border/50 bg-card/50 backdrop-blur-sm",
        "cursor-pointer group",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors",
          className
        )}>
          {title}
        </CardTitle>
        <div className={cn(
          "rounded-xl bg-primary/10 p-2.5 text-primary",
          "transition-all duration-300 ease-in-out",
          "group-hover:scale-110 group-hover:bg-primary/15 group-hover:rotate-[-5deg]"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold tracking-tight",
          "transition-colors duration-300",
          "group-hover:text-primary",
          className
        )}>
          {value.toLocaleString('tr-TR')}
        </div>
        <p className={cn(
          "text-xs text-muted-foreground mt-1 opacity-70",
          "group-hover:text-foreground/70 transition-colors",
          className
        )}>
          İşyeri
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
